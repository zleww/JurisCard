
**Live Site:** [https://juris-card.vercel.app](https://juris-card.vercel.app)[cite: 5]  
*Place this content inside `JurisCard/README.md`:*

```markdown
#  JurisCard — Interactive Law Study & Flashcards

> **Live Deployment:** [https://juris-card.vercel.app](https://juris-card.vercel.app)

JurisCard is a study companion that helps students learn Philippine Republic Acts through browsable cards, filters, and flashcards.

---

##  What This Project Does

- **Browse Laws:** View legal summaries, minimum fines, and penalties with interactive modals.
- **Search & Filter:** Find laws by category (Finance, Technology, Welfare, etc.) in real time.
- **Shared API Consumer:** Does not store its own copy of the database. It fetches live data directly from the **L-Lawliet** backend.

---

##  Connected Backend

- **Source API:** `https://l-lawliet-three.vercel.app/api/v1/laws`
- **Key Header:** `x-api-key: student-api-key-123`
- If a new law is added to L-Lawliet, it automatically appears here upon page reload.

---

##  How to Push Changes (Git Bash)

If you update styling or pages (`browse.html`, `app.js`, `style.css`), push your updates with:

```bash
# 1. Stage your changes
git add .

# 2. Commit your update
git commit -m "style: update cards and layout"

# 3. Push to GitHub & deploy on Vercel
git push origin main
