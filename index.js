const addon = require('bindings')('node_statvfs');

module.exports.statvfs = addon.statvfs;
module.exports.statvfsSync = addon.statvfsSync;
