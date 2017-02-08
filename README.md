# controller-load

Full folder controllers load

# Installing it

```npm install controller-load --save```

# Using it

```js
var ctrlLoad = require('controller-load');

var express = require('express');
var app = express();

ctrlLoad.Load(app, './controller/', true);
```

# Sample Controller

```js
function Me(req, res) {
	res.json({ message: "me controller" });
}

module.exports = function(app) {
	app.get('/me', Me);
}
```