// Everything specific to JurisCards lives here. The sections only read this file.
// Facts come from the site itself; no invented users, ratings or testimonials.
import { BarChart3, Layers, LayoutGrid, ListChecks, PenLine, Share2 } from "lucide-react";
import type { Shot, SiteContent } from "./types";
import logo from "./assets/logo.svg";
import home from "./assets/shots/jc-home.webp";
import homeSm from "./assets/shots/jc-home-960.webp";
import flash from "./assets/shots/jc-flash.webp";
import flashSm from "./assets/shots/jc-flash-960.webp";
import flipped from "./assets/shots/jc-flipped.webp";
import flippedSm from "./assets/shots/jc-flipped-960.webp";
import quiz from "./assets/shots/jc-quiz-answer.webp";
import quizSm from "./assets/shots/jc-quiz-answer-960.webp";
import browse from "./assets/shots/jc-browse.webp";
import browseSm from "./assets/shots/jc-browse-960.webp";

const HOST = "juris-card.vercel.app";

const shots = {
  home: { src: home, small: homeSm, url: HOST,
    alt: "JurisCards home page: 'Learn the laws that affect you', with buttons to open the flashcards and browse the laws." },
  flash: { src: flash, small: flashSm, url: `${HOST}/flashcard`,
    alt: "The flashcards page: a guest deck of 10 laws, category filters, and the card for RA 10175 asking what the Cybercrime Prevention Act does." },
  flipped: { src: flipped, small: flippedSm, url: `${HOST}/flashcard`,
    alt: "A flipped flashcard for RA 10175 showing what the law does, an example and the penalties." },
  quiz: { src: quiz, small: quizSm, url: `${HOST}/start-review#quiz`,
    alt: "A practice quiz question about RA 10175's category, with the wrong pick in red, the right answer in green and a short explanation." },
  browse: { src: browse, small: browseSm, url: `${HOST}/browse`,
    alt: "The Browse page: 'Republic Acts in plain English' with a search box, category chips and law cards." },
} satisfies Record<string, Shot>;

