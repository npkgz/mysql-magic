[![Build Status](https://travis-ci.org/AndiDittrich/Node.mysql-magic.svg?branch=master)](https://travis-ci.org/AndiDittrich/Node.mysql-magic)

mysql-magic BETA
=========================

Promised based, high-level [mysql library](https://github.com/mysqljs/mysql) extension for Node.js **>=7.6**.

```
yarn add mysql-magic --save
```

Features
------------------------------

* **BETA RELEASE** DO NOT USE IT IN PRODUCTION
* Supports multiple named connection pools (different database settings with global scope)
* High-level API 
* Designed to run with the pure power of native `Promise`, `await` and `async function`


Usage
------------------------------

**Application Bootstrap**

```js
const _mysqlMagic = require('mysql-magic');

// somewhere during your applications bootstrap...initialize a custom pool
_mysqlMagic.initPool('userdb', {
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
});
```

**Run Querys**

```js
// get the pool
const _db = require('mysql-magic').getPool('userdb');

// wait for connection becomes available
const con = await _db.getConnection();

// execute query
const [result, fields] = await con.query('SELECT * FROM `users` LIMIT 10;');

// release connection
await con.release();
```

API
------------------------------

* initPool
* getPool
* Pool::getConnection
* Connection::release
* Connection::query
* Connection::insert
* Connection::fetchRow
* Connection::fetchAll


mysql-magic::initPool
------------------------------

**Description:** Initializes a new named connection pool. Pass [mysql connection options](https://github.com/mysqljs/mysql#pool-options) as second argument (passthrough)

**Syntax:** `pool:Object = initPool(name:String, options:Object)`

```js
const _db = require('mysql-magic');

// initialize a new "named" pool
initPool('userdb', {
    // db credentials
    host: 'localhost',
    user: 'bob',
    password: 'secret',
    database: 'my_user_db'

    // special pool options
    connectionLimit: 50,
    acquireTimeout: 1000,
    waitForConnections: true,
    queueLimit: 200
});

// initialize default pool
initPool(null, {
    ...
})
```

mysql-magic::getPool
------------------------------

**Description:** Retrieves a named connection pool

**Syntax:** `const pool:Object = getPool([name:String])`

```js
// get the userdb pool
const _db = require('mysql-magic').getPool('userdb');

// request a connection
const con = await _db.getConnection();
...
```

mysql-magic::Pool::getConnection
------------------------------

**Description:** Requests a connection from given pool

**Syntax:** `const connection:Object = Pool::getConnection()`

```js
// get the userdb pool
const _db = require('mysql-magic').getPool('userdb');

// request a connection
const con = await _db.getConnection();

// do something
...
```

mysql-magic::Connection::release
------------------------------

**Description:** Releases the connection

**Syntax:** `Connection::release()`

```js
// get the userdb pool
const _db = require('mysql-magic').getPool('userdb');

// request a connection
const con = await _db.getConnection();

// do something
...

// release the connection
con.release();
```

mysql-magic::Connection::query
------------------------------

**Description:** Executes a [mysql query](https://github.com/mysqljs/mysql#performing-queries)

**Syntax:** `const [result:Object, fields:Object] = Connection::query(sql:string, [values:Object])`

```js
// get the userdb pool
const _db = require('mysql-magic').getPool('userdb');

// request a connection
const con = await _db.getConnection();

// do something
const [result] = await con.query('SELECT * FROM `users LIMIT 100`;');

console.log(result);

// release the connection
con.release();
```

mysql-magic::Connection::insert
------------------------------

**Description:** Executes a insert with given values wrapped into object

**Syntax:** `const [insertID:int, result:Object] = Connection::insert(table:string, values:Object)`

```js
// get the userdb pool
const _db = require('mysql-magic').getPool('userdb');

// request a connection
const con = await _db.getConnection();

// insert a new user
const [userid] = await con.insert('users', {
    name: 'John',
    email: 'john@example.org',
    login: 'johndow1234'
});

console.log(result);

// release the connection
con.release();
```

mysql-magic::Connection::fetchRow
------------------------------

**Description:** Executes a query an returns a single result as object

**Syntax:** `const [result:Object] = Connection::fetchRow(sql:string, [values:Object])`

```js
// get the userdb pool
const _db = require('mysql-magic').getPool('userdb');

// request a connection
const con = await _db.getConnection();

// fetch user by its name
const user = await _db.fetchRow('SELECT * FROM `users` WHERE `name` LIKE ? LIMIT 1;', ['John']);

console.log(result);

// release the connection
con.release();
```

mysql-magic::Connection::fetchAll
------------------------------

**Description:** Executes a query an returns an array of objects (similar to query but returns an **empty array** in case of empty resultset)

**Syntax:** `const [results:Array] = Connection::fetchAll(sql:string, [values:Object])`

```js
// get the userdb pool
const _db = require('mysql-magic').getPool('userdb');

// request a connection
const con = await _db.getConnection();

// fetch all users
const users = await _db.fetchAll('SELECT * FROM `users`;');

// show users
for (const user in users){
    console.log('User[', user.id, '] - ', user.name);
}

// release the connection
con.release
```

Any Questions ? Report a Bug ? Enhancements ?
---------------------------------------------
Please open a new issue on [GitHub](https://github.com/AndiDittrich/Node.mysql-magic/issues)

License
-------
mysql-magic is OpenSource and licensed under the Terms of [The MIT License](LICENSE.md)
