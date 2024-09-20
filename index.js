"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDetectRerenderCauseProps = exports.useDetectRerenderCauseDeps = void 0;
var react_1 = require("react");
var lodash_1 = require("lodash");
var useDetectRerenderCauseDeps = function (props) {
    (0, react_1.useEffect)(function () { return console.info("Watching effect with name ".concat(props.name)); }, [props.name]);
    var _a = (0, react_1.useState)(props.deps), prevDeps = _a[0], setPrevDeps = _a[1];
    (0, react_1.useEffect)(function () {
        var _a;
        var keys = (_a = props.labels) !== null && _a !== void 0 ? _a : props.deps.map(function (_val, i) { return "Array Dependency ".concat(i); });
        if (detectChanges(props.name, prevDeps, props.deps, keys)) {
            setPrevDeps(props.deps);
        }
    }, [setPrevDeps, prevDeps, props.deps, props.labels, props.name]);
};
exports.useDetectRerenderCauseDeps = useDetectRerenderCauseDeps;
var useDetectRerenderCauseProps = function (props) {
    (0, react_1.useEffect)(function () { return console.info("Watching a component with name ".concat(props.name)); }, [props.name]);
    var _a = (0, react_1.useState)(Object.values(props.props)), prevProps = _a[0], setPrevProps = _a[1];
    (0, react_1.useEffect)(function () {
        if (detectChanges(props.name, prevProps, Object.values(props.props), Object.keys(props.props))) {
            setPrevProps(Object.values(props.props));
        }
    }, [setPrevProps, prevProps, props.props, props.name]);
};
exports.useDetectRerenderCauseProps = useDetectRerenderCauseProps;
var detectChanges = function (name, prevVals, newVals, keys) {
    if (prevVals.length !== newVals.length || prevVals.length !== keys.length) {
        console.error("useDetectRenderCause, prevVals, newVals and keys have differerent lengths (".concat(newVals.length, " ").concat(prevVals.length, " ").concat(keys.length, ")"));
        return false;
    }
    var changeFlag = false;
    for (var i = 0; i < prevVals.length; i++) {
        if (prevVals[i] !== newVals[i]) {
            console.info("Rerender in ".concat(name, " caused by \"").concat(keys[i], "\""));
            console.info("Prev value: ".concat((0, lodash_1.isObject)(prevVals[i]) && !(0, lodash_1.isFunction)(prevVals[i])
                ? JSON.stringify(prevVals[i])
                : "".concat(prevVals[i])));
            console.info("New  value: ".concat((0, lodash_1.isObject)(newVals[i]) && !(0, lodash_1.isFunction)(newVals[i])
                ? JSON.stringify(newVals[i])
                : "".concat(newVals[i])));
            changeFlag = true;
        }
        return changeFlag;
    }
};
