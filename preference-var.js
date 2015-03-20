
PreferenceVar = (function(){
  function PreferenceVar(name, defaultOrFn, store){
    var self = this,
        userId = Tracker.nonreactive(function(){ return Meteor.userId(); }),
        value;

    self.name = name;
    self.userId = userId;
    self._store = store;

    value = self._store.get(self.userId, self.name);
    if (value === undefined){
      self._reactiveVar = new ReactiveVar(null);
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
      self.set(value);
    } else {
      self._reactiveVar = new ReactiveVar(value);
    }
  }

  _.extend(PreferenceVar.prototype, {
    get: function PreferenceVar_get(){
      var self = this;
      return self._reactiveVar.get();
    },
    set: function PreferenceVar_set(newValue){
      var self = this;
      self._reactiveVar.set(newValue);
      self._store.set(self.userId, self.name, newValue);
    }
  });
  return PreferenceVar;
})();
