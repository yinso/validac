"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function expectError(inner) {
    return new Promise(function (resolve, reject) {
        inner.then(function (res) { return reject(new Error("UnexpectedSuccess")); })
            .catch(function (e) { return resolve(); });
    });
}
exports.expectError = expectError;
var mocha_typescript_1 = require("mocha-typescript");
exports.suite = mocha_typescript_1.suite;
exports.test = mocha_typescript_1.test;
exports.slow = mocha_typescript_1.slow;
exports.timeout = mocha_typescript_1.timeout;
//# sourceMappingURL=test-util.js.map