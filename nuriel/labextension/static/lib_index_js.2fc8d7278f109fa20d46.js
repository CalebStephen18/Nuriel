"use strict";
(self["webpackChunknuriel"] = self["webpackChunknuriel"] || []).push([["lib_index_js"],{

/***/ "./lib/handler.js":
/*!************************!*\
  !*** ./lib/handler.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   requestAPI: () => (/* binding */ requestAPI)
/* harmony export */ });
// handler.ts
async function requestAPI(endPoint, // Use the full endpoint URL here
init) {
    // Using Fetch API directly to make an external request
    const response = await fetch(endPoint, init);
    if (!response.ok) {
        // If the response is not OK, throw an error
        const errorBody = await response.text();
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText} - ${errorBody}`);
    }
    // Assuming the response is JSON
    const data = await response.json();
    return data;
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handler */ "./lib/handler.js");



const extension = {
    id: 'code-enhancements',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.INotebookTracker],
    activate
};
function activate(app, palette, notebookTracker) {
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
            if (notebookPanel &&
                notebookPanel.content.activeCell &&
                notebookPanel.content.activeCell.model.type === 'code') {
                const cell = notebookPanel.content.activeCell;
                // Ensuring 'value' is safely accessed
                const code = cell.model.toJSON().source;
                try {
                    const data = await (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('http://localhost:5000/summarize', // Full URL to your Flask API endpoint
                    {
                        method: 'POST',
                        body: JSON.stringify({ code: code }),
                        headers: {
                            'Content-Type': 'application/json' // Set Content-tent-Type header
                        }
                    });
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Code Summary',
                        body: data.summary || 'No summary available.',
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'OK' })]
                    });
                }
                catch (error) {
                    let message = 'Unknown error occurred.';
                    if (error instanceof Error) {
                        message = error.message;
                    }
                    console.error(`Error on summarizing code: ${message}`);
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Error',
                        body: `Failed to summarize the code. Error: ${message}`,
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton()]
                    });
                }
            }
        }
    });
    app.commands.addCommand(commandID2, {
        label: 'Optimize Python Code',
        execute: async () => {
            const notebookPanel = notebookTracker.currentWidget;
            if (notebookPanel &&
                notebookPanel.content.activeCell &&
                notebookPanel.content.activeCell.model.type === 'code') {
                const cell = notebookPanel.content.activeCell;
                // Ensuring 'value' is safely accessed
                const code = cell.model.toJSON().source;
                try {
                    const data = await (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('http://localhost:5000/optimize', // Full URL to your Flask API endpoint
                    {
                        method: 'POST',
                        body: JSON.stringify({ code: code }),
                        headers: {
                            'Content-Type': 'application/json' // Set Content-tent-Type header
                        }
                    });
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Code Optimization',
                        body: data.Optimization || 'No Optimizations suggested.',
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'OK' })]
                    });
                }
                catch (error) {
                    let message = 'Unknown error occurred.';
                    if (error instanceof Error) {
                        message = error.message;
                    }
                    console.error(`Error on optimzing code: ${message}`);
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Error',
                        body: `Failed to optimize the code. Error: ${message}`,
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton()]
                    });
                }
            }
        }
    });
    app.commands.addCommand(commandID3, {
        label: 'Summarize Notebook Code',
        execute: async () => {
            const notebookPanel = notebookTracker.currentWidget;
            if (notebookPanel && notebookPanel.content instanceof _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.Notebook) {
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
                        const data = await (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('http://localhost:5000/summarize', // Full URL to your Flask API endpoint
                        {
                            method: 'POST',
                            body: JSON.stringify({ code: code }),
                            headers: {
                                'Content-Type': 'application/json' // Set Content-Type header
                            }
                        });
                        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                            title: 'Code Summary',
                            body: data.summary || 'No summary available.',
                            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'OK' })]
                        });
                    }
                    catch (error) {
                        let message = 'Unknown error occurred.';
                        if (error instanceof Error) {
                            message = error.message;
                        }
                        console.error(`Error on summarizing code: ${message}`);
                        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                            title: 'Error',
                            body: `Failed to summarize the code. Error: ${message}`,
                            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton()]
                        });
                    }
                }
                else {
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'No Code Cells',
                        body: 'There are no code cells to summarize.',
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton()]
                    });
                }
            }
        }
    });
    app.commands.addCommand(commandID4, {
        label: 'Generate Dependency Graph',
        execute: async () => {
            const notebookPanel = notebookTracker.currentWidget;
            if (notebookPanel &&
                notebookPanel.content.activeCell &&
                notebookPanel.content.activeCell.model.type === 'code') {
                const cell = notebookPanel.content.activeCell;
                // Ensuring 'value' is safely accessed
                const code = cell.model.toJSON().source;
                try {
                    const data = await (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('http://localhost:5000/dependency', // Full URL to your Flask API endpoint
                    {
                        method: 'POST',
                        body: JSON.stringify({ code: code }),
                        headers: {
                            'Content-Type': 'application/json' // Set Content-tent-Type header
                        }
                    });
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Dependency Graph',
                        body: data.summary || 'No Dependency Graph available.',
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'OK' })]
                    });
                }
                catch (error) {
                    let message = 'Unknown error occurred.';
                    if (error instanceof Error) {
                        message = error.message;
                    }
                    console.error(`Error on generating dependency graph: ${message}`);
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Error',
                        body: `Failed to generate the dependency graph. Error: ${message}`,
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton()]
                    });
                }
            }
        }
    });
    app.commands.addCommand(commandID5, {
        label: 'Explain Code',
        execute: async () => {
            const notebookPanel = notebookTracker.currentWidget;
            if (notebookPanel &&
                notebookPanel.content.activeCell &&
                notebookPanel.content.activeCell.model.type === 'code') {
                const cell = notebookPanel.content.activeCell;
                // Ensuring 'value' is safely accessed
                const code = cell.model.toJSON().source;
                try {
                    const mediumData = await (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('http://localhost:5000/explainMedium', // Full URL to your Flask API endpoint for medium explanation
                    {
                        method: 'POST',
                        body: JSON.stringify({ code: code }),
                        headers: {
                            'Content-Type': 'application/json' // Set Content-Type header
                        }
                    });
                    const dialogResult = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Code Explanation (Medium)',
                        body: mediumData.explanation || 'No explanation available.',
                        buttons: [
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Easy Explanation' }),
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Hard Explanation' }),
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: 'Close' })
                        ]
                    });
                    if (dialogResult.button.label === 'Easy Explanation') {
                        const easyData = await (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('http://localhost:5000/explainEasy', // Full URL to your Flask API endpoint for easy explanation
                        {
                            method: 'POST',
                            body: JSON.stringify({ code: code }),
                            headers: {
                                'Content-Type': 'application/json' // Set Content-Type header
                            }
                        });
                        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                            title: 'Easy Code Explanation',
                            body: easyData.explanation || 'No easy explanation available.',
                            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'OK' })]
                        });
                    }
                    else if (dialogResult.button.label === 'Hard Explanation') {
                        const hardData = await (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('http://localhost:5000/explainHard', // Full URL to your Flask API endpoint for hard explanation
                        {
                            method: 'POST',
                            body: JSON.stringify({ code: code }),
                            headers: {
                                'Content-Type': 'application/json' // Set Content-Type header
                            }
                        });
                        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                            title: 'Hard Code Explanation',
                            body: hardData.explanation || 'No hard explanation available.',
                            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'OK' })]
                        });
                    }
                }
                catch (error) {
                    let message = 'Unknown error occurred.';
                    if (error instanceof Error) {
                        message = error.message;
                    }
                    console.error(`Error on explaining code: ${message}`);
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Error',
                        body: `Failed to explain the code. Error: ${message}`,
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton()]
                    });
                }
            }
        }
    });
    palette.addItem({ command: commandID1, category: 'Extensions' });
    palette.addItem({ command: commandID2, category: 'Extensions' });
    palette.addItem({ command: commandID3, category: 'Extensions' });
    palette.addItem({ command: commandID4, category: 'Extensions' });
    palette.addItem({ command: commandID5, category: 'Extensions' });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.2fc8d7278f109fa20d46.js.map