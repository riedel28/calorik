"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/[lang]/page",{

/***/ "(app-pages-browser)/./src/components/Result/Result.jsx":
/*!******************************************!*\
  !*** ./src/components/Result/Result.jsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spring */ \"(app-pages-browser)/./node_modules/react-spring/dist/react-spring.modern.mjs\");\n/* harmony import */ var _barrel_optimize_names_Title_mantine_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Title!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/components/Title/Title.mjs\");\n/* harmony import */ var _context_UserDataContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/UserDataContext */ \"(app-pages-browser)/./src/context/UserDataContext.jsx\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers */ \"(app-pages-browser)/./src/helpers.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ var _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nvar Result = function(param) {\n    var dict = param.dict;\n    _s();\n    var userData = (0,_context_UserDataContext__WEBPACK_IMPORTED_MODULE_3__.useUserData)().userData;\n    var resultCalories = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.calculateCalories)(userData);\n    var animation = (0,react_spring__WEBPACK_IMPORTED_MODULE_2__.useSpring)({\n        from: {\n            value: 0\n        },\n        to: {\n            value: isNaN(resultCalories) ? 0 : resultCalories\n        }\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        var title = \"Calorik\";\n        if (!resultCalories) {\n            document.title = title;\n        } else {\n            document.title = \"\".concat(title, \" | \").concat(resultCalories);\n        }\n    }, [\n        resultCalories\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        window.scroll({\n            top: document.body.scrollHeight,\n            behavior: \"smooth\"\n        });\n    }, [\n        userData\n    ]);\n    return resultCalories > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Title_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Title, {\n        order: 1,\n        align: \"center\",\n        pt: \"lg\",\n        m: 0,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_spring__WEBPACK_IMPORTED_MODULE_2__.animated.span, {\n                children: animation.value.to(function(val) {\n                    return Math.floor(resultCalories);\n                })\n            }, void 0, false, {\n                fileName: \"/Users/sergio/projects/calorik/src/components/Result/Result.jsx\",\n                lineNumber: 39,\n                columnNumber: 9\n            }, _this),\n            \" \",\n            dict.result\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/sergio/projects/calorik/src/components/Result/Result.jsx\",\n        lineNumber: 38,\n        columnNumber: 7\n    }, _this);\n};\n_s(Result, \"W/GUv2B+5VaEyAMDqC2Iq8T2k8I=\", false, function() {\n    return [\n        _context_UserDataContext__WEBPACK_IMPORTED_MODULE_3__.useUserData,\n        react_spring__WEBPACK_IMPORTED_MODULE_2__.useSpring\n    ];\n});\n_c = Result;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Result);\nvar _c;\n$RefreshReg$(_c, \"Result\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1Jlc3VsdC9SZXN1bHQuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRXlDO0FBQ1U7QUFDYjtBQUVzQjtBQUNWO0FBRWxELElBQU1PLFNBQVM7UUFBR0MsYUFBQUE7O0lBQ2hCLElBQU0sV0FBZUgscUVBQVdBLEdBQXhCSTtJQUNSLElBQU1DLGlCQUFpQkosMkRBQWlCQSxDQUFDRztJQUV6QyxJQUFNRSxZQUFZVCx1REFBU0EsQ0FBQztRQUMxQlUsTUFBTTtZQUFFQyxPQUFPO1FBQUU7UUFDakJDLElBQUk7WUFBRUQsT0FBT0UsTUFBTUwsa0JBQWtCLElBQUlBO1FBQWU7SUFDMUQ7SUFFQVQsZ0RBQVNBLENBQUM7UUFDUixJQUFNZSxRQUFRO1FBRWQsSUFBSSxDQUFDTixnQkFBZ0I7WUFDbkJPLFNBQVNELEtBQUssR0FBR0E7UUFDbkIsT0FBTztZQUNMQyxTQUFTRCxLQUFLLEdBQUcsR0FBY04sT0FBWE0sT0FBTSxPQUFvQixPQUFmTjtRQUNqQztJQUNGLEdBQUc7UUFBQ0E7S0FBZTtJQUVuQlQsZ0RBQVNBLENBQUM7UUFDUmlCLE9BQU9DLE1BQU0sQ0FBQztZQUNaQyxLQUFLSCxTQUFTSSxJQUFJLENBQUNDLFlBQVk7WUFDL0JDLFVBQVU7UUFDWjtJQUNGLEdBQUc7UUFBQ2Q7S0FBUztJQUViLE9BQ0VDLGlCQUFpQixtQkFDZiw4REFBQ04sNEVBQUtBO1FBQUNvQixPQUFPO1FBQUdDLE9BQU07UUFBU0MsSUFBRztRQUFLQyxHQUFHOzswQkFDekMsOERBQUN4QixrREFBUUEsQ0FBQ3lCLElBQUk7MEJBQ1hqQixVQUFVRSxLQUFLLENBQUNDLEVBQUUsQ0FBQyxTQUFDZTsyQkFBUUMsS0FBS0MsS0FBSyxDQUFDckI7Ozs7Ozs7WUFDekI7WUFDaEJGLEtBQUt3QixNQUFNOzs7Ozs7O0FBSXBCO0dBcENNekI7O1FBQ2lCRixpRUFBV0E7UUFHZEgsbURBQVNBOzs7S0FKdkJLO0FBc0NOLCtEQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1Jlc3VsdC9SZXN1bHQuanN4PzE2MGYiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU3ByaW5nLCBhbmltYXRlZCB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XG5pbXBvcnQgeyBUaXRsZSB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyB1c2VVc2VyRGF0YSB9IGZyb20gJy4uLy4uL2NvbnRleHQvVXNlckRhdGFDb250ZXh0JztcbmltcG9ydCB7IGNhbGN1bGF0ZUNhbG9yaWVzIH0gZnJvbSAnLi4vLi4vaGVscGVycyc7XG5cbmNvbnN0IFJlc3VsdCA9ICh7IGRpY3QgfSkgPT4ge1xuICBjb25zdCB7IHVzZXJEYXRhIH0gPSB1c2VVc2VyRGF0YSgpO1xuICBjb25zdCByZXN1bHRDYWxvcmllcyA9IGNhbGN1bGF0ZUNhbG9yaWVzKHVzZXJEYXRhKTtcblxuICBjb25zdCBhbmltYXRpb24gPSB1c2VTcHJpbmcoe1xuICAgIGZyb206IHsgdmFsdWU6IDAgfSxcbiAgICB0bzogeyB2YWx1ZTogaXNOYU4ocmVzdWx0Q2Fsb3JpZXMpID8gMCA6IHJlc3VsdENhbG9yaWVzIH0sXG4gIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSAnQ2Fsb3Jpayc7XG5cbiAgICBpZiAoIXJlc3VsdENhbG9yaWVzKSB7XG4gICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC50aXRsZSA9IGAke3RpdGxlfSB8ICR7cmVzdWx0Q2Fsb3JpZXN9YDtcbiAgICB9XG4gIH0sIFtyZXN1bHRDYWxvcmllc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgd2luZG93LnNjcm9sbCh7XG4gICAgICB0b3A6IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LFxuICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgIH0pO1xuICB9LCBbdXNlckRhdGFdKTtcblxuICByZXR1cm4gKFxuICAgIHJlc3VsdENhbG9yaWVzID4gMCAmJiAoXG4gICAgICA8VGl0bGUgb3JkZXI9ezF9IGFsaWduPVwiY2VudGVyXCIgcHQ9XCJsZ1wiIG09ezB9PlxuICAgICAgICA8YW5pbWF0ZWQuc3Bhbj5cbiAgICAgICAgICB7YW5pbWF0aW9uLnZhbHVlLnRvKCh2YWwpID0+IE1hdGguZmxvb3IocmVzdWx0Q2Fsb3JpZXMpKX1cbiAgICAgICAgPC9hbmltYXRlZC5zcGFuPnsnICd9XG4gICAgICAgIHtkaWN0LnJlc3VsdH1cbiAgICAgIDwvVGl0bGU+XG4gICAgKVxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3ByaW5nIiwiYW5pbWF0ZWQiLCJUaXRsZSIsInVzZVVzZXJEYXRhIiwiY2FsY3VsYXRlQ2Fsb3JpZXMiLCJSZXN1bHQiLCJkaWN0IiwidXNlckRhdGEiLCJyZXN1bHRDYWxvcmllcyIsImFuaW1hdGlvbiIsImZyb20iLCJ2YWx1ZSIsInRvIiwiaXNOYU4iLCJ0aXRsZSIsImRvY3VtZW50Iiwid2luZG93Iiwic2Nyb2xsIiwidG9wIiwiYm9keSIsInNjcm9sbEhlaWdodCIsImJlaGF2aW9yIiwib3JkZXIiLCJhbGlnbiIsInB0IiwibSIsInNwYW4iLCJ2YWwiLCJNYXRoIiwiZmxvb3IiLCJyZXN1bHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Result/Result.jsx\n"));

/***/ })

});