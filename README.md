# JurisCards

Flashcards and practice quizzes for Philippine Republic Acts.

Live site: https://juris-card.vercel.app

## How it connects to L-Lawliet

JurisCards has no database or backend of its own. It is a static site that calls the
[L-Lawliet API](https://l-lawliet-three.vercel.app/api/docs), which stores everything in
L-Lawliet's Neon PostgreSQL database:

| Data | Table in the L-Lawliet database |
|---|---|
| Laws shown on the cards | `laws` |
| Accounts (sign up, sign in, Google) | `users` |
| Notes on a law | `comments` (shared: a note posted on either site shows on both) |
| Cards a user writes | `flashcards` |
| Mastered / for-review marks | `law_progress` |
| Quiz scores | `quiz_attempts` |
| Quiz length, daily goal, hide mastered | `study_prefs` |

The last four tables are created by `scripts/migrate_006_study.sql` in the L-Lawliet repo.
A law added on L-Lawliet appears here as a new card on the next page load.

## Guests, users and admins

| | Guest | Signed in | Admin |
|---|---|---|---|
| Laws you can read and study | 10 | All | All |
| Flashcard marks | Lost when the tab closes | Saved | Saved |
| Practice quiz | 5 questions, not saved | 5 to 20 questions, saved | Same as user |
| Write your own cards | No | Yes | Yes |
| Post and edit notes | Read only | Yes | Yes |
| Review, profile and settings pages | No | Yes | Yes |
| Admin page (accounts and activity) | No | No | Yes |

The 10-law limit and every save are enforced by the API and by row-level security in
the database, not only by the pages.

## Pages

- `index.html` home, categories with live law counts
- `browse.html` search and read laws, student notes
- `flashcard.html` the deck, marks, your own cards
- `start-review.html` study dashboard and practice quiz
- `review.html` progress by category, today's goal, quiz history
- `login.html` sign in, create account, continue as guest
- `profile.html`, `settings.html` account pages
- `admin.html` admin overview
- `juris.js`, `juris.css` shared code: API address, session, account menu

## Running it locally

1. Start the L-Lawliet API: in the L-Lawliet folder run `python scripts/dev.py`
   (serves http://127.0.0.1:8000). Its `.env` needs `http://127.0.0.1:5500` in `ALLOWED_ORIGINS`.
2. In this folder run `python -m http.server 5500 --bind 127.0.0.1`.
3. Open http://127.0.0.1:5500. On localhost the pages call the local API; anywhere else
   they call the production API.

## Deploying

Vercel serves the files as a static site; there is no build step. For the deployed site
to call the API, `https://juris-card.vercel.app` must be listed in L-Lawliet's
`ALLOWED_ORIGINS` environment variable. For Google sign-in, the same address must be an
authorised JavaScript origin on the Google OAuth client.
