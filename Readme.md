# Backbone-Pflock

Two way data bindings for [Backbone](http://backbonejs.org) models using [Pflock](https://github.com/manuelstofer/pflock)

Backbone-Pflock provides an adapter to use Backbone models with pflock

### Usage
```Javascript
var adapter = require('backbone-pflock');
var model = new Backbone.Model({
    name: 'bla',
    description: 'anything'
});

var el = document.getElementById('model-root-node');

bind(el, model);
```

