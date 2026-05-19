# Product Requirements Document

## Overview
FreshCart Market is an e-commerce management application for fruit and vegetable products, carts, payments, orders, reporting, and store settings. This request adds a public landing page that introduces the FreshCart store experience before authentication, provides clear calls to action for signing in, and preserves the existing authenticated dashboard and navbar flows after login.

## Goals
- Add a polished public landing page for unauthenticated visitors at the root route.
- Keep the existing login experience available at /login.
- Ensure authenticated users visiting / are redirected to /dashboard.
- Provide clear calls to action from the landing page to login and core product/cart value propositions.
- Preserve all existing protected routes and navbar links after login.
- Avoid unnecessary backend or database changes because the landing page is static/public UI.

## User Stories
- As a **visitor**, I want **to see a landing page before logging in**, so that **I can understand what FreshCart Market offers before entering credentials**
- As a **visitor**, I want **a clear sign-in call to action**, so that **I can quickly access the FreshCart dashboard using my account**
- As a **store admin**, I want **authenticated routes and navbar navigation to keep working after login**, so that **I can manage products, carts, orders, reports, and settings without routing issues**
- As a **returning authenticated user**, I want **to be redirected from the public landing page to my dashboard**, so that **I do not have to log in again or manually navigate**
- As a **mobile visitor**, I want **the landing page to be responsive**, so that **I can view the store introduction and sign in from any device**

## Features
### Public Landing Page (P0)
Create a new unauthenticated landing page for FreshCart Market with hero messaging, produce-focused branding, benefit highlights, and sign-in calls to action.

### Landing Route Integration (P0)
Update frontend routing so / renders the landing page for unauthenticated users and redirects authenticated users to /dashboard.

### Login Route Preservation (P0)
Keep /login as the dedicated authentication route and ensure existing login behavior redirects users to /dashboard after successful authentication.

### Authenticated Navbar Preservation (P0)
Ensure the authenticated header/navbar remains visible only on protected app routes and all existing NavLink targets continue matching real routes.

### Landing Page Responsive UX (P1)
Design the landing page with responsive layout, readable typography, accessible buttons/links, and consistent FreshCart fruit-and-vegetable visual style.

## Non-Functional Requirements
- Landing page must not require authentication.
- Landing page must render without calling backend APIs.
- Internal navigation must use React Router Link/NavLink instead of raw anchor tags for app routes.
- All Link/NavLink destinations must correspond to defined routes.
- The frontend route shell must keep protected pages reachable: /dashboard, /cart, /orders, /products, /reports, and /settings.
- The login page must remain accessible at /login for unauthenticated users.
- Authenticated users should not see the public landing page when visiting /; they should be redirected to /dashboard.
- Unauthenticated users attempting protected routes must be redirected to /login.
- The implementation should be minimal and avoid backend/database changes unless future dynamic landing content is introduced.
- Existing database migration and seed scripts must remain in sync with runtime schema; no landing-page schema changes are expected.

## Assumptions
- The landing page is a static frontend page and does not require CMS-backed or database-backed content.
- The application already has working authentication using localStorage token storage.
- The current protected app experience starts at /dashboard after login.
- The FreshCart Market brand should continue using green/orange produce-themed styling.
- The primary call to action on the landing page should navigate to /login.
- Existing backend APIs for auth, products, cart, and orders remain unchanged for this request.
- No new database tables, fields, migrations, or seed data are required for the landing page.

## Constraints
- Make minimal changes focused on frontend routing and UI.
- Preserve the existing folder structure under frontend/, backend/, and db/.
- Do not remove existing protected routes or navbar destinations.
- Do not introduce raw internal href navigation that bypasses React Router.
- Do not change backend API contracts for this static landing page request.
- Do not alter database schema unless a future requirement introduces dynamic landing content.

---

## Document history

### 2026-05-17T09:31:42.756Z

## Overview
FreshCart Market is an e-commerce store management application for fruits and vegetables with protected dashboard, cart, products, orders, reports, and settings pages. This request updates the authentication experience by polishing the login page UI and adding a reliable hardcoded admin account so users can sign in immediately with known credentials. The backend login API must accept the admin credentials, return a valid JWT/session payload, and the database migration/seed artifacts must remain synchronized so the admin user exists on deploy.

