# React TMDB API Client

A client-side movie discovery application built with React and Vite, integrating with The Movie Database (TMDB) REST API.

The project demonstrates asynchronous API communication, client-side routing, global state management, persistent browser storage and reusable React component architecture.

---

## Demo

<p align="center">
  <img
    src="docs/screenshots/demo.gif"
    alt="React TMDB API Client Demo"
    width="900"
  />
</p>

---

## Features

- Browse popular movies from TMDB
- Search movies by title
- Display movie posters, ratings and release information
- Add and remove movies from favorites
- Persist favorites using `localStorage`
- Navigate between views using React Router
- Global state management with React Context API
- Loading and error states
- Responsive movie grid
- Environment-based API configuration
- ESLint static code analysis
- Production builds with Vite

---

## Tech Stack

### Frontend

- React 18
- JavaScript
- HTML5
- CSS3
- Vite

### React

- React Router DOM
- Context API
- React Hooks
- PropTypes

### Data and APIs

- TMDB REST API
- Fetch API
- Browser Local Storage

### Tooling

- npm
- ESLint
- Git
- GitHub

---

## Architecture

The project separates application responsibilities into reusable components, page-level views, state management and an API service layer.

```text
TMDB REST API
      │
      ▼
services/api.js
      │
      ▼
React Pages
      │
      ├── Home
      └── Favorites
      │
      ▼
Reusable Components
      │
      ├── MovieCard
      └── NavBar
      │
      ▼
MovieProvider
      │
      ▼
MovieContext
      │
      ▼
localStorage
```

---

## Project Structure

```text
react-tmdb-api-client/
│
├── docs/
│   └── screenshots/
│       ├── demo.gif
│       ├── home.png
│       └── favorites.png
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   └── NavBar.jsx
│   │
│   ├── contexts/
│   │   ├── MovieContext.js
│   │   ├── MovieProvider.jsx
│   │   └── useMovieContext.js
│   │
│   ├── css/
│   │   ├── App.css
│   │   ├── Favorites.css
│   │   ├── Home.css
│   │   ├── MovieCard.css
│   │   ├── Navbar.css
│   │   └── index.css
│   │
│   ├── pages/
│   │   ├── Favorites.jsx
│   │   └── Home.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## API Integration

Movie data is retrieved from the TMDB API:

```text
https://api.themoviedb.org/3
```

API communication is isolated inside:

```text
src/services/api.js
```

The service currently provides:

```javascript
getPopularMovies();
searchMovies(query);
```

The TMDB API key is accessed through a Vite environment variable:

```javascript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

---

## State Management

Global favorite state is implemented using the React Context API.

The state layer is separated into:

```text
MovieContext.js
MovieProvider.jsx
useMovieContext.js
```

The provider exposes:

```javascript
favorites;
addToFavorites(movie);
removeFromFavorites(movieId);
isFavorite(movieId);
```

Favorite movies are persisted in browser storage using:

```javascript
localStorage
```

This allows favorites to remain available after refreshing or reopening the application.

---

## Routing

The application uses `react-router-dom` for client-side routing.

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Movie discovery and search |
| `/favorites` | `Favorites` | Saved favorite movies |

The router is initialized with:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

---

# Local Development

## Prerequisites

Install:

```text
Node.js
npm
Git
```

Verify the installations:

```bash
node --version
npm --version
git --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/lanadanolic/react-tmdb-api-client.git
```

```bash
cd react-tmdb-api-client
```

---

## 2. Install Dependencies

```bash
npm install
```

This installs all runtime and development dependencies defined in `package.json`.

The generated `node_modules/` directory is excluded from version control.

---

## 3. Configure the TMDB API Key

Create a local `.env` file from `.env.example`.

### Windows

```bat
copy .env.example .env
```

### macOS / Linux

```bash
cp .env.example .env
```

Add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

---

## 4. Start the Development Server

```bash
npm run dev
```

The application is typically available at:

```text
http://localhost:5173
```

Use the exact URL displayed by Vite in the terminal.

---

## Code Quality

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run lint` | Runs ESLint static analysis |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Serves the production build locally |

---

## Development Workflow

Typical development workflow:

```bash
git pull
npm install
npm run dev
```

Before pushing changes:

```bash
npm run lint
npm run build

git status
git add .
git commit -m "Describe the implemented change"
git push
```

---

## Environment and Security

The TMDB API key is not hardcoded directly into the repository.

Local configuration is stored in:

```text
.env
```

while the repository only contains:

```text
.env.example
```

The `.env` file is excluded through `.gitignore`.

> Vite variables prefixed with `VITE_` are included in the client-side bundle and should not be treated as server-side secrets.

Credentials requiring full secrecy should be handled through a backend service or API proxy.

---

## Future Improvements

- Native TMDB server-side pagination
- Debounced movie search
- Request cancellation with `AbortController`
- Centralized API error handling
- Movie detail routes
- Genre filtering
- Sorting and filtering
- Skeleton loading states
- TypeScript migration
- Unit and component testing
- End-to-end testing
- GitHub Actions CI
- Automated deployment
- API caching
- Backend API proxy

---

## API Attribution

Movie data and images are provided by The Movie Database (TMDB).

This product uses the TMDB API but is not endorsed or certified by TMDB.

---

## License

This repository is intended for educational and portfolio purposes.