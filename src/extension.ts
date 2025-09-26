import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const commands = [
        { command: 'latexMatrixConverter.convertToBmatrix', matrixType: 'bmatrix' },
        { command: 'latexMatrixConverter.convertToPmatrix', matrixType: 'pmatrix' },
    ];

    commands.forEach(({ command, matrixType }) => {
        const disposable = vscode.commands.registerCommand(command, () => {
            convertSelectedTextToMatrix(matrixType);
        });
        context.subscriptions.push(disposable);
    });
}

function convertSelectedTextToMatrix(matrixType: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active text editor found');
        return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    if (!selectedText.trim()) {
        vscode.window.showErrorMessage('Please select text to convert to matrix');
        return;
    }

    try {
        const latexMatrix = convertToLatexMatrix(selectedText, matrixType);
        
        editor.edit(editBuilder => {
            editBuilder.replace(selection, latexMatrix);
        }).then(success => {
            // if (success) {
            //     vscode.window.showInformationMessage(`Converted to LaTeX ${matrixType}`);
            // } else {
            //     vscode.window.showErrorMessage('Failed to replace text');
            // }
        });

    } catch (error) {
        vscode.window.showErrorMessage(`Error converting matrix: ${error}`);
    }
}

function convertToLatexMatrix(text: string, matrixType: string): string {
    const lines = text.trim().split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    if (lines.length === 0) {
        throw new Error('No valid matrix data found');
    }

    // Validate matrix consistency
    const firstRowCols = lines[0].split(/\s+/).filter(el => el.length > 0).length;
    for (let i = 1; i < lines.length; i++) {
        const currentRowCols = lines[i].split(/\s+/).filter(el => el.length > 0).length;
        if (currentRowCols !== firstRowCols) {
            throw new Error(`Row ${i + 1} has ${currentRowCols} columns, but row 1 has ${firstRowCols} columns. All rows must have the same number of columns.`);
        }
    }

    // Convert each line to LaTeX format
    const latexRows = lines.map((line, index) => {
        // Split by any whitespace (spaces, tabs)
        const elements = line.split(/\s+/).filter(el => el.length > 0);
        
        if (elements.length === 0) {
            throw new Error(`Row ${index + 1} is empty`);
        }

        // Join elements with LaTeX column separator
        const row = elements.join(' & ');
        
        // Add row separator (except for last row)
        return index === lines.length - 1 ? row : row + ' \\\\';
    });

    // Construct the complete LaTeX matrix
    const matrixContent = latexRows.join('\n');
    return `\\begin{${matrixType}}\n${matrixContent}\n\\end{${matrixType}}`;
}

export function deactivate() {}