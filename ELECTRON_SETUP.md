# Offline AI Assistant - Electron Desktop Application

This document outlines the process of converting the local web-based AI application (Flask/Ollama) into a fully functional Electron desktop application.

## Project Structure

- `app.py`: Flask Backend (serves `index.html`).
- `electron-app/`: Electron wrapper for the desktop experience.
- `utils/`: Core AI handling and PDF processing logic.
- `uploads/`: Temporary storage for document processing.

## Transformation Steps

### 1. Initialization

The Electron project was initialized inside a sub-folder to keep the backend and frontend code decoupled.

- Created `electron-app/` directory.
- Initialized Node project and installed Electron as a dev dependency.

### 2. Main Entry Development (`main.js`)

Configured the Electron window with the following specifications:

- **Dimensions**: 1000x700
- **UI**: Native menu bar hidden for a cleaner "app" feel.
- **Source**: Set to load `http://localhost:5000` (Flask backend).

### 3. Build & Scripts Configuration

Updated `package.json` to handle development and distribution:

- `npm run dev`: Starts Electron with `NODE_ENV=development` to enable DevTools and auto-reload.
- `npm run build`: Uses `electron-builder` to package the app into a portable executable.

### 4. Developer Tools Integration

Enabled `electron-reload` to allow real-time UI updates during development without manually restarting Electron.

---

## How to Run the System

### Prerequisites

- Python 3.x
- Node.js & npm
- Ollama (running locally with `mistral` or `deepseek-coder` models)

### Execution

1. **Start Backend**:  
   Run this in the root `Offline-Ai-Assistant` folder.

   ```bash
   # Optional: Kill process on port 5000 if it's already in use
   fuser -k 5000/tcp

   export PYTHONPATH=$PYTHONPATH:.
   python app.py
   ```

2. **Launch App**:  
   **CRITICAL**: You must `cd electron-app` before running npm.
   ```bash
   cd electron-app
   npm run dev
   ```

### Packaging for Distribution

To generate a standalone installer (run inside `electron-app` folder):

```bash
cd electron-app
npm run build
```

The output will be located in the `electron-app/dist/` folder.
