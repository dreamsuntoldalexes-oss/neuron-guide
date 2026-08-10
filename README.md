# AI Nexus Hub

Prompt Start ⬇️

Build a fully modern, professional AI Tools Directory App with a beautiful, futuristic UI (dark mode by default with neon accents).

📌 APP STRUCTURE

Create the following screens/slides:

1. Welcome Slide (Swipeable Onboarding)

·         Add 3–4 onboarding slides introducing the app.

·         Use large illustrations, short text, and modern animations.

·         Slide 1 → “Discover the Best AI Tools”

·         Slide 2 → “Track, Compare & Save Tools”

·         Slide 3 → “Ask Our AI Chatbot Anything”

·         Slide 4 → “Watch Tutorials & Learn Faster”
Add a Get Started button that leads to Signup/Login.

2. Authentication Screens

·         Signup page with fields: full name, email, password.

·         Login page with email + password.

·         Add “Forgot Password?” function.

·         Add Google/Apple login buttons.

·         Use a clean, modern card layout with glassmorphism.

3. Homepage (After Login)

·         Big search bar on top (“Search AI tools…”)

·         Category buttons (Writing, Coding, Video, Image, Business, Research, etc.)

·         Section: “Trending AI Tools This Week”

·         Section: “Recently Added Tools”

·         Smooth fade-in animations for all cards and components.

4. AI Tools List Page

·         Display tools from the database with:

o    Logo

o    Name

o    Short description

o    Category tag

o    Rating

o    A “View Tool” button

·         Add filters for category + sorting (rating, newest, most popular).

5. Single Tool Details Page

·         Tool logo/banner

·         Full description

·         Pricing info

·         Features list

·         Pros & Cons

·         Direct link to official website

·         Similar tools section (recommended using category)

·         Button: Add to Favorites

6. Favorites Page

·         Show tools that the user saved.

·         Allow users to remove from favorites.

7. AI Chatbot Slide

·         Create a chatbot screen where users can type any question.

·         The chatbot should answer questions about:

o    AI tools

o    Productivity

o    How to use the app

·         Add suggestions like:

o    “Recommend me the best AI video generator”

o    “Which AI tool is best for writing?”

·         Use a modern chat UI with bubbles, avatars, and typing animation.

8. Instructions & Tutorials Slide

·         Add a page named “How It Works”

·         Include text instructions explained step-by-step.

·         Add a section for embedded tutorial videos.

·         Add a “Tips & Best Practices” section.

·         Make the layout clean, simple, and friendly.

9. Profile Page

·         Show user info: name, email, profile picture.

·         Add toggles for dark/light mode.

·         Add a logout button.

📌 DATABASE STRUCTURE

Create a database named AI_Tools with fields:

·         name (text)

·         category (text)

·         description (long text)

·         pricing (text)

·         website_url (text)

·         logo (image upload)

·         rating (number 1–5)

·         date_added (date)

Create a Favorites database:

·         user_id

·         tool_id

📌 DESIGN STYLE

·         Use a futuristic design system.

·         Dark background + neon gradients (purple/blue).

·         Rounded cards with glassmorphism effect.

·         Smooth transitions and micro-animations.

·         Modern typography, big headings, subtle shadows.

📌 EXTRA FEATURES

·         Add search + category filters.

·         Add simple analytics showing “Most Viewed Tools.”

·         Add a notification system for new tool updates.

·         Make everything fully responsive for mobile and web.

Build this app completely with clean navigation, linked pages, functional signup/login, working chatbot interface, and a professional UX flow.

Prompt End ⬆️

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://neuron-view.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1b66a8b4-2184-4a48-b509-0f2a9b2a972a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
