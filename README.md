# **HNG 13 – Stage 2: Multi-Framework Ticket Web App (React Implementation)**

This is the **React version** of the Stage 2 challenge, part of the multi-framework ticket management system (React, Vue.js, and Twig).
It builds upon the Stage 1 app, expanding it into a **complete, authenticated ticket management platform** with CRUD functionality, form validation, and consistent responsive design.

---

## **Live Demo**

**Live Site:** [https://hng-stage2-react-deeyah.netlify.app/](https://hng-stage2-react-deeyah.netlify.app/)
**Repository:** [https://github.com/Fasina-ayomikun/HNG13-Stage2-React](https://github.com/Fasina-ayomikun/HNG13-Stage2-React)

---

## **Setup & Run Instructions**

### Clone the repo

```bash
git clone https://github.com/Fasina-ayomikun/HNG13-Stage2-React.git
cd HNG13-Stage2-React
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local URL shown in your terminal, e.g.
**[http://localhost:5173](http://localhost:5173)**

---

## **Project Structure**

```
src/
│
├── assets/                # Shared assets (SVGs, images, etc.)
├── components/            # Shared UI components (buttons, nav, toasts, etc.)
│
├── pages/
│   ├── landing-page/      # Landing page (hero, features, footer)
│   ├── auth/              # Login & Signup pages
│   ├── dashboard/         # Summary dashboard
│   └── tickets/           # Full CRUD interface
│
├── utils/
│   ├── auth.js            # Session & login helpers (localStorage)
│   └── tickets.js         # Ticket store & CRUD logic (localStorage)
│
└── App.jsx / main.jsx     # Routing + ProtectedRoute logic
```

---

## **Tech Stack & Tools**

| Category        | Tools Used                              |
| --------------- | --------------------------------------- |
| Framework       | React (Vite)                            |
| Styling         | CSS Modules (per-page)                  |
| State/Storage   | LocalStorage for persistence            |
| Routing         | React Router                            |
| Icons           | Inline SVGs                             |
| Auth Simulation | `localStorage` key: `ticketapp_session` |

---

## **Core Features (React Version)**

### **Landing Page**

- App name, hero section, and “Login / Get Started” CTAs
- **Wavy SVG background** and **decorative circles**
- Social proof row (“Trusted by…”), **feature boxes**, and **footer**
- Fully **responsive** up to 1440 px max width

### **Authentication Pages**

- Login & Signup forms with:

  - Inline validation & accessible error messages
  - **Show/Hide password** toggle (keyboard focusable)
  - Simulated login via localStorage (`ticketapp_session`)
  - Redirect to Dashboard on success

- Logout clears session and redirects to `/auth/login`

### **Dashboard**

- Displays total, open, in-progress, and closed ticket counts
- “Create Ticket”, “View Tickets”, and “Logout” buttons
- Protected route — accessible only with valid session
- Consistent layout (max-width: 1440 px, centered)

### **Ticket Management (CRUD)**

- **Create, View, Edit, Delete** tickets
- Validation:

  - `title` and `status` required
  - `status` restricted to `open`, `in_progress`, or `closed`
  - Description limited to 1000 characters

- Inline + toast notifications for success/error
- Confirmation prompt before delete
- Filter & search by status/title
- **Status colors:**

  - 🟢 open
  - 🟠 in progress
  - ⚪ closed

- Accessible form modals (labels, aria-describedby, focus trap)

---

## **Design & Responsiveness**

- Consistent 1440 px max-width container
- Uses Flexbox + Grid for layouts
- **Mobile-first responsive design**
- Semantic HTML with `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`
- Soft card shadows, rounded corners, and vibrant accent colors
- Focus states visible for keyboard users

---

## **Accessibility Highlights**

- All forms include `<label>` elements linked via `for`/`id`
- Error messages reference inputs via `aria-describedby`
- Buttons and links are fully keyboard-navigable
- `aria-modal`, `aria-label`, and `role="dialog"` on modals
- High color contrast (meets WCAG AA)

---

## **Example Test Credentials**

Use these for quick login:

```
Email: demo@deetickets.dev
Password: 123456
```

---

## **React Implementation Coverage**

| Section        | Requirement                                        | Status |
| -------------- | -------------------------------------------------- | ------ |
| Landing Page   | Hero + CTA + Footer                                | ✅     |
| Authentication | Validation + Session Storage + Toggle Password     | ✅     |
| Dashboard      | Stats + Nav + Logout                               | ✅     |
| Ticket CRUD    | Create, View, Edit, Delete + Validation + Feedback | ✅     |
| Responsiveness | Mobile, Tablet, Desktop                            | ✅     |
| Accessibility  | Semantic + Focus + ARIA                            | ✅     |
| Documentation  | This README section                                | ✅     |
