# React TMDB API Client

A client-side movie discovery application built with React and Vite, integrating with The Movie Database (TMDB) API for remote movie data retrieval.

The application implements asynchronous API communication, client-side routing, global state management through the React Context API, persistent browser storage, movie search, favorites management and responsive movie-card rendering.

---

## Overview

This project demonstrates the implementation of a modular React frontend that communicates with an external REST API.

The application retrieves movie metadata from the TMDB API and provides functionality for:

- browsing popular movies
- searching movies by title
- displaying movie posters and release dates
- adding and removing movies from favorites
- persisting favorites between browser sessions
- navigating between application views using client-side routing
- handling asynchronous loading and error states

The frontend is implemented as a single-page application using React and Vite.

---

## Application Preview

### Movie Discovery

![Home page](docs/screenshots/home.png)

### Favorites

![Favorites page](docs/screenshots/favorites.png)

---

## Technology Stack

### Core

- React 18
- JavaScript
- Vite
- HTML5
- CSS3

### Application Architecture

- React Router DOM
- React Context API
- React Hooks
- REST API integration
- Browser Local Storage

### Tooling

- npm
- ESLint
- Vite development server
- Git
- GitHub

---

## Architecture

The application separates UI components, application pages, global state management and external API communication into independent modules.

```text
src/
│
├── components/
│   ├── MovieCard.jsx
│   └── NavBar.jsx
│
├── contexts/
│   └── MovieContext.jsx
│
├── css/
│   ├── App.css
│   ├── Favorites.css
│   ├── Home.css
│   ├── MovieCard.css
│   ├── Navbar.css
│   └── index.css
│
├── pages/
│   ├── Favorites.jsx
│   └── Home.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
└── main.jsx
```

---

## Data Flow

```text
TMDB REST API
      │
      ▼
src/services/api.js
      │
      ▼
React Page Components
      │
      ├── Home
      │
      └── Favorites
      │
      ▼
Reusable UI Components
      │
      ├── MovieCard
      │
      └── NavBar
      │
      ▼
React Context API
      │
      ▼
localStorage
```

Remote movie data is retrieved through the API service layer, while favorite state is managed globally through `MovieContext`.

---

## API Integration

External movie data is retrieved from:

```text
https://api.themoviedb.org/3
```

The API communication layer is isolated inside:

```text
src/services/api.js
```

The application currently exposes the following API functions:

```javascript
getPopularMovies()
searchMovies(query)
```

The TMDB API key is injected through a Vite environment variable:

```javascript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

This avoids hardcoding environment-specific configuration directly into the source repository.

The search request also applies URL encoding to user input:

```javascript
encodeURIComponent(query)
```

before sending it to the TMDB search endpoint.

---

## Environment Configuration

The project uses an environment variable for the TMDB API key.

Create a `.env` file in the root directory:

```text
.env
```

Add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

The repository includes an example configuration:

```text
.env.example
```

with the following structure:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

The real `.env` file is excluded from Git through `.gitignore`.

> Vite environment variables prefixed with `VITE_` are embedded into the client-side bundle during the build process. They should therefore not be treated as fully private server-side secrets.

---

## State Management

Favorite movies are managed globally using the React Context API.

The `MovieContext` exposes:

```javascript
favorites
addToFavorites(movie)
removeFromFavorites(movieId)
isFavorite(movieId)
```

This allows components to access and modify shared application state without prop drilling.

The context provider is mounted at the application level:

```jsx
<MovieProvider>
    <NavBar />

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
    </Routes>
</MovieProvider>
```

---

## Persistent Favorites

Favorite movie data is persisted using the browser `localStorage` API.

When the application initializes:

```javascript
localStorage.getItem("favorites")
```

is used to restore previously stored favorite movies.

Whenever the favorites state changes:

```javascript
localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
);
```

updates the browser storage.

This allows favorite selections to persist after page refreshes and browser restarts.

---

## Client-Side Routing

The application uses `react-router-dom` for client-side navigation.

Current routes:

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Movie discovery and search |
| `/favorites` | `Favorites` | Saved favorite movies |

Routing is initialized using:

```jsx
<BrowserRouter>
    <App />
</BrowserRouter>
```

This allows navigation between application views without full-page reloads.

---

## Search Flow

Movie search follows the following execution path:

```text
User Input
    │
    ▼
handleSearch()
    │
    ▼
searchMovies(query)
    │
    ▼
TMDB Search Endpoint
    │
    ▼
JSON Response
    │
    ▼
React State Update
    │
    ▼
