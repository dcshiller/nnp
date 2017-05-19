NodeList.prototype[Symbol.iterator] = function() {
  var caller = this;
  return {
    i: 0,
    next: function() {
         return this.i < caller.length ? { value: caller[this.i++], done: false } : { done: true };
    }
  }
}