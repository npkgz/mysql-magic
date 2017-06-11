const _fetchRow = require('./fetch-row');
const _fetchAll = require('./fetch-all');
const _insert = require('./insert');
const _query = require('./query');

// promise wrapper
function getConnection(pool){
    return new Promise(function(resolve, reject){
        // try to get a new connection from current pool
        pool.getConnection(function(err, connection){
            if (err){
                reject(err);
                return;
            }
            
            // custom api
            resolve({

                query: function(stmt, params){
                    return _query(connection, stmt, params);
                },

                insert: function(table, data){
                    return _insert(connection, table, data);
                },

                fetchRow: function(stmt, params){
                   return  _fetchRow(connection, stmt, params);
                },

                fetchAll: function(stmt, params){
                    return _fetchAll(connection, stmt, params);
                },

                release: function(){
                    return connection.release();
                }
            });
        });
    });
}

module.exports = {
    getConnection: getConnection,
};