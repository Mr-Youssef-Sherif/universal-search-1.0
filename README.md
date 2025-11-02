# QuickSearch

**QuickSearch** is a lightweight, universal search launcher that lets you instantly search multiple platforms right from anywhere on your computer. Press **Ctrl+Q**, type your query, choose a platform, and go—Google, YouTube, ChatGPT, Reddit, GitHub, and more.

It’s designed for **fast workflow, minimal disruption, and maximum productivity**.

---

## **Features**

* 🔹 **Global Hotkey:** Press **Ctrl+Q** from anywhere to open the search bar.
* 🔹 **Multi-Platform Search:** Quickly choose where to search: Google, YouTube, ChatGPT, Reddit, GitHub.
* 🔹 **Lightweight & Minimal:** No heavy browser windows or clutter.
* 🔹 **Configurable:** Supports a JSON config file to store preferences like hotkey, default search platform, and startup behavior.
* 🔹 **Future Expansion Ready:** Supports ideas for custom commands, workflow presets, and saved queries.

---

## **Getting Started**

### **Prerequisites**

* [Node.js](https://nodejs.org/) (v18+ recommended)
* npm (comes with Node.js)

### **Installation**

1. Clone the repository:

```bash
git clone https://github.com/yourusername/quicksearch.git
cd quicksearch
```

2. Install dependencies:

```bash
npm install
```

### **Running the App**

```bash
npm start
```

* Press **Ctrl+Q** to open the search bar.
* Type your query, pick a platform, and press Enter.

---

### **Building the App (Optional)**

To compile QuickSearch into a standalone executable:

1. Install Electron Builder:

```bash
npm install --save-dev electron-builder
```

2. Build for Windows:

```bash
npx electron-builder --win
```

* Output: `.exe` installer ready for distribution.
* Configurable options (like startup behavior) are stored in `config.json`.

---

## **Configuration** (coming soon!)

QuickSearch uses a JSON config file stored in your home directory:

**Example `~/.mysearchapp_config.json`:**

```json
{
  "hotkey": "Ctrl+Q",
  "defaultPlatform": "Google",
  "startMinimized": true
}
```

* You can edit this file to customize your workflow.
* Future updates will allow setting **custom commands and presets**.

---

## **Future Plans**

* Configurable settings
* Customizable workflow commands (open apps, presets, modes)
* Auto-suggestions and saved queries
* User-defined hotkeys and plugin system
* Integration with AI for smarter search suggestions

---

## **License**

MIT License © Youssef Sherif
