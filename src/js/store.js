function uniqueID () {
  function chr4(){
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
}

export function getStore () {
  try {
    return JSON.parse(localStorage.getItem('store')) || [];
  } catch (e) {
    return [];
  }
}

export function setStore (store) {
  localStorage.setItem('store', JSON.stringify(store));
  return store;
}

export function getItem (id) {
  const store = getStore();
  return store.find(item => item.id === id);
}

export function addItem (item) {
  const store = getStore();
  store.push(Object.assign(
    {id: uniqueID(), date: new Date().getTime()},
    item
  ));
  setStore(store);
}

export function removeItem (id) {
  const store = getStore();
  setStore(store.filter(innerItem => innerItem.id !== id));
}

export function assignItem (id, props) {
  const store = getStore();
  const index = store.findIndex(item => item.id === id);
  store[index] = Object.assign({}, store[index], props);
  setStore(store);
}
