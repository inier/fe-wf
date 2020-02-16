(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ssr"] = factory();
	else
		root["ssr"] = factory();
})(this, function() {
return (this["webpackJsonp_name_"] = this["webpackJsonp_name_"] || []).push([["ssr"],{

/***/ "./src/ssr.jsx":
/*!*********************!*\
  !*** ./src/ssr.jsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar ReactDOM = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar SSR = React.createElement(\"div\", {\n  onClick: function onClick() {\n    return alert('hello');\n  }\n}, \"Hello world\");\n\nif (typeof document === 'undefined') {\n  console.log('在服务端渲染');\n  module.exports = SSR;\n} else {\n  console.log('在客户端渲染');\n  var renderMethod =  true ? ReactDOM.render : undefined;\n  renderMethod(SSR, document.getElementById('root'));\n}\n\n//# sourceURL=webpack://%5Bname%5D/./src/ssr.jsx?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/ssr.jsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! G:\\workspace\\fe-wf\\src\\ssr.jsx */\"./src/ssr.jsx\");\n\n\n//# sourceURL=webpack://%5Bname%5D/multi_./src/ssr.jsx?");

/***/ })

},[[0,"runtime","chunk-vendors"]]]);
});