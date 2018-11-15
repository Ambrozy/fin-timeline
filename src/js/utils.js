export function addEventListenerAll (selector, eventname, callback) {
  const items = document.querySelectorAll(selector);
  items.forEach(item => {
    item.addEventListener(eventname, callback);
  });
}

export function formJson (form) {
  const formData = new FormData(form);
  const json = {};
  formData.forEach(function(value, key){
    json[key] = value;
  });
  return json;
}
