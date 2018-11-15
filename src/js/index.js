import '../styles/index.styl';
import { getStore, getItem, addItem } from './store';
import { openModal, closeModals } from './modals';
import { addEventListenerAll, formJson } from './utils';
let sortDate = 'down';
let sortType = 'nosort';

const modalRenderFunc = (item) => {
  if (!item) {
    return;
  }

  const { fullview, addModalListeners } = require(`../events/${item.type}/index`);
  const modalContent = document.querySelector('.js-modal[data-index="view"] .js-modal-content');
  modalContent.innerHTML = fullview(item);
  addModalListeners(() => {
    const refreshItem = getItem(item.id);
    renderItems();
    modalRenderFunc(refreshItem);
  });
}

const addItemsListeners = () => {
  addEventListenerAll('.js-more', 'click', function (e) {
    e.preventDefault();
    modalRenderFunc(getItem(this.getAttribute('data-id')));
    openModal('view');
  });
}

const renderItems = () => {
  let render = getStore().sort((a, b) =>
    sortDate === 'down' ? b.date - a.date : a.date - b.date
  );
  if (sortType === 'sort') {
    const types = {};
    render.forEach((item) => {
      if (!types[item.type]) {
        types[item.type] = [];
      }
      types[item.type].push(item);
    });
    render = Object.keys(types).reduce((sum, key) => [...sum, ...types[key]], []);
  }

  render = render.map((item) => {
    const { view } = require(`../events/${item.type}/index`);
    return view(item);
  });
  const contentWrapper = document.querySelector('.js-content');
  contentWrapper.innerHTML = render.join('');
  addItemsListeners();
}

/* sorters */
const dateSorter = document.querySelector('.js-sorter-date');
dateSorter.addEventListener('click', function (e) {
  e.preventDefault();
  this.classList.toggle('-down');
  this.classList.toggle('-up');
  if (this.classList.contains('-up')) {
    sortDate = 'up';
    renderItems();
  }
  if (this.classList.contains('-down')) {
    sortDate = 'down';
    renderItems();
  }
});

const typeSorter = document.querySelector('.js-sorter-type');
typeSorter.addEventListener('click', function (e) {
  e.preventDefault();
  this.classList.toggle('-nosort');
  this.classList.toggle('-sort');
  if (this.classList.contains('-sort')) {
    sortType = 'sort';
    renderItems();
  }
  if (this.classList.contains('-nosort')) {
    sortType = 'nosort';
    renderItems();
  }
});

/* add btns */
addEventListenerAll('.js-add', 'click', function (e) {
  e.preventDefault();
  openModal(this.getAttribute('data-type'));
});
addEventListenerAll('.js-add-form', 'submit', function (e) {
  e.preventDefault();
  const json = formJson(this);
  const { validate } = require(`../events/${json.type}/index`);
  const validateResult = validate(json);
  if (validateResult !== true) {
    alert(validateResult);
    return;
  }
  addItem(json);
  closeModals();
  renderItems();
});

renderItems();
