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
            database : 'demo'
        });
    });

     it('should execute a query with 20 results', async function(){
        
        // get pool
        const pool = _db.getPool('userdb');

        // retreive connection
        const con = await pool.getConnection();

        // run query
        const [result, fields] = await con.query('SELECT * FROM users LIMIT 20;');

        con.release();

        _assert.equal(result.length, 20);
    });

    it('should execute a query with 1 result within connection scope', async function(){
        
        // retrieve connection scope
        const result = await _db.getConnection('userdb', async function(){
            // run query
            const [rows, fields] = await this.query('SELECT COUNT(*) as num FROM users;');

            return rows[0].num;
        });

        _assert.equal(result, 100);
    });

});