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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/_/_extends */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_extends.js\");\n/* harmony import */ var _swc_helpers_object_destructuring_empty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_object_destructuring_empty */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_object_destructuring_empty.js\");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _barrel_optimize_names_FiMoon_FiSun_react_icons_fi__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! __barrel_optimize__?names=FiMoon,FiSun!=!react-icons/fi */ \"(app-pages-browser)/./node_modules/react-icons/fi/index.esm.js\");\n/* harmony import */ var _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=ActionIcon,Button,Group,useMantineColorScheme!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/core/MantineProvider/use-mantine-color-scheme/use-mantine-color-scheme.mjs\");\n/* harmony import */ var _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=ActionIcon,Button,Group,useMantineColorScheme!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/components/Group/Group.mjs\");\n/* harmony import */ var _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=ActionIcon,Button,Group,useMantineColorScheme!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/components/Button/Button.mjs\");\n/* harmony import */ var _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! __barrel_optimize__?names=ActionIcon,Button,Group,useMantineColorScheme!=!@mantine/core */ \"(app-pages-browser)/./node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.mjs\");\n/* harmony import */ var _hooks_useLocalStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useLocalStorage */ \"(app-pages-browser)/./src/hooks/useLocalStorage.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n// import { useTranslation } from 'react-i18next';\n\n\n\nvar languages = [\n    \"en\",\n    \"ru\",\n    \"de\"\n];\nvar Header = function(_param) {\n    var props = (0,_swc_helpers_extends__WEBPACK_IMPORTED_MODULE_4__._)({}, (0,_swc_helpers_object_destructuring_empty__WEBPACK_IMPORTED_MODULE_5__._)(_param));\n    _s();\n    var params = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)();\n    var router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    var _useMantineColorScheme = (0,_barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_6__.useMantineColorScheme)(), colorScheme = _useMantineColorScheme.colorScheme, toggleColorScheme = _useMantineColorScheme.toggleColorScheme;\n    var isDark = colorScheme === \"dark\";\n    var _useLocalStorage = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_7__._)((0,_hooks_useLocalStorage__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"calorikLang\", \"en\"), 2), persistedLang = _useLocalStorage[0], setPersistedLang = _useLocalStorage[1];\n    // const [selectedLanguage, setLanguage] = useState(() => persistedLang || 'en');\n    // useEffect(() => {\n    //   if (!persistedLang) {\n    //     return;\n    //   }\n    //   // i18n.changeLanguage(persistedLang);\n    // }, [persistedLang, i18n]);\n    // const handleChangeLanguage = (lang) => {\n    //   i18n.changeLanguage(lang);\n    //   setLanguage(lang);\n    //   setPersistedLang(lang);\n    // };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_8__.Group, {\n            gap: \"md\",\n            justify: \"end\",\n            children: [\n                languages.map(function(lang) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_9__.Button, {\n                        size: \"xs\",\n                        variant: params.lang === lang ? \"light\" : \"subtle\",\n                        onClick: function() {\n                            return router.push(\"/\".concat(lang));\n                        },\n                        children: lang.toUpperCase()\n                    }, lang, false, {\n                        fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n                        lineNumber: 50,\n                        columnNumber: 11\n                    }, _this);\n                }),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_10__.ActionIcon, {\n                    variant: \"subtle\",\n                    onClick: function() {\n                        return toggleColorScheme();\n                    },\n                    children: isDark ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FiMoon_FiSun_react_icons_fi__WEBPACK_IMPORTED_MODULE_11__.FiMoon, {}, void 0, false, {\n                        fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n                        lineNumber: 60,\n                        columnNumber: 21\n                    }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FiMoon_FiSun_react_icons_fi__WEBPACK_IMPORTED_MODULE_11__.FiSun, {}, void 0, false, {\n                        fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n                        lineNumber: 60,\n                        columnNumber: 34\n                    }, _this)\n                }, void 0, false, {\n                    fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n                    lineNumber: 59,\n                    columnNumber: 9\n                }, _this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n            lineNumber: 48,\n            columnNumber: 7\n        }, _this)\n    }, void 0, false, {\n        fileName: \"/Users/sergio/projects/calorik/src/components/Header/Header.jsx\",\n        lineNumber: 47,\n        columnNumber: 5\n    }, _this);\n};\n_s(Header, \"ZbCmvADozz5B6kKXROYwz0yoYLY=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        _barrel_optimize_names_ActionIcon_Button_Group_useMantineColorScheme_mantine_core__WEBPACK_IMPORTED_MODULE_6__.useMantineColorScheme,\n        _hooks_useLocalStorage__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    ];\n});\n_c = Header;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci9IZWFkZXIuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVtRDtBQUNJO0FBRXZELGtEQUFrRDtBQUNIO0FBTXhCO0FBRW1DO0FBRTFELElBQU1ZLFlBQVk7SUFBQztJQUFNO0lBQU07Q0FBSztBQUVwQyxJQUFNQyxTQUFTO1FBQU1DLFFBQUFBLHVEQUFBQSxLQUFBQSwwRUFBQUE7O0lBQ25CLElBQU1DLFNBQVNaLDBEQUFTQTtJQUN4QixJQUFNYSxTQUFTWiwwREFBU0E7SUFFeEIsSUFBMkNNLHlCQUFBQSx3SUFBcUJBLElBQXhETyxjQUFtQ1AsdUJBQW5DTyxhQUFhQyxvQkFBc0JSLHVCQUF0QlE7SUFDckIsSUFBTUMsU0FBU0YsZ0JBQWdCO0lBRS9CLElBQTBDTixtQkFBQUEsK0RBQUFBLENBQUFBLGtFQUFlQSxDQUN2RCxlQUNBLFdBRktTLGdCQUFtQ1QscUJBQXBCVSxtQkFBb0JWO0lBSTFDLGlGQUFpRjtJQUVqRixvQkFBb0I7SUFDcEIsMEJBQTBCO0lBQzFCLGNBQWM7SUFDZCxNQUFNO0lBRU4sMkNBQTJDO0lBQzNDLDZCQUE2QjtJQUU3QiwyQ0FBMkM7SUFDM0MsK0JBQStCO0lBQy9CLHVCQUF1QjtJQUN2Qiw0QkFBNEI7SUFDNUIsS0FBSztJQUVMLHFCQUNFLDhEQUFDVztrQkFDQyw0RUFBQ2Qsb0hBQUtBO1lBQUNlLEtBQUk7WUFBS0MsU0FBUTs7Z0JBQ3JCWixVQUFVYSxHQUFHLENBQUMsU0FBQ0M7eUNBQ2QsOERBQUNqQixxSEFBTUE7d0JBRUxrQixNQUFLO3dCQUNMQyxTQUFTYixPQUFPVyxJQUFJLEtBQUtBLE9BQU8sVUFBVTt3QkFDMUNHLFNBQVM7bUNBQU1iLE9BQU9jLElBQUksQ0FBQyxJQUFTLE9BQUxKOztrQ0FFOUJBLEtBQUtLLFdBQVc7dUJBTFpMOzs7Ozs7OEJBUVQsOERBQUNuQiwwSEFBVUE7b0JBQUNxQixTQUFRO29CQUFTQyxTQUFTOytCQUFNWDs7OEJBQ3pDQyx1QkFBUyw4REFBQ2QsdUZBQU1BOzs7OzhDQUFNLDhEQUFDQyxzRkFBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUt2QztHQTlDTU87O1FBQ1dWLHNEQUFTQTtRQUNUQyxzREFBU0E7UUFFbUJNLG9JQUFxQkE7UUFHdEJDLDhEQUFlQTs7O0tBUHJERTtBQWdETiwrREFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmpzeD8zMTYwIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VQYXJhbXMsIHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XG5cbi8vIGltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAncmVhY3QtaTE4bmV4dCc7XG5pbXBvcnQgeyBGaU1vb24sIEZpU3VuIH0gZnJvbSAncmVhY3QtaWNvbnMvZmknO1xuaW1wb3J0IHtcbiAgQWN0aW9uSWNvbixcbiAgR3JvdXAsXG4gIEJ1dHRvbixcbiAgdXNlTWFudGluZUNvbG9yU2NoZW1lLFxufSBmcm9tICdAbWFudGluZS9jb3JlJztcblxuaW1wb3J0IHVzZUxvY2FsU3RvcmFnZSBmcm9tICcuLi8uLi9ob29rcy91c2VMb2NhbFN0b3JhZ2UnO1xuXG5jb25zdCBsYW5ndWFnZXMgPSBbJ2VuJywgJ3J1JywgJ2RlJ107XG5cbmNvbnN0IEhlYWRlciA9ICh7IC4uLnByb3BzIH0pID0+IHtcbiAgY29uc3QgcGFyYW1zID0gdXNlUGFyYW1zKCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIGNvbnN0IHsgY29sb3JTY2hlbWUsIHRvZ2dsZUNvbG9yU2NoZW1lIH0gPSB1c2VNYW50aW5lQ29sb3JTY2hlbWUoKTtcbiAgY29uc3QgaXNEYXJrID0gY29sb3JTY2hlbWUgPT09ICdkYXJrJztcblxuICBjb25zdCBbcGVyc2lzdGVkTGFuZywgc2V0UGVyc2lzdGVkTGFuZ10gPSB1c2VMb2NhbFN0b3JhZ2UoXG4gICAgJ2NhbG9yaWtMYW5nJyxcbiAgICAnZW4nLFxuICApO1xuICAvLyBjb25zdCBbc2VsZWN0ZWRMYW5ndWFnZSwgc2V0TGFuZ3VhZ2VdID0gdXNlU3RhdGUoKCkgPT4gcGVyc2lzdGVkTGFuZyB8fCAnZW4nKTtcblxuICAvLyB1c2VFZmZlY3QoKCkgPT4ge1xuICAvLyAgIGlmICghcGVyc2lzdGVkTGFuZykge1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cblxuICAvLyAgIC8vIGkxOG4uY2hhbmdlTGFuZ3VhZ2UocGVyc2lzdGVkTGFuZyk7XG4gIC8vIH0sIFtwZXJzaXN0ZWRMYW5nLCBpMThuXSk7XG5cbiAgLy8gY29uc3QgaGFuZGxlQ2hhbmdlTGFuZ3VhZ2UgPSAobGFuZykgPT4ge1xuICAvLyAgIGkxOG4uY2hhbmdlTGFuZ3VhZ2UobGFuZyk7XG4gIC8vICAgc2V0TGFuZ3VhZ2UobGFuZyk7XG4gIC8vICAgc2V0UGVyc2lzdGVkTGFuZyhsYW5nKTtcbiAgLy8gfTtcblxuICByZXR1cm4gKFxuICAgIDxoZWFkZXI+XG4gICAgICA8R3JvdXAgZ2FwPVwibWRcIiBqdXN0aWZ5PVwiZW5kXCI+XG4gICAgICAgIHtsYW5ndWFnZXMubWFwKChsYW5nKSA9PiAoXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtsYW5nfVxuICAgICAgICAgICAgc2l6ZT1cInhzXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9e3BhcmFtcy5sYW5nID09PSBsYW5nID8gJ2xpZ2h0JyA6ICdzdWJ0bGUnfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcm91dGVyLnB1c2goYC8ke2xhbmd9YCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhbmcudG9VcHBlckNhc2UoKX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICAgIDxBY3Rpb25JY29uIHZhcmlhbnQ9XCJzdWJ0bGVcIiBvbkNsaWNrPXsoKSA9PiB0b2dnbGVDb2xvclNjaGVtZSgpfT5cbiAgICAgICAgICB7aXNEYXJrID8gPEZpTW9vbiAvPiA6IDxGaVN1biAvPn1cbiAgICAgICAgPC9BY3Rpb25JY29uPlxuICAgICAgPC9Hcm91cD5cbiAgICA8L2hlYWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUGFyYW1zIiwidXNlUm91dGVyIiwiRmlNb29uIiwiRmlTdW4iLCJBY3Rpb25JY29uIiwiR3JvdXAiLCJCdXR0b24iLCJ1c2VNYW50aW5lQ29sb3JTY2hlbWUiLCJ1c2VMb2NhbFN0b3JhZ2UiLCJsYW5ndWFnZXMiLCJIZWFkZXIiLCJwcm9wcyIsInBhcmFtcyIsInJvdXRlciIsImNvbG9yU2NoZW1lIiwidG9nZ2xlQ29sb3JTY2hlbWUiLCJpc0RhcmsiLCJwZXJzaXN0ZWRMYW5nIiwic2V0UGVyc2lzdGVkTGFuZyIsImhlYWRlciIsImdhcCIsImp1c3RpZnkiLCJtYXAiLCJsYW5nIiwic2l6ZSIsInZhcmlhbnQiLCJvbkNsaWNrIiwicHVzaCIsInRvVXBwZXJDYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Header/Header.jsx\n"));

/***/ })

});