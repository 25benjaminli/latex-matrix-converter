# LaTeX Matrix Converter

A VSCode extension that converts plain text matrices to matrix format (because it's really annoying otherwise!). Automatically detects newlines/spaces and adds corresponding ampersands and slashes. Just type the matrix out in plain text and use the command to format everything!

## Usage

### Basic Usage

1. **Select your plain text matrix** in the editor:
   ```
   1 0 0
   -3 1 0
   0 0 1
   ```

2. **Convert using one of these methods**:
   - Press `Ctrl+Shift+M` (or `Cmd+Shift+M` on Mac) for bmatrix
   - Right-click and choose a matrix type from the context menu
   - Use Command Palette (`Ctrl+Shift+P`) and search for "Convert to LaTeX"

3. **Result**:
   ```latex
   \begin{bmatrix}
   1 & 0 & 0 \\
   -3 & 1 & 0 \\
   0 & 0 & 1
   \end{bmatrix}
   ```

### Input Format

- **Separate elements** with spaces or tabs
- **Separate rows** with new lines
- **Mixed spacing** is automatically handled
- **Empty lines** are ignored

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "LaTeX Matrix Converter"
4. Click Install

### From repository
1. Clone the repository
2. Run `npm install` to install dependencies
3. Press `F5` to launch the extension in a new VS Code window
4. Package the extension using `vsce package` and install the generated `.vsix` file via `code --install-extension latex-matrix-converter-1.0.0.vsix`

## Future support

- Currently doesn't support fraction formatting (planned for future release)
- Large matrices may require manual formatting adjustment

## Contributing

Please create pull requests/issues on the github repository. 

## License

MIT License - see LICENSE file for details.