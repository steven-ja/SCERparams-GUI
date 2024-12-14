# SCERparams-GUI

[![GitHub version](https://badge.fury.io/gh/Naereen%2FStrapDown.js.svg)](https://github.com/rageSpin/)

This repository contains the source code for a GUI that allows to set parameters of SCERPA simulations.

## Project Setup 

### Prerequisites
- Rust (https://rustup.rs/)
- Node.js and pnpm
- Tauri CLI: `pnpm install -g @tauri-apps/cli`

### Installation
```bash
# Clone the repository
git clone https://github.com/rageSpin/SCERparams-GUI.git
cd SCERparams

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
- Cross-platform support (Windows, Linux and Mac)
- Easy-to-use configuration management

## Configuration Options
- Circuit import type selection
- Molecule configuration (BisFe ...)
- Intermolecular distance ()
- Circuit structure 
- Driver values 
- Clock and waveforms settings
- Plotting options (1D, 2D, 3D plots)

## Build Requirements
- Rust 1.70.0 or later
- Node.js 16.14 or later
- Tauri dependencies for your target platform.


## Roadmap
- [x] all configurations in one tab
- [x] canvas/ grid-array -> add button to add rows/ columns -> move bettwen them with arrows
- [ ] write in rust a function to generate the config/ matlab file
- [x] add all plot options (in config tab)

## References
* [![DOI](https://zenodo.org/badge/577664003.svg)](https://zenodo.org/badge/latestdoi/577664003)
* [![References](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vlsi-nanocomputing/SCERPA) [SCERPA](https://github.com/vlsi-nanocomputing/SCERPA) 

