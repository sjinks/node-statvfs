const addon = require('bindings')('node_statvfs');

module.exports.statvfs = addon.statvfs;
