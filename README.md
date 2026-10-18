# Twofold

Twofold is a browser game with server-hosted Socket.IO multiplayer rooms.

## Run locally

```sh
npm install
npm start
```

Open `http://localhost:3000`.

## Publish with GitHub and Render

GitHub stores the source code; Render runs the Node.js server required for the
game and its multiplayer rooms. GitHub Pages alone cannot run the room server.

1. Create a **public** repository on GitHub (leave the options to add a README
   or `.gitignore` unchecked).
2. In this project folder, run the following commands, replacing the URL with
   your repository URL:

   ```sh
   git init -b main
   git add .
   git commit -m "Publish Twofold"
   git remote add origin https://github.com/OWNER/REPOSITORY.git
   git push -u origin main
   ```

3. In Render, choose **New > Blueprint**, connect the repository, and deploy
   the included `render.yaml`.
4. Once the deployment is live, share its `https://...onrender.com` URL.

The Render health check uses `/health`. The room server and game page are served
from the same origin, so Socket.IO works without a separate URL or configuration.
