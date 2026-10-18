# Twofold

Twofold is a browser game with a free GitHub Pages edition and an optional
server-hosted multiplayer edition.

## Play

After the GitHub Pages workflow completes, play at:

`https://soundousbayan14-beep.github.io/Twofold/`

The free GitHub Pages edition serves the game for everyone to play, but cannot
host Socket.IO multiplayer rooms. Online rooms require the Node.js server and
can be deployed separately using the included `render.yaml`.

## Run locally

```sh
npm install
npm start
```

Open `http://localhost:3000`.

## GitHub Pages deployment

The `Deploy GitHub Pages` workflow publishes `index.html` whenever changes are
pushed to the `main` branch. In the repository settings, set **Pages > Build
and deployment > Source** to **GitHub Actions** if it is not already selected.
The first deployment may take a few minutes.
