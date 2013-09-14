hapi-datify
===========

your datify-friendly hapi plugin.

[![Build Status](https://travis-ci.org/iamdoron/hapi-datify.png?branch=master)](https://travis-ci.org/iamdoron/hapi-datify)
## how

`> npm install hapi-datify`

use hapi-datify as a plugin for hapi. For example, if you use hapi cli tool (or composer), put it in your config file:

```json
{
  "servers": [
    {
      "host": "localhost",
      "port": 8000,
      "options": {
        "labels": ["api", "nasty"]
      }
    }
  ],
  "plugins": {
    "hapi-datify": {
      "routesToDatifyRegEx": "^/books&"
    }
  }
}
```
The example above will [datify](https://npmjs.org/package/datify) only the /books route, meaning, it will [`datify`](https://npmjs.org/package/datify) `request.payload`, `request.query` .

## why
see [datify#why](https://github.com/iamdoron/datify#why).

For example, you could:

```javascript
pack.route({ method: 'POST', path: '/books', handler: function(request){
            // store the book in the DB with a real js Date - that means you can query using dates later on
            //  POST /books --data {"publishedAt": "2012-09-13T17:09:30.909Z", ...}
              books.insert(request.payload, function(err, documents){ 
                request.reply("ok\n");
              });
            } 
          });
pack.route({ method: 'GET', path: '/books', handler: function(request){
            // find a book published from a date, without having to parse dates
            // GET /books?from=2011-09-13T17:09:30.909Z
              books.find({ publishedAt: { $gte: request.query.from } }, function(err, books){ 
                request.reply({results: books});
              });
            } 
          });
```
## test
```sh
> npm install
> make test-cov
```
