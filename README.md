# Twofold

Twofold is a browser game with a free GitHub Pages edition. Its online rooms
connect players peer-to-peer using PeerJS.

## Play

After the GitHub Pages workflow completes, play at:

`https://soundousbayan14-beep.github.io/Twofold/`

The free GitHub Pages edition supports peer-to-peer rooms. Room discovery uses
the PeerJS cloud signaling service, while game state is sent between players.
An optional Node.js / Socket.IO server is also included for server-hosted rooms.

## Run locally

```sh
npm install
npm start
```

Open `http://localhost:3000`.

## GitHub Pages deployment

The `Deploy GitHub Pages` workflow publishes `index.html` and its 3D character
model whenever changes are pushed to the `main` branch. The repository's Pages
source must be set to **GitHub Actions**. The first deployment may take a few
minutes.

The character is based on
[Blocky Character Template (rigged)](https://sketchfab.com/3d-models/blocky-character-template-rigged-3654b1f3376e49f9ae2dd4bbd8697091)
by [TRexIndominus12](https://sketchfab.com/TRexIndominus12), licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
