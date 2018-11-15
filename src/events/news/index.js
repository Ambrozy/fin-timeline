import { dateToStr } from '../utils';
import { assignItem } from '../../js/store';

export function view (props) {
  const readText = '<span class="news-read">Прочитано</span>';
  const unreadText = '<span>Непрочитано</span>';

  return `
    <div class="timeline-item -news ${!props.read ? '-unread' : ''} js-timeline-item" data-id="${props.id}">
      <div class="timeline-item__type">
        Новость
      </div>
      <div class="timeline-item__content">
        <div class="timeline-item__title">${props.title}</div>
      </div>
      <div class="timeline-item__footer">
        <a class="js-more" href="#${props.id}" data-id="${props.id}">Подробнее</a>
        ${props.read ? readText : unreadText}
      </div>
    </div>
  `;
}

export function fullview (props) {
  const readBtn = `<button class="link js-news-read" data-id="${props.id}">Ознакомлен</button>`;
  const readText = '<span class="news-read">Прочитано</span>';

  return `
    <div class="timeline-item__title">${props.title}</div>
    <div class="timeline-item__date">${dateToStr(props.date)}</div>
    <div class="timeline-item__text">${props.text}</div>
    <div class="timeline-item__footer">
      ${props.read ? readText : readBtn}
    </div>
  `;
}

export function validate () {
  return true;
}

export function addModalListeners (renderFunc) {
  const btn = document.querySelector('.js-news-read');
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('data-id');
      assignItem(id, {read: true});
      renderFunc();
    });
  }
}
