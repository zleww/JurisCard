// Shared code for every JurisCards page: where the API is, the login session,
// the account menu in the header, and the limits for guests.
//
// JurisCards has no database of its own. Laws, accounts, notes and study progress all
// live in the L-Lawliet database and are read and written through the L-Lawliet API,
// so one account works on both sites.
(function () {
  const PRODUCTION_API = "https://l-lawliet-three.vercel.app/api/v1";
  const LOCAL_API = "http://127.0.0.1:8000/api/v1"; // scripts/dev.py in the L-Lawliet folder
  const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
  const API = isLocal ? LOCAL_API : PRODUCTION_API;

  // What a guest can do. The API enforces the law limit itself; the rest is simply
  // not saved, because saving needs an account.
  const GUEST = { quizLength: 5 };

  const CATEGORIES = [
    "Technology & Crime", "Finance & Taxes", "Governance & Business",
    "Social & Welfare", "Environment", "Education & Civil Rights",
  ];

  // ---------------------------------------------------------------
  // Session. Kept in sessionStorage, so closing the tab signs you out.
  // The API checks the token on every request; nothing here is trusted.
  // ---------------------------------------------------------------
  const KEY = "juriscard_auth";

  function getAuth() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || null; } catch { return null; }
  }
  function saveSession(data) {
    const u = data.user || {};
    sessionStorage.setItem(KEY, JSON.stringify({
      token: data.token,
      id: u.id,
      username: u.username || data.username,
      role: u.role || data.role,
      display_name: u.display_name || null,
      has_password: u.has_password !== false,
    }));
  }
  function updateUser(profile) {
    const auth = getAuth();
    if (!auth) return;
    sessionStorage.setItem(KEY, JSON.stringify({ ...auth, display_name: profile.display_name }));
  }
  function signOut() { sessionStorage.removeItem(KEY); }
  function isAdmin() { const a = getAuth(); return !!a && a.role === "admin"; }
  function displayName() { const a = getAuth(); return a ? (a.display_name || a.username) : null; }

  // fetch() against the API with the token attached. A 401 while signed in means the
  // token expired or was revoked, so the user goes back to the sign-in page.
  async function api(path, options = {}) {
    const auth = getAuth();
    const headers = { ...(options.headers || {}) };
    if (auth && auth.token) headers["Authorization"] = `Bearer ${auth.token}`;
    let body = options.body;
    if (body && typeof body !== "string") { body = JSON.stringify(body); }
    if (body) headers["Content-Type"] = "application/json";

    const res = await fetch(API + path, { ...options, headers, body });
    if (res.status === 401 && auth) {
      signOut();
      location.href = "login.html?expired=1&next=" + encodeURIComponent(currentPage());
      throw new Error("Login expired");
    }
    return res;
  }

  // GET and return JSON, or throw an Error with the API's message.
  async function getJson(path) {
    const res = await api(path);
    if (!res.ok) throw new Error(await errorMessage(res));
    return res.json();
  }

  async function errorMessage(res) {
    try {
      const body = await res.json();
      if (typeof body.detail === "string") return body.detail;
      if (Array.isArray(body.detail)) {
        return body.detail.map(e => String(e.msg || "").replace(/^Value error, /, "")).join(" ");
      }
    } catch { /* fall through */ }
    return `Request failed (HTTP ${res.status}).`;
  }

  function currentPage() {
    return location.pathname.split("/").pop() + location.search || "index.html";
  }

  // Send guests to the sign-in page, then back here afterwards.
  function requireLogin() {
    if (getAuth()) return true;
    location.href = "login.html?next=" + encodeURIComponent(currentPage());
    return false;
  }

  // ---------------------------------------------------------------
  // Small helpers
  // ---------------------------------------------------------------
  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function safeUrl(url) {
    return /^https:\/\//i.test(url || "") ? url : "#";
  }

  function peso(n) {
    return "PHP " + Number(n || 0).toLocaleString("en-PH");
  }

  function timeAgo(iso) {
    if (!iso) return "";
    const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "yesterday";
    if (days < 30) return `${days} days ago`;
    return new Date(iso).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
  }

  function shuffle(list) {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // All laws this visitor may read: 10 for guests, every law when signed in.
  // Returns the API body: { count, total, access, guest_limit?, laws }.
  async function loadLaws(params = {}) {
    const query = new URLSearchParams(params).toString();
    return getJson("/laws" + (query ? "?" + query : ""));
  }

  // A notice for guests, e.g. "You are reading 10 of 30 laws as a guest."
  function guestNotice(message) {
    if (getAuth()) return "";
    const next = encodeURIComponent(currentPage());
    return `
      <div class="jc-guest-note" role="note">
        <span>${esc(message)}</span>
        <span class="jc-guest-actions">
          <a href="login.html?next=${next}">Sign in</a>
          <a href="login.html?signup=1&next=${next}">Create a free account</a>
        </span>
      </div>`;
  }

  // ---------------------------------------------------------------
  // Header: Sign in button for guests, account menu when signed in.
  // Each page has <div class="jc-account" data-account></div> in its header.
  // ---------------------------------------------------------------
  function renderAccount() {
    const slot = document.querySelector("[data-account]");
    if (!slot) return;
    const auth = getAuth();
    if (!auth) {
      slot.innerHTML = `<a class="jc-signin" href="login.html?next=${encodeURIComponent(currentPage())}">Sign in</a>`;
      return;
    }
    const name = displayName();
    slot.innerHTML = `
      <button type="button" class="jc-menu-btn" aria-haspopup="true" aria-expanded="false">
        <span class="jc-avatar">${esc(name.charAt(0).toUpperCase())}</span>
        <span class="jc-menu-name">${esc(name)}</span>
      </button>
      <div class="jc-menu" role="menu" hidden>
        <div class="jc-menu-head">
          <strong>${esc(name)}</strong>
          <span>@${esc(auth.username)}${auth.role === "admin" ? " · admin" : ""}</span>
        </div>
        <a role="menuitem" href="profile.html">Profile</a>
        <a role="menuitem" href="settings.html">Settings</a>
        ${auth.role === "admin" ? '<a role="menuitem" href="admin.html">Admin</a>' : ""}
        <button type="button" role="menuitem" class="jc-signout">Sign out</button>
      </div>`;
    const btn = slot.querySelector(".jc-menu-btn");
    const menu = slot.querySelector(".jc-menu");
    const close = () => { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); };
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
      btn.setAttribute("aria-expanded", String(!menu.hidden));
    });
    document.addEventListener("click", (e) => { if (!slot.contains(e.target)) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    slot.querySelector(".jc-signout").addEventListener("click", () => {
      signOut();
      location.href = "index.html";
    });
  }

  window.Juris = {
    API, GUEST, CATEGORIES,
    getAuth, saveSession, updateUser, signOut, isAdmin, displayName, requireLogin,
    api, getJson, errorMessage, loadLaws, guestNotice,
    esc, safeUrl, peso, timeAgo, shuffle,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAccount);
  } else {
    renderAccount();
  }
})();
