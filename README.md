# Ashesh Shrestha — Portfolio

Personal portfolio at [asheshstha.com.np](https://asheshstha.com.np), deployed to GitHub Pages on every push to `master`.

No build step. Plain HTML, CSS and JavaScript, with Three.js loaded from a CDN for the particle background.

## Editing content

All text, links, skills, experience and projects live in **`js/data.js`**. Edit that file and push. Lines marked `TODO` are placeholders:

- `email`, `location` and the LinkedIn URL in `socials`
- the `experience` entries (company names, dates, bullet points)
- the `projects` entries (titles, descriptions, `github` / `live` links)
- the `stats` numbers in `about`

Headline words wrapped in `*asterisks*` get the gradient highlight. About-me text wrapped in `**double asterisks**` is rendered bold.

## Structure

```
index.html        page skeleton (sections are filled from data.js)
css/style.css     styles; colour tokens are at the top of the file
js/data.js        your content
js/main.js        rendering, animations, particle background
assets/           favicon
```

## Run locally

Open `index.html` directly, or serve the folder:

```
python -m http.server 8000
```

then visit http://localhost:8000.
