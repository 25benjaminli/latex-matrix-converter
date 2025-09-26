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
            // uncomment for debugging purposes
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
        const elements = line.split(/\s+/).filter(el => el.length > 0);
        
        if (elements.length === 0) {
            throw new Error(`Row ${index + 1} is empty`);
        }

        const formattedElements = elements.map(formatMatrixElement);

        const row = formattedElements.join(' & ');
        
        return index === lines.length - 1 ? row : row + ' \\\\';
    });

    const matrixContent = latexRows.join('\n');
    return `\\begin{${matrixType}}\n${matrixContent}\n\\end{${matrixType}}`;
}

function formatMatrixElement(element: string): string {
    // Check if element is already a fraction or if we should convert it
    const fractionResult = convertToFraction(element);
    return fractionResult || element;
}

function convertToFraction(input: string): string | null {
    const trimmed = input.trim();
    
    // Handle negative numbers
    const isNegative = trimmed.startsWith('-');
    const positiveInput = isNegative ? trimmed.slice(1) : trimmed;
    
    if (positiveInput.includes('/')) {
        const parts = positiveInput.split('/');
        if (parts.length === 2) {
            const numerator = parseInt(parts[0].trim());
            const denominator = parseInt(parts[1].trim());
            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                const result = `\\frac{${numerator}}{${denominator}}`;
                return isNegative ? '-' + result : result;
            }
        }
    }
    
    return null;
}



export function deactivate() {}