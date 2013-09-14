hapi-datify
===========

your datify-friendly hapi plugin.

[![Build Status](https://travis-ci.org/iamdoron/hapi-datify.png?branch=master)](https://travis-ci.org/iamdoron/hapi-datify)
## how

`> npm install hapi-datify`

use hapi-datify as a plugin for hapi. For example, if you use hapi cli tool (or composer), put it in your config file:

```json
{
  "hapi-datify": {
    "routesToDatifyRegEx": "^/documents&"
  }
}
```
The example above will [datify](https://npmjs.org/package/datify) only the /documents route, meaning, it will [`datify`](https://npmjs.org/package/datify) `request.payload`, `request.query` .

## why
see [datify#why](https://github.com/iamdoron/datify#why).

## test
```sh
> npm install
> make test-cov
```
