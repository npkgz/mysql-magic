const _poolManager = require('./lib/pool-manager');
const _poolConnection = require('./lib/pool-connection');
const _api = {};

// pool management
_api.initPool = _poolManager.initPool;
_api.getPool = _poolManager.getPool;

// retrieve a connection by pool name
_api.getConnection = function(poolname, scope){
    return _poolManager.getPool(poolname).getConnection(scope);
};

// expose api
module.exports = _api;