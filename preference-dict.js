
PreferenceDict = (function(){
  function PreferenceDict(name, defaults, store){
    var self = this,
        userId = Tracker.nonreactive(function(){ return Meteor.userId(); });

    self.name = name;
    self.userId = userId;
    self._store = store;
    self._reactiveDict = new ReactiveDict();

    _.each(defaults, function(defaultOrFn, key){
      var value = self._store.get(self.userId, self._key(key));
      if (value === undefined){
        if (_.isFunction(defaultOrFn)){
          try {
            value = defaultOrFn();
          } catch(e){
            Log.error("Error getting object from storage:", e);
            value = void 0;
          }
        } else {
          value = defaultOrFn;
        }
        // The value wasn't set in the store,
        // we need to save it for the future.
        self.set(key, value);
      } else {
        // as we've loaded this from the store
        // just set it on the dict.
        self._reactiveDict.set(key, value);
      }

    });
  }

  _.extend(PreferenceDict.prototype, {
    _key:function(key){
      return self.name + '|' + key;
    },
    get: function PreferenceDict_get(key){
      var self = this;
      return self._reactiveDict.get(key);
    },
    set: function PreferenceDict_set(key, newValue){
      var self = this;
      self._reactiveDict.set(key, newValue);
      self._store.set(self.userId, self._key(key), newValue);
    }
  });
  return PreferenceDict;
})();
