# preferences

A light wrapper around a `reactive-var` that interacts with a `store`.
(Check out `preferences-mongo` and `preference-local-storage` for example storage).


Simply create a named preference var:

`var myVar = new PreferenceVar('myVar', defaultValueOrFn, Store)` If a value could not be read, the preference
is then set to the value of `defaultValueOrFn`, and then the final value returned.

## Installation

`meteor add 3stack:preferences`

## Usage

```js

// read values with `get`
var usersPref = new PreferenceVar('someSetting', 10.5, Store);

// ...

// set values with `set`
usersPref.set('someSetting', newValue);
```

This becomes quite handy, when used on a template instance:

eg, to store the number of items-per-page for your table:

```js

Template.myTemplate.onCreated(function(){
  this.itemsPerPage = new PreferenceVar('itemsPerPage', 30, LocalPreferenceStore);
});

Template.myTemplate.helpers({
  'items': function(){
    var tpl = Template.instance();
    return Items.find({}, {
      limit: tpl.itemsPerPage.get();
    })
  }
});

Template.myTemplate.evenst({
  'change select.items-per-page': function(e, tpl){
    tpl.itemsPerPage.set(parseInt($(e.currentTarget).val(), 10));
  }
});

```

## Multiple Stores

If you'd like to use both Local & Mongo storage for preferences - or perhaps other stores, use the `MultiPreferenceStore`

```js

stores = new MultiPreferenceStore([LocalPreferenceStore, MongoPreferenceStore])

// persists value in all stores, reads from first store with value set.
var usersPref = new PreferenceVar('someSetting', 10.5, stores);

```
