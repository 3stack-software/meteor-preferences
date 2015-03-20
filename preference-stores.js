MultiPreferenceStore = (function(){
  function MultiPreferenceStore(stores){
    var self = this;
    self.stores = stores;
  }
  _.extend(MultiPreferenceStore.prototype, {
    set: function(userId, name, value){
      var self = this;
      _.each(self.stores, function(store){
        store.set(userId, name, value);
      });
    },
    get: function(userId, name){
      var self = this, value;
      _.find(self.stores, function(store){
        return (value = store.get(userId, name)) !== undefined
      });
      return value;
    }
  });
  return MultiPreferenceStore;
})();
