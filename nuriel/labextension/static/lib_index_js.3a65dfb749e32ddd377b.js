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
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__);
// handler.ts

async function requestAPI(endpoint, options) {
    const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.makeSettings();
    const requestUrl = settings.baseUrl + endpoint; // Adjust if needed
    let response;
    try {
        response = await fetch(requestUrl, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        throw new Error(`Network error: ${error}`);
    }
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


 // Assuming you have a handler module for API requests
const extension = {
    id: 'code-summarization',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.INotebookTracker],
    activate
};
function activate(app, palette, notebookTracker) {
    console.log('JupyterLab extension code-summarization is activated!');
    const commandID = 'code:summarize';
    app.commands.addCommand(commandID, {
        label: 'Summarize Python Code',
        execute: async () => {
            const notebookPanel = notebookTracker.currentWidget;
            if (notebookPanel && notebookPanel.content.activeCell && notebookPanel.content.activeCell.model.type === 'code') {
                const cell = notebookPanel.content.activeCell;
                // Ensuring 'value' is safely accessed
                const code = cell.model.toJSON().source;
                try {
                    const data = await (0,_handler__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('summarize', {
                        method: 'POST',
                        body: JSON.stringify({ code }),
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
    palette.addItem({ command: commandID, category: 'Extensions' });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.3a65dfb749e32ddd377b.js.map