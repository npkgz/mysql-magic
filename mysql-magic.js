const _poolManager = require('./lib/pool-manager');

const _api = {};

_api.initPool = _poolManager.initPool;
_api.getPool = _poolManager.getPool;

// expose api
module.exports = _api;