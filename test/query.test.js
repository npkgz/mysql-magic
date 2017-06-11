const _db = require('../mysql-magic');
const _assert = require('assert');

// generic checksum testing
describe('query', function(){
 
    // prepare pool
    before(async function(){
        // somewhere during your applications bootstrap...initialize a custom pool
        _db.initPool('userdb', {
            host     : 'localhost',
            user     : 'dev',
            password : 'dev',
            database : 'ulogd2'
        });
    });

     it('should throw an exepction in case the file is not available (ENOENT)', async function(){
        
        // get pool
        const pool = _db.getPool('userdb');

        console.log(pool);

        // retreive connection
        const con = await pool.getConnection();

        console.log(con);

        // run query
        const [result, fields] = await con.query('SELECT * FROM log LIMIT 20;');

        console.log(fields);

        con.release();

    });

});