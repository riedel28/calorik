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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spring */ \"(app-pages-browser)/./node_modules/react-spring/dist/react-spring.modern.mjs\");\n/* harmony import */ var _barrel_optimize_names_Title_mantine_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Title!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/components/Title/Title.mjs\");\n/* harmony import */ var _context_UserDataContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/UserDataContext */ \"(app-pages-browser)/./src/context/UserDataContext.jsx\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers */ \"(app-pages-browser)/./src/helpers.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ var _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nvar Result = function(param) {\n    var dict = param.dict;\n    _s();\n    // const { t } = useTranslation();\n    var t = function(key) {\n        return key;\n    };\n    var userData = (0,_context_UserDataContext__WEBPACK_IMPORTED_MODULE_3__.useUserData)().userData;\n    var resultCalories = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.calculateCalories)(userData);\n    var animation = (0,react_spring__WEBPACK_IMPORTED_MODULE_2__.useSpring)({\n        from: {\n            value: 0\n        },\n        to: {\n            value: isNaN(resultCalories) ? 0 : resultCalories\n        }\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        var title = \"Calorik\";\n        if (!resultCalories) {\n            document.title = title;\n        } else {\n            document.title = \"\".concat(title, \" | \").concat(resultCalories);\n        }\n    }, [\n        resultCalories\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        window.scroll({\n            top: document.body.scrollHeight,\n            behavior: \"smooth\"\n        });\n    }, [\n        userData\n    ]);\n    return resultCalories > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"footer\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Title_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Title, {\n            order: 1,\n            align: \"center\",\n            p: 0,\n            m: 0,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_spring__WEBPACK_IMPORTED_MODULE_2__.animated.span, {\n                children: [\n                    Math.floor(resultCalories),\n                    dict\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/sergio/projects/calorik/src/components/Result/Result.jsx\",\n                lineNumber: 44,\n                columnNumber: 11\n            }, _this)\n        }, void 0, false, {\n            fileName: \"/Users/sergio/projects/calorik/src/components/Result/Result.jsx\",\n            lineNumber: 43,\n            columnNumber: 9\n        }, _this)\n    }, void 0, false, {\n        fileName: \"/Users/sergio/projects/calorik/src/components/Result/Result.jsx\",\n        lineNumber: 42,\n        columnNumber: 7\n    }, _this);\n};\n_s(Result, \"W/GUv2B+5VaEyAMDqC2Iq8T2k8I=\", false, function() {\n    return [\n        _context_UserDataContext__WEBPACK_IMPORTED_MODULE_3__.useUserData,\n        react_spring__WEBPACK_IMPORTED_MODULE_2__.useSpring\n    ];\n});\n_c = Result;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Result);\nvar _c;\n$RefreshReg$(_c, \"Result\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1Jlc3VsdC9SZXN1bHQuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRXlDO0FBQ1U7QUFDYjtBQUVzQjtBQUNWO0FBRWxELElBQU1PLFNBQVM7UUFBR0MsYUFBQUE7O0lBQ2hCLGtDQUFrQztJQUVsQyxJQUFNQyxJQUFJLFNBQUNDO2VBQVFBOztJQUVuQixJQUFNLFdBQWVMLHFFQUFXQSxHQUF4Qk07SUFDUixJQUFNQyxpQkFBaUJOLDJEQUFpQkEsQ0FBQ0s7SUFFekMsSUFBTUUsWUFBWVgsdURBQVNBLENBQUM7UUFDMUJZLE1BQU07WUFBRUMsT0FBTztRQUFFO1FBQ2pCQyxJQUFJO1lBQUVELE9BQU9FLE1BQU1MLGtCQUFrQixJQUFJQTtRQUFlO0lBQzFEO0lBRUFYLGdEQUFTQSxDQUFDO1FBQ1IsSUFBTWlCLFFBQVE7UUFFZCxJQUFJLENBQUNOLGdCQUFnQjtZQUNuQk8sU0FBU0QsS0FBSyxHQUFHQTtRQUNuQixPQUFPO1lBQ0xDLFNBQVNELEtBQUssR0FBRyxHQUFjTixPQUFYTSxPQUFNLE9BQW9CLE9BQWZOO1FBQ2pDO0lBQ0YsR0FBRztRQUFDQTtLQUFlO0lBRW5CWCxnREFBU0EsQ0FBQztRQUNSbUIsT0FBT0MsTUFBTSxDQUFDO1lBQ1pDLEtBQUtILFNBQVNJLElBQUksQ0FBQ0MsWUFBWTtZQUMvQkMsVUFBVTtRQUNaO0lBQ0YsR0FBRztRQUFDZDtLQUFTO0lBRWIsT0FDRUMsaUJBQWlCLG1CQUNmLDhEQUFDYztrQkFDQyw0RUFBQ3RCLDRFQUFLQTtZQUFDdUIsT0FBTztZQUFHQyxPQUFNO1lBQVNDLEdBQUc7WUFBR0MsR0FBRztzQkFDdkMsNEVBQUMzQixrREFBUUEsQ0FBQzRCLElBQUk7O29CQU9YQyxLQUFLQyxLQUFLLENBQUNyQjtvQkFDWEo7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTWI7R0FoRE1EOztRQUtpQkYsaUVBQVdBO1FBR2RILG1EQUFTQTs7O0tBUnZCSztBQWtETiwrREFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9SZXN1bHQvUmVzdWx0LmpzeD8xNjBmIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNwcmluZywgYW5pbWF0ZWQgfSBmcm9tICdyZWFjdC1zcHJpbmcnO1xuaW1wb3J0IHsgVGl0bGUgfSBmcm9tICdAbWFudGluZS9jb3JlJztcblxuaW1wb3J0IHsgdXNlVXNlckRhdGEgfSBmcm9tICcuLi8uLi9jb250ZXh0L1VzZXJEYXRhQ29udGV4dCc7XG5pbXBvcnQgeyBjYWxjdWxhdGVDYWxvcmllcyB9IGZyb20gJy4uLy4uL2hlbHBlcnMnO1xuXG5jb25zdCBSZXN1bHQgPSAoeyBkaWN0IH0pID0+IHtcbiAgLy8gY29uc3QgeyB0IH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuXG4gIGNvbnN0IHQgPSAoa2V5KSA9PiBrZXk7XG5cbiAgY29uc3QgeyB1c2VyRGF0YSB9ID0gdXNlVXNlckRhdGEoKTtcbiAgY29uc3QgcmVzdWx0Q2Fsb3JpZXMgPSBjYWxjdWxhdGVDYWxvcmllcyh1c2VyRGF0YSk7XG5cbiAgY29uc3QgYW5pbWF0aW9uID0gdXNlU3ByaW5nKHtcbiAgICBmcm9tOiB7IHZhbHVlOiAwIH0sXG4gICAgdG86IHsgdmFsdWU6IGlzTmFOKHJlc3VsdENhbG9yaWVzKSA/IDAgOiByZXN1bHRDYWxvcmllcyB9LFxuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gJ0NhbG9yaWsnO1xuXG4gICAgaWYgKCFyZXN1bHRDYWxvcmllcykge1xuICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQudGl0bGUgPSBgJHt0aXRsZX0gfCAke3Jlc3VsdENhbG9yaWVzfWA7XG4gICAgfVxuICB9LCBbcmVzdWx0Q2Fsb3JpZXNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5zY3JvbGwoe1xuICAgICAgdG9wOiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICB9KTtcbiAgfSwgW3VzZXJEYXRhXSk7XG5cbiAgcmV0dXJuIChcbiAgICByZXN1bHRDYWxvcmllcyA+IDAgJiYgKFxuICAgICAgPGZvb3Rlcj5cbiAgICAgICAgPFRpdGxlIG9yZGVyPXsxfSBhbGlnbj1cImNlbnRlclwiIHA9ezB9IG09ezB9PlxuICAgICAgICAgIDxhbmltYXRlZC5zcGFuPlxuICAgICAgICAgICAgey8qIHthbmltYXRpb24udmFsdWUudG8oKHZhbCkgPT5cbiAgICAgICAgICAgICAgdCgncmVzdWx0Jywge1xuICAgICAgICAgICAgICAgIGNhbG9yaWVzOiBNYXRoLmZsb29yKHZhbCksXG4gICAgICAgICAgICAgICAgZ29hbDogdChgZ29hbC4ke3VzZXJEYXRhLmdvYWx9LnNob3J0YCksXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKX0gKi99XG4gICAgICAgICAgICB7TWF0aC5mbG9vcihyZXN1bHRDYWxvcmllcyl9XG4gICAgICAgICAgICB7ZGljdH1cbiAgICAgICAgICA8L2FuaW1hdGVkLnNwYW4+XG4gICAgICAgIDwvVGl0bGU+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICApXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXN1bHQ7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTcHJpbmciLCJhbmltYXRlZCIsIlRpdGxlIiwidXNlVXNlckRhdGEiLCJjYWxjdWxhdGVDYWxvcmllcyIsIlJlc3VsdCIsImRpY3QiLCJ0Iiwia2V5IiwidXNlckRhdGEiLCJyZXN1bHRDYWxvcmllcyIsImFuaW1hdGlvbiIsImZyb20iLCJ2YWx1ZSIsInRvIiwiaXNOYU4iLCJ0aXRsZSIsImRvY3VtZW50Iiwid2luZG93Iiwic2Nyb2xsIiwidG9wIiwiYm9keSIsInNjcm9sbEhlaWdodCIsImJlaGF2aW9yIiwiZm9vdGVyIiwib3JkZXIiLCJhbGlnbiIsInAiLCJtIiwic3BhbiIsIk1hdGgiLCJmbG9vciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Result/Result.jsx\n"));

/***/ })

});