MovieCard Rendering
```

The search form uses controlled React state through:

```javascript
const [searchQuery, setSearchQuery] = useState("");
```

Search requests are executed asynchronously using `async/await`.

---

## Asynchronous Data Handling

The `Home` page maintains separate state for:

```javascript
movies
searchQuery
currentPage
totalPages
loading
error
```

API communication is handled asynchronously.

Example request lifecycle:

```javascript
try {
    setLoading(true);

    const movies = await getPopularMovies();

    setMovies(movies);
    setError(null);
} catch (error) {
    setError("Failed to load popular movies...");
} finally {
    setLoading(false);
}
```

This allows the interface to provide separate states for:

- loading
- request failure
- successful data retrieval

---

## Components

### MovieCard

`MovieCard` is a reusable presentation component responsible for displaying individual movie data.

It renders:

- movie poster
- movie title
- release date
- favorite action

The component consumes `MovieContext` to determine whether a movie is currently stored as a favorite.

---

### NavBar

`NavBar` provides application-level navigation.

It uses React Router `Link` components to navigate between:

```text
Home
Favorites
```

without reloading the page.

---

### Home

The `Home` page is responsible for:

- retrieving popular movies
- searching movies
- managing loading state
- managing error state
- pagination state
- rendering the movie grid

---

### Favorites

The `Favorites` page consumes globally stored favorite movie data from `MovieContext`.

Favorite movies are rendered using the same reusable `MovieCard` component used by the main movie-discovery page.

---

## Project Structure

```text
react-tmdb-api-client/
│
├── public/
│
├── docs/
│   └── screenshots/
│       ├── home.png
│       └── favorites.png
│
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   └── NavBar.jsx
│   │
│   ├── contexts/
│   │   └── MovieContext.jsx
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

# Local Development

## Prerequisites

The following software must be installed before running the project:

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

Navigate into the project directory:

```bash
cd react-tmdb-api-client
```

---

## 2. Install Dependencies

Install all runtime and development dependencies defined in `package.json`:

```bash
npm install
```
also

```bash
npm install prop-types
```

This installs packages including:

```text
react
react-dom
react-router-dom
vite
eslint
@vitejs/plugin-react
```

The generated `node_modules/` directory is excluded from version control.

---

## 3. Configure the TMDB API Key

Create a local `.env` file from the provided example configuration.

### Windows

```bat
copy .env.example .env
```

### macOS / Linux

```bash
cp .env.example .env
```

Open the newly created `.env` file and replace:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

with your actual TMDB API key.

The API key can be obtained from The Movie Database developer settings.

---

## 4. Start the Development Server

Run:

```bash
npm run dev
```

Vite starts the local development server.

The application is typically available at:

```text
http://localhost:5173
```

Use the exact URL displayed in the terminal.

---

## 5. Run ESLint

Run static code analysis before committing changes:

```bash
npm run lint
```

ESLint uses the project configuration defined in:

```text
eslint.config.js
```

---

## 6. Create a Production Build

Generate an optimized production bundle:

```bash
npm run build
```

The compiled application is written to:

```text
dist/
```

The `dist/` directory is generated automatically and is excluded from version control.

---

## 7. Preview the Production Build

After creating the production build, run:

```bash
npm run preview
```

This starts a local server using the generated production bundle.

---

## Available npm Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Generates the optimized production bundle |
| `npm run lint` | Runs ESLint static analysis |
| `npm run preview` | Serves the generated production build locally |

---

## Development Workflow

Typical local development workflow:

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

## Core Dependencies

### React

Used for declarative and component-based user interface development.

### React DOM

Provides browser DOM integration for the React component tree.

### React Router DOM

Provides client-side routing between application views without full-page reloads.

### Vite

Used as the frontend development server, module bundler and production build system.

### ESLint

Provides static source-code analysis and helps enforce code-quality rules.

---

## Security and Configuration

The TMDB API key is not hardcoded directly into the source repository.

Local environment configuration is stored inside:

```text
.env
```

while the repository contains only:

```text
.env.example
```

Environment files are excluded from Git using `.gitignore`.

Because this is a client-side application, Vite environment variables become part of the compiled frontend bundle.

Credentials that must remain fully private should instead be handled by a backend service, serverless function or API proxy.

---

## Current Features

- TMDB REST API integration
- popular movie retrieval
- movie title search
- asynchronous data fetching
- movie poster rendering
- release-date rendering
- favorites management
- Context API state management
- localStorage persistence
- React Router navigation
- responsive movie grid
- loading state
- error state
- local pagination
- reusable movie-card components
- environment-based API configuration

---

## Potential Improvements

Future improvements could include:

- native TMDB server-side pagination
- debounced search input
- request cancellation with `AbortController`
- centralized API error handling
- HTTP response validation using `response.ok`
- movie detail pages
- dynamic route parameters
- genre filtering
- sorting and filtering
- missing-poster fallback handling
- skeleton loading states
- TypeScript migration
- unit tests
- React component tests
- end-to-end tests
- responsive navigation
- accessibility improvements
- GitHub Actions continuous integration
- automated deployment
- API caching
- request deduplication
- backend API proxy for credential isolation

---

## API Attribution

Movie data and images are provided by The Movie Database (TMDB).

This product uses the TMDB API but is not endorsed or certified by TMDB.

---

## Repository

```text
https://github.com/lanadanolic/react-tmdb-api-client
```

---

## License

This repository is intended for educational and portfolio purposes.