## Goals
- Provide a more polished, clear, and trustworthy login page UI for the FreshCart fruits and vegetables admin dashboard.
- Allow login using a hardcoded admin account without requiring manual user creation.
- Display the admin credentials clearly on the login page and prefill them for quick demo access.
- Ensure successful login stores the returned token and user object, then redirects to the protected dashboard.
- Keep database migration and seed scripts aligned with the runtime authentication model by including the admin user seed data.
- Preserve existing landing page, protected routes, and navbar behavior after authentication.

## User Stories
- As a **store admin**, I want **to see a clean login page with the admin credentials visible**, so that **I can quickly access the FreshCart dashboard without guessing credentials**
- As a **store admin**, I want **to log in with a known hardcoded admin account**, so that **I can manage products, carts, orders, reports, and settings immediately**
- As a **demo evaluator**, I want **the login form to be prefilled with valid admin credentials**, so that **I can test the application with minimal friction**
- As a **frontend user**, I want **to be redirected to the dashboard after successful login**, so that **I can access the authenticated application and navbar**
- As a **developer**, I want **the seeded admin user and backend hardcoded login behavior to match**, so that **deployments and local environments authenticate consistently**

## Features
### Polished Login Page UI (P0)
Update the login page with a stronger FreshCart visual identity, better layout, clearer form labels, helpful credential panel, error messaging, loading state, and navigation back to the landing page.

### Hardcoded Admin Login (P0)
Support a known admin account in the backend authentication route. The login endpoint should accept the configured admin email and password, create or upsert the admin user if needed, and return a valid JWT plus user profile payload.

### Admin Credential Prefill (P1)
Prefill the login form with the admin email and password and show the credentials in a credential hint card so demo access is obvious.

### Admin User Seed Synchronization (P0)
Update ordered database migration and seed artifacts so the admin user exists with matching email, password, name, and role when the database is initialized.

### Authenticated Redirect Preservation (P1)
Keep the existing behavior where successful login stores token/user in localStorage, redirects to /dashboard, and protected pages render the navbar.

## Non-Functional Requirements
- Login should complete with the hardcoded admin credentials in local development and deployed environments as long as the backend is reachable.
- The login page must be responsive and usable on mobile and desktop viewports.
- Internal navigation must use React Router Link/NavLink components rather than raw anchor tags.
- The authentication API response shape must remain compatible with the frontend login helper: response.data.data.token and response.data.data.user.
- Database migration files must remain ordered and deploy-safe.
- No existing protected route should become unreachable as part of this change.
- Error states should be user-friendly and should not expose stack traces or sensitive server details.
- The hardcoded password is acceptable for demo/admin bootstrap use in this project context but should be easy to replace with environment-based credentials later.

## Assumptions
- The desired hardcoded admin credentials are email: admin@freshcart.com and password: admin123 unless the implementation keeps the current demo credentials for backward compatibility.
- For compatibility with existing data and prior UI, the backend may also continue accepting demo@example.com / demo123.
- The admin user should have name Demo Admin or FreshCart Admin and role admin.
- Passwords are currently stored in plain text in the existing schema; this request does not require introducing password hashing, though hashing is recommended for production.
- The existing backend uses Fastify, Prisma, PostgreSQL, and JWT.
- The existing frontend uses React, React Router, Tailwind CSS, and axios.
- No new page routes are required; the change is limited to the login page, auth endpoint, and database seed/migration artifacts.
- The login endpoint remains public and does not require an existing JWT.

## Constraints
- Preserve the current project folder structure under frontend/, backend/, and db/.
- Do not remove existing migration files; update or add ordered migrations where required.
- Do not break the existing /, /login, /dashboard, /cart, /orders, /products, /reports, and /settings routes.
- Frontend links must point to valid React Router routes.
- Backend API paths should remain under the /api prefix as registered by the server route system.
- The frontend login flow must remain compatible with localStorage keys token and user.
- Avoid large rewrites outside the authentication and login UI scope.