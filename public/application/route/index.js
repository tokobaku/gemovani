"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var index_1 = require("Component/Homepage/index");
var AppRouter = /** @class */ (function (_super) {
    __extends(AppRouter, _super);
    function AppRouter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderBeforePage = [
        // TODO: add header here
        ];
        _this.renderAfterPage = [
        // TODO: add footer here
        ];
        return _this;
    }
    AppRouter.prototype.renderComponentsBeforePage = function () {
        var sortedComponents = this.renderBeforePage.sort(function (left, right) { return (left.sortOrder < right.sortOrder ? 1 : 0); });
        return sortedComponents.map(function (_a) {
            var component = _a.component;
            return component;
        });
    };
    AppRouter.prototype.renderComponentsAfterPage = function () {
        var sortedComponents = this.renderAfterPage.sort(function (left, right) { return (left.sortOrder < right.sortOrder ? 1 : 0); });
        return sortedComponents.map(function (_a) {
            var component = _a.component;
            return component;
        });
    };
    AppRouter.prototype.renderRoutes = function () {
        return [
            React.createElement(react_router_dom_1.Route, { path: "/", component: index_1.default })
        ];
    };
    AppRouter.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            this.renderComponentsBeforePage(),
            React.createElement(react_router_dom_1.Switch, null, this.renderRoutes()),
            this.renderComponentsAfterPage()));
    };
    return AppRouter;
}(React.PureComponent));
exports.default = AppRouter;
//# sourceMappingURL=index.js.map