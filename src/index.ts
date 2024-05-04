import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette, showDialog, Dialog } from '@jupyterlab/apputils';
import {
  INotebookTracker,
  Notebook,
  NotebookPanel
} from '@jupyterlab/notebook';
import { ToolbarButton } from '@jupyterlab/apputils';
import { requestAPI } from './handler';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'code-enhancements',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate
};

function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  notebookTracker: INotebookTracker
): void {
  console.log('JupyterLab extension code-summarization is activated!');

  const commandID1 = 'code:summarize';
  const commandID2 = 'code:optimize';
  const commandID3 = 'code:notebooksummarize';
  const commandID4 = 'code:dependency';
  const commandID5 = 'code:explain';

  app.commands.addCommand(commandID1, {
    label: 'Summarize Python Code',
    execute: async () => {
      const notebookPanel = notebookTracker.currentWidget;
      if (
        notebookPanel &&
        notebookPanel.content.activeCell &&
        notebookPanel.content.activeCell.model.type === 'code'
      ) {
        const cell = notebookPanel.content.activeCell;
        // Ensuring 'value' is safely accessed
        const code = cell.model.toJSON().source as string;

        try {
          const data = await requestAPI<any>(
            'http://localhost:5000/summarize', // Full URL to your Flask API endpoint
            {
              method: 'POST',
              body: JSON.stringify({ code: code }), // Your payload
              headers: {
                'Content-Type': 'application/json' // Set Content-tent-Type header
              }
            }
          );

          showDialog({
            title: 'Code Summary',
            body: data.summary || 'No summary available.',
            buttons: [Dialog.okButton({ label: 'OK' })]
          });
        } catch (error: unknown) {
          let message = 'Unknown error occurred.';
          if (error instanceof Error) {
            message = error.message;
          }
          console.error(`Error on summarizing code: ${message}`);
          showDialog({
            title: 'Error',
            body: `Failed to summarize the code. Error: ${message}`,
            buttons: [Dialog.okButton()]
          });
        }
      }
    }
  });

  app.commands.addCommand(commandID2, {
    label: 'Optimize Python Code',
    execute: async () => {
      const notebookPanel = notebookTracker.currentWidget;
      if (
        notebookPanel &&
        notebookPanel.content.activeCell &&
        notebookPanel.content.activeCell.model.type === 'code'
      ) {
        const cell = notebookPanel.content.activeCell;
        // Ensuring 'value' is safely accessed
        const code = cell.model.toJSON().source as string;

        try {
          const data = await requestAPI<any>(
            'http://localhost:5000/optimize', // Full URL to your Flask API endpoint
            {
              method: 'POST',
              body: JSON.stringify({ code: code }), // Your payload
              headers: {
                'Content-Type': 'application/json' // Set Content-tent-Type header
              }
            }
          );

          showDialog({
            title: 'Code Optimization',
            body: data.Optimization || 'No Optimizations suggested.',
            buttons: [Dialog.okButton({ label: 'OK' })]
          });
        } catch (error: unknown) {
          let message = 'Unknown error occurred.';
          if (error instanceof Error) {
            message = error.message;
          }
          console.error(`Error on optimzing code: ${message}`);
          showDialog({
            title: 'Error',
            body: `Failed to optimize the code. Error: ${message}`,
            buttons: [Dialog.okButton()]
          });
        }
      }
    }
  });

  app.commands.addCommand(commandID3, {
    label: 'Summarize Notebook Code',
    execute: async () => {
      const notebookPanel = notebookTracker.currentWidget;
      if (notebookPanel && notebookPanel.content instanceof Notebook) {
        let code = '';
        notebookPanel.content.widgets.forEach(widget => {
          if (widget.model.type === 'code') {
            // Directly access the 'source' property of the model
            const cellText = widget.model.toJSON().source;
            code += Array.isArray(cellText) ? cellText.join('') : cellText;
            code += '\n\n';
          }
        });

        if (code) {
          try {
            const data = await requestAPI<any>(
              'http://localhost:5000/summarize', // Full URL to your Flask API endpoint
              {
                method: 'POST',
                body: JSON.stringify({ code: code }), // Your payload
                headers: {
                  'Content-Type': 'application/json' // Set Content-Type header
                }
              }
            );

            showDialog({
              title: 'Code Summary',
              body: data.summary || 'No summary available.',
              buttons: [Dialog.okButton({ label: 'OK' })]
            });
          } catch (error: unknown) {
            let message = 'Unknown error occurred.';
            if (error instanceof Error) {
              message = error.message;
            }
            console.error(`Error on summarizing code: ${message}`);
            showDialog({
              title: 'Error',
              body: `Failed to summarize the code. Error: ${message}`,
              buttons: [Dialog.okButton()]
            });
          }
        } else {
          showDialog({
            title: 'No Code Cells',
            body: 'There are no code cells to summarize.',
            buttons: [Dialog.okButton()]
          });
        }
      }
    }
  });

  app.commands.addCommand(commandID4, {
    label: 'Generate Dependency Graph',
    execute: async () => {
      const notebookPanel = notebookTracker.currentWidget;
      if (
        notebookPanel &&
        notebookPanel.content.activeCell &&
        notebookPanel.content.activeCell.model.type === 'code'
      ) {
        const cell = notebookPanel.content.activeCell;
        // Ensuring 'value' is safely accessed
        const code = cell.model.toJSON().source as string;

        try {
          const data = await requestAPI<any>(
            'http://localhost:5000/dependency', // Full URL to your Flask API endpoint
            {
              method: 'POST',
              body: JSON.stringify({ code: code }), // Your payload
              headers: {
                'Content-Type': 'application/json' // Set Content-tent-Type header
              }
            }
          );

          showDialog({
            title: 'Dependency Graph',
            body: data.dependencygraph || 'No Dependency Graph available.',
            buttons: [Dialog.okButton({ label: 'OK' })]
          });
        } catch (error: unknown) {
          let message = 'Unknown error occurred.';
          if (error instanceof Error) {
            message = error.message;
          }
          console.error(`Error on generating dependency graph: ${message}`);
          showDialog({
            title: 'Error',
            body: `Failed to generate the dependency graph. Error: ${message}`,
            buttons: [Dialog.okButton()]
          });
        }
      }
    }
  });

  app.commands.addCommand(commandID5, {
    label: 'Explain Code',
    execute: async () => {
      const notebookPanel = notebookTracker.currentWidget;
      if (
        notebookPanel &&
        notebookPanel.content.activeCell &&
        notebookPanel.content.activeCell.model.type === 'code'
      ) {
        const cell = notebookPanel.content.activeCell;
        // Ensuring 'value' is safely accessed
        const code = cell.model.toJSON().source as string;

        try {
          const mediumData = await requestAPI<any>(
            'http://localhost:5000/explainMedium', // Full URL to your Flask API endpoint for medium explanation
            {
              method: 'POST',
              body: JSON.stringify({ code: code }), // Your payload
              headers: {
                'Content-Type': 'application/json' // Set Content-Type header
              }
            }
          );

          const dialogResult = await showDialog({
            title: 'Code Explanation (Medium)',
            body: mediumData.explanation || 'No explanation available.',
            buttons: [
              Dialog.okButton({ label: 'Easy Explanation' }),
              Dialog.okButton({ label: 'Hard Explanation' }),
              Dialog.cancelButton({ label: 'Close' })
            ]
          });

          if (dialogResult.button.label === 'Easy Explanation') {
            const easyData = await requestAPI<any>(
              'http://localhost:5000/explainEasy', // Full URL to your Flask API endpoint for easy explanation
              {
                method: 'POST',
                body: JSON.stringify({ code: code }), // Your payload
                headers: {
                  'Content-Type': 'application/json' // Set Content-Type header
                }
              }
            );

            showDialog({
              title: 'Easy Code Explanation',
              body: easyData.explanation || 'No easy explanation available.',
              buttons: [Dialog.okButton({ label: 'OK' })]
            });
          } else if (dialogResult.button.label === 'Hard Explanation') {
            const hardData = await requestAPI<any>(
              'http://localhost:5000/explainHard', // Full URL to your Flask API endpoint for hard explanation
              {
                method: 'POST',
                body: JSON.stringify({ code: code }), // Your payload
                headers: {
                  'Content-Type': 'application/json' // Set Content-Type header
                }
              }
            );

            showDialog({
              title: 'Hard Code Explanation',
              body: hardData.explanation || 'No hard explanation available.',
              buttons: [Dialog.okButton({ label: 'OK' })]
            });
          }
        } catch (error: unknown) {
          let message = 'Unknown error occurred.';
          if (error instanceof Error) {
            message = error.message;
          }
          console.error(`Error on explaining code: ${message}`);
          showDialog({
            title: 'Error',
            body: `Failed to explain the code. Error: ${message}`,
            buttons: [Dialog.okButton()]
          });
        }
      }
    }
  });

  const addToolbarButton = (
    buttonLabel: string,
    commandId: string,
    iconClassName: string
  ) => {
    notebookTracker.widgetAdded.connect(
      (sender, notebookPanel: NotebookPanel) => {
        const button = new ToolbarButton({
          label: buttonLabel,
          onClick: () => {
            app.commands.execute(commandId);
          },
          className: iconClassName
        });
        notebookPanel.toolbar.insertItem(10, commandId, button);
      }
    );
  };

  // Add a toolbar button for each command
  addToolbarButton('Summarize Code', commandID1, 'summarize-icon');
  addToolbarButton('Optimize Code', commandID2, 'optimize-icon');
  addToolbarButton('Summarize Notebook', commandID3, 'notebook-summarize-icon');
  addToolbarButton('Dependency Graph', commandID4, 'dependency-graph-icon');
  addToolbarButton('Explain Code', commandID5, 'explain-code-icon');

  palette.addItem({ command: commandID1, category: 'Extensions' });
  palette.addItem({ command: commandID2, category: 'Extensions' });
  palette.addItem({ command: commandID3, category: 'Extensions' });
  palette.addItem({ command: commandID4, category: 'Extensions' });
  palette.addItem({ command: commandID5, category: 'Extensions' });
}

export default extension;
