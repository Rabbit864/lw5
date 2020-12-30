export function createObservableArray(array, callback) {
  return new Proxy(array, {
    apply(target, thisArg) {
      callback();
      return thisArg[target].apply(this, argumentList);
    },
    deleteProperty() {
      callback();
      return true;
    },
    set(target, property, value) {
      target[property] = value;
      callback();
      return true;
    }
  });
}

export function createObservableObject(array, callback) {
  return new Proxy(array, {
    set(target, property, value) {
      target[property] = value;
      if (property === 'count' || property === 'priceForOne') {
        callback();
      }
      return true;
    }
  });
}