export const site: SiteContent = {
  name: "JurisCards",
  logo,
  logoAlt: "JurisCards",
  homeHref: "landing.html",
  nav: [
    { label: "Features", id: "features" },
    { label: "How it works", id: "how-it-works" },
    { label: "Demo", id: "showcase" },
    { label: "FAQ", id: "faq" },
  ],
  login: { label: "Sign in", href: "login.html" },
  signup: { label: "Start studying free", href: "login.html?signup=1" },
  guest: { label: "Try it as a guest", href: "index.html?guest=1" },

  hero: {
    eyebrow: "Flashcards for Philippine law",
    headline: { before: "Know the law on exam day, not just the night", accent: "before", after: "." },
    sub: "Every Republic Act becomes a flashcard. Flip it, mark it as mastered or for review, and come back to the ones you missed. Then test yourself with practice quizzes made from the same laws.",
    shot: shots.flipped,
  },

  problem: {
    eyebrow: "Why JurisCards",
    title: "Study the way recitations actually test you.",
    oldLabel: "The old way",
    oldCopy: "You reread your notes the night before and every line looks familiar. Then the question asks who signed the law or what the minimum fine is, and nothing comes back.",
    newLabel: "With JurisCards",
    points: [
      { title: "Answer before you flip", text: "The question is on the front. The law, an example and the penalties are on the back." },
      { title: "Mark what you know", text: "Mastered or needs review, saved to your account." },
      { title: "Quiz on the details", text: "Years, signing presidents, categories, minimum fines and example cases." },
      { title: "Always the current laws", text: "Cards come from the L-Lawliet database, so a law added there becomes a new card here." },
    ],
  },

  features: {
    eyebrow: "Features",
    title: "Turn every Republic Act into something you remember.",
    sub: "Flashcards, quizzes and progress, from one shared database of laws.",
    items: [
      { icon: Layers, title: "A card for every law", text: "The question on the front; what the law does, an example and the penalties on the back.", demo: "flip", span: 4 },
      { icon: ListChecks, title: "Practice quizzes", text: "Pick a category and 5 to 20 questions. See the right answer and why after each one.", demo: "quiz", span: 2 },
      { icon: BarChart3, title: "Progress by category", text: "The Review page shows what is due, what you have mastered, and your daily goal.", demo: "progress", span: 2 },
      { icon: PenLine, title: "Write your own cards", text: "Add, edit and delete cards of your own next to the law cards.", demo: "write", span: 2 },
      { icon: LayoutGrid, title: "Six categories", text: "Study one area at a time, from Technology & Crime to Education & Civil Rights.", demo: "chips", span: 2 },
      { icon: Share2, title: "One account, three sites", text: "Drill it here, read the full breakdown on L-Lawliet, test it in the Arena. The same login works on all three.", demo: "account", span: 6 },
    ],
  },

  steps: {
    eyebrow: "How it works",
    title: "Flip, mark, quiz. Repeat until it sticks.",
    items: [
      { title: "Open the deck", text: "Every law in the database as a card. Filter by category, shuffle, or search by RA number or topic.", shot: shots.flash },
      { title: "Flip and mark it", text: "Read what the law does, an example and the penalties, then mark it mastered or for review.", shot: shots.flipped },
      { title: "Test yourself", text: "Practice quizzes from the same laws, with the right answer and a short explanation after each question.", shot: shots.quiz },
    ],
  },

  stats: {
    title: "The deck today",
    items: [
      { to: 31, label: "Laws as flashcards", live: "laws" },
      { to: 6, label: "Categories", live: "categories" },
      { to: 20, label: "Questions per quiz, at most" },
      { to: 3, label: "Sites, one account" },
    ],
  },

  showcase: {
    eyebrow: "Demo",
    title: "See the real thing.",
    sub: "Screenshots of the live site, as a guest sees it.",
    tabs: [
      { label: "Home", caption: "Start studying in one click, or browse the laws first.", shot: shots.home },
      { label: "Flashcards", caption: "The deck, with filters, shuffle and your marks.", shot: shots.flash },
      { label: "Quiz", caption: "Instant feedback, with the reason behind the answer.", shot: shots.quiz },
      { label: "Browse", caption: "Every law in plain English before you drill it.", shot: shots.browse },
    ],
  },

  faq: [
    { q: "Is JurisCards free?", a: "Yes. The flashcards, quizzes and the account are free for students, with no ads and no credit card." },
    { q: "What can I do without an account?", a: "Guests get 10 laws as flashcards, 5-question practice quizzes and student notes to read, but marks and scores are lost when the tab closes. A free account unlocks every law, quizzes of 5 to 20 questions, saved marks and scores, your own cards, and the Review page with a daily goal." },
    { q: "Where do the laws come from?", a: "From the L-Lawliet database, the same one L-Lawliet reads from. When a law is added there, it shows up here as a new card. The cards are a study aid, not legal advice." },
    { q: "Does my account work on L-Lawliet and the Arena?", a: "Yes. The three sites share one database, so the same username and password, or Google sign-in, works on each of them." },
    { q: "I forgot my password. What now?", a: "Use \"Forgot password?\" on the sign-in page. We email a reset link to the address on your account; it works once, for 30 minutes." },
  ],

  finalCta: {
    title: "Turn every Republic Act into something you remember.",
    sub: "Free for students. No credit card, no ads.",
  },

  footer: {
    description: "Flashcards and practice quizzes for Philippine Republic Acts, built on the L-Lawliet database.",
    links: [
      { label: "Browse laws", href: "browse.html" },
      { label: "Flashcards", href: "flashcard.html" },
      { label: "Start studying", href: "start-review.html" },
      { label: "Review", href: "review.html" },
    ],
    sisters: [
      { label: "L-Lawliet", href: "https://l-lawliet-three.vercel.app/", note: "The laws in plain English" },
      { label: "JurisCards Arena", href: "https://just-give-up-atp.vercel.app/", note: "A card game about the law" },
    ],
    github: "https://github.com/zleww/JurisCard",
    disclaimer: "Laws from the L-Lawliet database. A study aid, not legal advice.",
    year: 2026,
  },

  statsApi: "https://l-lawliet-three.vercel.app/api/v1/stats",
};
