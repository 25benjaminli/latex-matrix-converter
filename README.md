# LaTeX Matrix Converter

A VSCode extension that converts plain text matrices to matrix format. It's really annoying to typeset otherwise, and I'm not aware of any other extension that offers support for this. Automatically detects newlines/spaces and adds corresponding ampersands and slashes. It also supports automatic fraction formatting - just type the matrix out in plain text and use the command to format everything!

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

- Separate elements with spaces or tabs
- Separate rows with new lines
- Mixed spacing is automatically handled
- Empty lines are ignored

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "LaTeX Matrix Converter"
4. Click Install

### From this repository
1. Clone this repository
2. Run `npm install` to install dependencies
3. Package the extension using `vsce package` and install the generated `.vsix` file via `code --install-extension latex-matrix-converter-1.0.0.vsix`

## Contributing

Please create pull requests/issues on the [github repository](https://github.com/25benjaminli/latex-matrix-converter). 

## License

MIT License - see LICENSE file for details.