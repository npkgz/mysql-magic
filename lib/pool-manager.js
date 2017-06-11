const _mysql = require('mysql');
const _poolConnection = require('./pool-connection');

// cached pools
const _pools = {};

// create new pool
function initPool(name, config){
    // default pool ?
    if (name===null){
        name = '_default';
    }

    // new pool
    const pool = _mysql.createPool(config);

    // create pool wrapper
    _pools[name] = {
        _instance: pool,
        getConnection: function(){
            return _poolConnection.getConnection(pool);
        }
    }
}

// get an existing pool
function getPool(name='_default'){
    // pool exists ?
    if (name in _pools){
        return _pools[name];
    }else{
        throw new Error('Unknown pool <' + name + '> requested');
    }
}

module.exports = {
    initPool: initPool,
    getPool: getPool
};