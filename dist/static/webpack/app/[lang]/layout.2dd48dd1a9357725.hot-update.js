"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/[lang]/layout",{

/***/ "(app-pages-browser)/./src/components/Header/Header.jsx":
/*!******************************************!*\
  !*** ./src/components/Header/Header.jsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/_/_extends */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_extends.js\");\n/* harmony import */ var _swc_helpers_object_destructuring_empty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/_/_object_destructuring_empty */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_object_destructuring_empty.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _barrel_optimize_names_FiMoon_FiSun_react_icons_fi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=FiMoon,FiSun!=!react-icons/fi */ \"(app-pages-browser)/./node_modules/react-icons/fi/index.esm.js\");\n/* harmony import */ var _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=ActionIcon,Button,Group,useMantineColorScheme!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/core/MantineProvider/use-mantine-color-scheme/use-mantine-color-scheme.mjs\");\n/* harmony import */ var _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=ActionIcon,Button,Group,useMantineColorScheme!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/components/Group/Group.mjs\");\n/* harmony import */ var _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=ActionIcon,Button,Group,useMantineColorScheme!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/components/Button/Button.mjs\");\n/* harmony import */ var _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=ActionIcon,Button,Group,useMantineColorScheme!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\nvar languages = [\n    \"en\",\n    \"ru\",\n    \"de\"\n];\nvar Header = function(_param) {\n    var props = (0,_swc_helpers_extends__WEBPACK_IMPORTED_MODULE_3__._)({}, (0,_swc_helpers_object_destructuring_empty__WEBPACK_IMPORTED_MODULE_4__._)(_param));\n    _s();\n    var params = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)();\n    var router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    var _useMantineColorScheme = (0,_barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_5__.useMantineColorScheme)(), colorScheme = _useMantineColorScheme.colorScheme, toggleColorScheme = _useMantineColorScheme.toggleColorScheme;\n    var isDark = colorScheme === \"dark\";\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_6__.Group, {\n            gap: \"md\",\n            justify: \"end\",\n            children: [\n                languages.map(function(lang) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_7__.Button, {\n                        size: \"xs\",\n                        variant: params.lang === lang ? \"light\" : \"subtle\",\n                        onClick: function() {\n                            return router.push(\"/\".concat(lang));\n                        },\n                        children: lang.toUpperCase()\n                    }, lang, false, {\n                        fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n                        lineNumber: 27,\n                        columnNumber: 11\n                    }, _this);\n                }),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_8__.ActionIcon, {\n                    variant: \"subtle\",\n                    onClick: function() {\n                        return toggleColorScheme();\n                    },\n                    children: isDark ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FiMoon_FiSun_react_icons_fi__WEBPACK_IMPORTED_MODULE_9__.FiMoon, {}, void 0, false, {\n                        fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n                        lineNumber: 37,\n                        columnNumber: 21\n                    }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FiMoon_FiSun_react_icons_fi__WEBPACK_IMPORTED_MODULE_9__.FiSun, {}, void 0, false, {\n                        fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n                        lineNumber: 37,\n                        columnNumber: 34\n                    }, _this)\n                }, void 0, false, {\n                    fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n                    lineNumber: 36,\n                    columnNumber: 9\n                }, _this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n            lineNumber: 25,\n            columnNumber: 7\n        }, _this)\n    }, void 0, false, {\n        fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, _this);\n};\n_s(Header, \"4aX/Ye3ld1epLbveiozO4ei8Nq4=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_5__.useMantineColorScheme\n    ];\n});\n_c = Header;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci9IZWFkZXIuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUwQjtBQUM2QjtBQUVSO0FBTXhCO0FBRXZCLElBQU1TLFlBQVk7SUFBQztJQUFNO0lBQU07Q0FBSztBQUVwQyxJQUFNQyxTQUFTO1FBQU1DLFFBQUFBLHVEQUFBQSxLQUFBQSwwRUFBQUE7O0lBQ25CLElBQU1DLFNBQVNYLDBEQUFTQTtJQUN4QixJQUFNWSxTQUFTWCwwREFBU0E7SUFFeEIsSUFBMkNNLHlCQUFBQSx3SUFBcUJBLElBQXhETSxjQUFtQ04sdUJBQW5DTSxhQUFhQyxvQkFBc0JQLHVCQUF0Qk87SUFDckIsSUFBTUMsU0FBU0YsZ0JBQWdCO0lBRS9CLHFCQUNFLDhEQUFDRztrQkFDQyw0RUFBQ1gsb0hBQUtBO1lBQUNZLEtBQUk7WUFBS0MsU0FBUTs7Z0JBQ3JCVixVQUFVVyxHQUFHLENBQUMsU0FBQ0M7eUNBQ2QsOERBQUNkLHFIQUFNQTt3QkFFTGUsTUFBSzt3QkFDTEMsU0FBU1gsT0FBT1MsSUFBSSxLQUFLQSxPQUFPLFVBQVU7d0JBQzFDRyxTQUFTO21DQUFNWCxPQUFPWSxJQUFJLENBQUMsSUFBUyxPQUFMSjs7a0NBRTlCQSxLQUFLSyxXQUFXO3VCQUxaTDs7Ozs7OzhCQVFULDhEQUFDaEIseUhBQVVBO29CQUFDa0IsU0FBUTtvQkFBU0MsU0FBUzsrQkFBTVQ7OzhCQUN6Q0MsdUJBQVMsOERBQUNiLHNGQUFNQTs7Ozs4Q0FBTSw4REFBQ0MscUZBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLdkM7R0ExQk1NOztRQUNXVCxzREFBU0E7UUFDVEMsc0RBQVNBO1FBRW1CTSxvSUFBcUJBOzs7S0FKNURFO0FBNEJOLCtEQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci9IZWFkZXIuanN4PzMxNjAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUGFyYW1zLCB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuXG5pbXBvcnQgeyBGaU1vb24sIEZpU3VuIH0gZnJvbSAncmVhY3QtaWNvbnMvZmknO1xuaW1wb3J0IHtcbiAgQWN0aW9uSWNvbixcbiAgR3JvdXAsXG4gIEJ1dHRvbixcbiAgdXNlTWFudGluZUNvbG9yU2NoZW1lLFxufSBmcm9tICdAbWFudGluZS9jb3JlJztcblxuY29uc3QgbGFuZ3VhZ2VzID0gWydlbicsICdydScsICdkZSddO1xuXG5jb25zdCBIZWFkZXIgPSAoeyAuLi5wcm9wcyB9KSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHVzZVBhcmFtcygpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICBjb25zdCB7IGNvbG9yU2NoZW1lLCB0b2dnbGVDb2xvclNjaGVtZSB9ID0gdXNlTWFudGluZUNvbG9yU2NoZW1lKCk7XG4gIGNvbnN0IGlzRGFyayA9IGNvbG9yU2NoZW1lID09PSAnZGFyayc7XG5cbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyPlxuICAgICAgPEdyb3VwIGdhcD1cIm1kXCIganVzdGlmeT1cImVuZFwiPlxuICAgICAgICB7bGFuZ3VhZ2VzLm1hcCgobGFuZykgPT4gKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17bGFuZ31cbiAgICAgICAgICAgIHNpemU9XCJ4c1wiXG4gICAgICAgICAgICB2YXJpYW50PXtwYXJhbXMubGFuZyA9PT0gbGFuZyA/ICdsaWdodCcgOiAnc3VidGxlJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKGAvJHtsYW5nfWApfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYW5nLnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICkpfVxuICAgICAgICA8QWN0aW9uSWNvbiB2YXJpYW50PVwic3VidGxlXCIgb25DbGljaz17KCkgPT4gdG9nZ2xlQ29sb3JTY2hlbWUoKX0+XG4gICAgICAgICAge2lzRGFyayA/IDxGaU1vb24gLz4gOiA8RmlTdW4gLz59XG4gICAgICAgIDwvQWN0aW9uSWNvbj5cbiAgICAgIDwvR3JvdXA+XG4gICAgPC9oZWFkZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VQYXJhbXMiLCJ1c2VSb3V0ZXIiLCJGaU1vb24iLCJGaVN1biIsIkFjdGlvbkljb24iLCJHcm91cCIsIkJ1dHRvbiIsInVzZU1hbnRpbmVDb2xvclNjaGVtZSIsImxhbmd1YWdlcyIsIkhlYWRlciIsInByb3BzIiwicGFyYW1zIiwicm91dGVyIiwiY29sb3JTY2hlbWUiLCJ0b2dnbGVDb2xvclNjaGVtZSIsImlzRGFyayIsImhlYWRlciIsImdhcCIsImp1c3RpZnkiLCJtYXAiLCJsYW5nIiwic2l6ZSIsInZhcmlhbnQiLCJvbkNsaWNrIiwicHVzaCIsInRvVXBwZXJDYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Header/Header.jsx\n"));

/***/ })

});