# WeatherMate Frontend

WeatherMate is a modern weather dashboard web app built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**. It features authentication, weather search, and search history, using a REST API backend.

## Features

- **User Authentication:** Register, login, and logout with JWT and refresh tokens.
- **Protected Routes:** Only authenticated users can access the dashboard.
- **Weather Search:** Search for current weather by city.
- **Search History:** View your recent weather searches.
- **Responsive UI:** Styled with TailwindCSS for a clean, mobile-friendly experience.
- **React Query:** Efficient data fetching and caching.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```sh
git clone https://github.com/asathsara/weathermate-frontend.git
cd weathermate-frontend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=https://your-api-url.com
```

### Running the App

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

## Project Structure

```
src/
  App.tsx                # Main app component, routing
  main.tsx               # Entry point, React Query setup
  index.css              # TailwindCSS and global styles
  types.ts               # TypeScript interfaces for Weather & History
  components/            # (For reusable UI components)
  contexts/
    AuthContext.tsx      # Auth context type and provider
    AuthProvider.tsx     # Auth state management
    ProtectedRoute.tsx   # Route protection for authenticated pages
  hooks/
    useAuth.tsx          # Auth context hook
    useAuthQuery.tsx     # Auth state query (refresh token)
  pages/
    Dashboard.tsx        # Weather dashboard (search, history)
    Login.tsx            # Login form
    Register.tsx         # Registration form
  services/
    api.ts               # Axios client, token management
    auth.ts              # Auth API calls (login, register, logout)
    weather.ts           # Weather & history API calls
```

## Authentication Flow

- On app load, [`useAuthQuery`](src/hooks/useAuthQuery.tsx) checks for a valid refresh token.
- Auth state is managed via [`AuthProvider`](src/contexts/AuthProvider.tsx) and [`AuthContext`](src/contexts/AuthContext.tsx).
- Protected routes use [`ProtectedRoute`](src/contexts/ProtectedRoute.tsx) to restrict access.

## API Integration

- All API requests use [`apiClient`](src/services/api.ts) with JWT access tokens.
- Automatic token refresh on 401/403 responses.
- Weather and history endpoints are called via [`weather.ts`](src/services/weather.ts).
- Auth endpoints are handled in [`auth.ts`](src/services/auth.ts).

## Customization

- Update `VITE_API_BASE_URL` in `.env` to point to your backend.
- Extend UI in `components/` as needed.
- Add more pages or features in `pages/`.

## Linting & Formatting

- ESLint is configured in [`eslint.config.js`](eslint.config.js) for TypeScript and React.
- Recommended: expand ESLint config for type-aware and stylistic rules (see below).

## Expanding ESLint Configuration

See the [README section above](#expanding-the-eslint-configuration) for advanced ESLint setup.

## License

MIT

---

**WeatherMate** –