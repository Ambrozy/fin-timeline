import { addEventListenerAll } from './utils';

export function closeModals () {
  const items = document.querySelectorAll('.js-modal, .js-modal-bg');
  items.forEach(item => {
    item.classList.remove('-active');
  });
}
export function openModal (id) {
  const modal = document.querySelector(`.js-modal[data-index="${id}"]`);
  const h = modal.clientHeight;
  const topOffset = 50;
  let top = (window.screen.height - h) / 2;
  if (top > 200) {
    top = 200;
  }
  let currentTop = window.scrollY + top;
  const bodyH = Math.max(document.body.clientHeight, window.innerHeight);

  if (currentTop + h > bodyH) {
    currentTop = bodyH - h - top;
  }
  currentTop = Math.max(currentTop, 0);

  scrollTo(document.body, Math.max(currentTop - topOffset, 0), 200);
  modal.style.top = `${currentTop}px`;

  closeModals()
  const items = document.querySelectorAll(`.js-modal[data-index="${id}"], .js-modal-bg`);
  items.forEach(item => {
    item.classList.add('-active');
  });
}

addEventListenerAll('.js-modal-close, .js-modal-bg', 'click', function (e) {
  e.preventDefault();
  closeModals();
});
