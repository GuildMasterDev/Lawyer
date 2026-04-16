# Lawyer — Legal Resources Directory

A curated directory of 25+ legal resources — free legal aid, online services, bar associations, pro bono programs, legal research, and emergency help. Available as a desktop app (Electron) and an offline-capable web app (PWA).

> **Live demo:** <https://guildmasterdev.github.io/Lawyer>

## Important Legal Disclaimer

**THIS APPLICATION DOES NOT PROVIDE LEGAL ADVICE.**

This directory is provided for informational purposes only. The information contained in this application:

- Is NOT a substitute for professional legal advice
- Does NOT create an attorney-client relationship
- Should NOT be relied upon for making legal decisions
- May not be current or applicable to your specific situation

**Always consult with a qualified attorney licensed in your jurisdiction before making any legal decisions or taking any legal action.**

The creators and maintainers of this application:
- Are NOT responsible for any decisions made based on the information provided
- Do NOT endorse or recommend any specific legal service or attorney
- Cannot guarantee the accuracy, completeness, or timeliness of the information
- Make NO warranties or representations about the suitability of any listed resource

## For Legal Emergencies

If you are in immediate danger, call **911**.

For urgent legal matters, contact:
- **National Domestic Violence Hotline:** 1-800-799-7233
- **RAINN National Sexual Assault Hotline:** 1-800-656-4673
- **988 Suicide & Crisis Lifeline:** 988
- Your local bar association's lawyer referral service

## Features

- **25+ curated resources** across six categories: Free Legal Aid, Online Services, Bar Associations, Pro Bono Services, Legal Research, and Emergency Help
- **Search and filter** across name, description, services, and coverage
- **Category chips and cost filters** (Free / Low-Cost / Paid)
- **Grid and list views**
- **Clickable `tel:` links** for phone numbers and emergency hotlines
- **Prominent disclaimer** on every view, with an accessible full-text modal
- **Pinned emergency help card** in the sidebar — always one tap away
- **Dark theme** (professional navy on near-black) with responsive layout down to mobile
- **Offline support** via PWA service worker (web version)
- **Installable** to home screen / dock on modern browsers

## Web version (live demo / PWA)

The web version lives in [`web/`](./web/) as a single self-contained `index.html` with inline CSS and JS (no build step, no external dependencies).

- **Hosted on GitHub Pages:** <https://guildmasterdev.github.io/Lawyer>
- **Installable as a PWA:** supports "Add to Home Screen" / "Install App" on mobile and desktop browsers
- **Offline-capable:** cache-first service worker (`lawyer-v1`) keeps the full directory available without a network connection once cached

To run the web version locally:

```bash
# Any static server works — for example:
npx serve web
# or
python3 -m http.server -d web 8000
```

## Desktop version (Electron)

```bash
git clone https://github.com/GuildMasterDev/Lawyer.git
cd Lawyer
npm install
npm start
```

### Building desktop installers

The project is pre-configured for [`electron-builder`](https://www.electron.build):

```bash
npm run dist          # build for current platform
npm run dist:mac      # macOS: dmg + zip (x64 + arm64)
npm run dist:win      # Windows: NSIS + portable
npm run dist:linux    # Linux: AppImage + deb
```

Artifacts land in `dist/`.

## Resource categories

- **Free Legal Aid** — government and nonprofit legal assistance programs
- **Online Services** — digital legal platforms and document services
- **Bar Associations** — state and local bar referral services
- **Pro Bono Services** — volunteer lawyer programs
- **Legal Research** — law libraries and research tools
- **Emergency Help** — crisis hotlines with legal support

## Technology stack

- **Electron 41** — cross-platform desktop application framework
- **electron-builder 26** — multi-target packaging (mac / win / linux)
- **Vanilla JavaScript** — no frameworks, no build step
- **HTML5 / CSS3** — responsive, accessible UI with a dark theme
- **PWA** — service worker + Web App Manifest for the web version

## Project layout

```
.
├── main.js               # Electron main process
├── preload.js            # Electron preload (contextBridge)
├── renderer.js           # Electron renderer (fetches resources.json)
├── index.html            # Electron renderer markup
├── styles.css            # Electron renderer styles
├── resources.json        # Source of truth for all resources
├── resources/            # App icons for Electron packaging
├── web/
│   ├── index.html        # Self-contained web app (inline CSS/JS + data)
│   ├── manifest.json     # PWA manifest
│   ├── sw.js             # Service worker (lawyer-v1)
│   └── icons/            # PWA icons (192, 512, maskable)
└── .github/workflows/
    ├── ci.yml            # Node --check + JSON validation
    └── deploy-web.yml    # GitHub Pages deploy for web/
```

## Contributing

This is an open-source project. Contributions, issues, and feature requests are welcome. Please ensure any added resources are legitimate, verified, and accompanied by a real current URL.

## Support

- **Technical issues:** <https://github.com/GuildMasterDev/Lawyer/issues>
- **Legal questions:** please consult with a qualified attorney

## License

MIT License — see [LICENSE](LICENSE).

---

Copyright (c) 2026 GuildMaster Development
