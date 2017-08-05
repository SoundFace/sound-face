"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const os = require("os");
const array_1 = require("./array");
function getAvailableIPAddress() {
    let interfaces = os.networkInterfaces();
    return array_1.flattenArray(Object.keys(interfaces).map(deviceName => (interfaces[deviceName].map(item => ({
        address: item.address,
        deviceName,
        family: item.family,
        internal: item.internal
    })))))
        .filter(item => !item.internal && item.family === 'IPv4');
}
exports.getAvailableIPAddress = getAvailableIPAddress;
function findClosestOpenPort(host, port) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        function t(portToCheck) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const isTaken = yield isPortTaken(host, portToCheck);
                if (!isTaken) {
                    return portToCheck;
                }
                return t(portToCheck + 1);
            });
        }
        return t(port);
    });
}
exports.findClosestOpenPort = findClosestOpenPort;
function isPortTaken(host, port) {
    return new Promise((resolve, reject) => {
        var net = require('net');
        var tester = net.createServer()
            .once('error', function (err) {
            if (err.code !== 'EADDRINUSE') {
                return resolve(true);
            }
            resolve(true);
        })
            .once('listening', function () {
            tester.once('close', function () {
                resolve(false);
            })
                .close();
        })
            .on('error', (err) => {
            reject(err);
        })
            .listen(port, host);
    });
}
exports.isPortTaken = isPortTaken;
