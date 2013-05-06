connect-nedb-session
====================

NeDB-backed session store for the Connect/Express session middleware.

## Install and test
```javascript
npm install connect-nedb-session
make test
```

## How to use
```javascript
// If you use Connect alone
var connect = require('connect')
 , NedbStore = require('connect-nedb-session')(connect);

// If you use Express
var express = require('express')
 , NedbStore = require('connect-nedb-session')(express);

// Use with the session middleware (replace express with connect if you use Connect)
server.use(express.session({ secret: 'yoursecret'
                           , key: 'yoursessionkey'
                           , cookie: { path: '/'
                                     , httpOnly: true
                                     , maxAge: 365 * 24 * 3600 * 1000   // One year for example
                                     }
                           , store: new NedbStore({ filename: 'path_to_nedb_persistence_file' })
                           }));
```

## License
MIT
