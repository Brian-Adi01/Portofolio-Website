# Gede Brian Adi Mahendra: Portfolio

Static site (HTML, CSS, vanilla JS). No build, no install.

## Run
Open `index.html` directly, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Edit
- Text: `js/language.js` (EN/ID dictionary). The English text inside each HTML file is only a fallback.
- Colors/fonts: `:root` in `css/style.css`.
- Images, repo/demo links, Instagram/LinkedIn URLs: `js/projects.js`.
- Quest: `quest.html` (objectives, milestones) and the `quest.*` keys in `language.js`.

## Replace placeholders
Put files in `assets/images/` and change the paths in `js/projects.js`. Screenshots: 16:10 (1280x800 px, PNG/JPG/WebP). Avatar: 4:5 (800x1000 px).
Files: `avatar.webp`, `project-shopping-list.png`, `project-minecraft.png`, `project-google-data.png`, `project-3d-game.png`, `project-roblox.png`, `project-arduino.png`, `project-2d-game.png`, `project-macro.png`.

## Deploy
Upload the folder to any static host (GitHub Pages, Netlify, Cloudflare Pages...). All paths are relative, so subfolders work. Sound is off by default; there are no sound files. Navigation uses short beeps and page changes use a synthesized swoosh.

## CV
Files are in `assets/cv/` (`CV-Gede-Brian-Adi-Mahendra-EN/ID` as `.pdf` and editable `.docx`). The Download CV buttons (home and contact) pick the file that matches the selected language. To update: edit the .docx, export as PDF, and replace the file with the same name.
