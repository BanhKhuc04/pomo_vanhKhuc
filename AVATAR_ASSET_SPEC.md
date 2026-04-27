# Avatar Asset Specification

## 🎯 Goal
The goal of this layer-based avatar system is to allow maximum customization (hair, glasses, outfits, accessories, pets) without maintaining hundreds of static permutations. It provides a modular pipeline where individual PNG layers stack together to create a unified character.

## 📐 Canvas & Asset Guidelines
To ensure all layers align perfectly when stacked, **EVERY** PNG layer must follow these strict rules:
- **Canvas Size**: `256x256 px` (recommended). All layers must share the exact same canvas dimension.
- **Background**: `Transparent` (no solid colors behind the character).
- **Format**: `PNG` only. (Do not use JPG to avoid artifacts and missing transparency).
- **Alignment / Anchor Point**: The character's position must be locked across all layers. Do not crop the transparent space around a small item (e.g., glasses). Keep the item exactly where it belongs within the `256x256` frame.
- **Safe Zone**: The character should be contained within a safe area (e.g., `x=40..216`, `y=20..240`) to leave room for animations (bounce, float, celebrate).
- **Scale**: No layer should arbitrarily resize itself.
- **Style**: Pixel-art cozy coder. Dark-purple compatible (fits the `Pomo Time` cozy dark theme).

## 📂 Folder Structure & Naming Convention
Assets are placed in `public/images/avatar/`. The file names must exactly match the internal `characterConfig` schema.

```text
public/images/avatar/
├── base/
├── hair/
├── glasses/
├── outfit/
├── accessory/
└── pets/
```

## 🚀 Minimum Viable Product (MVP) Assets
To verify the asset pipeline is working correctly, create this minimum set of assets first:
- `base/idle.png`
- `base/typing.png`
- `base/relax.png`
- `base/celebrate.png`
- `hair/messy-black.png`
- `glasses/round.png`
- `outfit/hoodie-black.png`
- `accessory/headphones.png`
- `pets/cat-sleep.png`

## 📦 Extended Asset List
For full coverage of the current configuration options, generate the following permutations:

### Base (Animation States)
- `idle.png`, `typing.png`, `relax.png`, `celebrate.png`

### Hair (`{style}-{color}.png`)
- Styles: `short`, `messy`, `side`
- Colors: `black`, `brown`, `blue`
- *Example: `hair/short-black.png`*

### Glasses (`{type}.png`)
- `round.png`, `square.png`

### Outfit (`{type}-{color}.png`)
- Styles: `hoodie`, `tshirt`, `sweater`
- Colors: `black`, `purple`, `blue`, `cream`
- *Example: `outfit/sweater-cream.png`*

### Accessory (`{type}.png`)
- `headphones.png`, `coffee.png`

### Pets (`{pet}-{state}.png`)
- `cat-idle.png`, `cat-sleep.png`

## 🧪 How to Test Assets
1. Copy your new PNG file(s) into the correct subfolder under `public/images/avatar/`.
2. Reload the Pomodoro app in the browser.
3. Open the **Character Setup Modal** (click the User icon in the header).
4. Select the specific configuration that matches your asset (e.g., Black Messy Hair).
5. **Success:** If the file name and path are correct, the CSS fallback will instantly disappear, replaced by your PNG asset.
6. **Failure:** If the PNG is missing or fails to load, the UI will silently fall back to the CSS version. Ensure the file name is exact and the format is PNG.
