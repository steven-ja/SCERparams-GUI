# SCERparams-GUI

This repository contains the source code for a GUI that allows to set parameters of SCERPA simulations.

## Project Setup 

### Prerequisites
- Rust (https://rustup.rs/)
- Node.js and pnpm
- Tauri CLI: `pnpm install -g @tauri-apps/cli`

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/scerpa-config-generator.git
cd scerpa-config-generator

# Install dependencies
pnpm install
```

### Running the Application
```bash
# Development mode
pnpm run tauri dev

# Build for production
pnpm run tauri build
```

## Features
- Modern GUI for SCERPA simulation configuration
- Cross-platform support (Windows and Linux)
- Easy-to-use configuration management

## Configuration Options
- Solver selection
- Molecule configuration
- Intermolecular distance
- Circuit structure
- Driver values
- Clock and runtime settings
- Plotting options

## Build Requirements
- Rust 1.70.0 or later
- Node.js 16.14 or later
- Tauri dependencies for your target platform.


## Roadmap
- [ ] all configurations in one tab
- [ ] canvas/ grid-array -> add button to add rows/ columns -> move bettwen them with arrows
- [ ] write in rust a function to generate the config/ matlab file
- [ ] add all plot options (in config tab)
