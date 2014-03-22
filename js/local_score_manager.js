window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalScoreManager() {
  this.key         = "bestScore";
  this.key_state    = "gameState";
  this.key_score   = "currentScore";
  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalScoreManager.prototype.localStorageSupported = function () {
  var testKey = "test";
  var storage = window.localStorage;

  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

LocalScoreManager.prototype.get = function () {
  return this.storage.getItem(this.key) || 0;
};

LocalScoreManager.prototype.set = function (score) {
  this.storage.setItem(this.key, score);
};

LocalScoreManager.prototype.getState = function(){
    return this.storage.getItem(this.key_state);
}

LocalScoreManager.prototype.setState = function(state){
    return this.storage.setItem(this.key_state, state);
}

LocalScoreManager.prototype.resetState= function(){
    return this.storage.removeItem(this.key_state);
}

LocalScoreManager.prototype.getScore= function(){
    return parseInt(this.storage.getItem(this.key_score));
}

LocalScoreManager.prototype.setScore = function(score){
    return this.storage.setItem(this.key_score, score);
}
