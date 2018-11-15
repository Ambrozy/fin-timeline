import { dateToStr } from '../utils';
import { removeItem } from '../../js/store';
import { closeModals } from '../../js/modals';

function generalContent (props) {
  const curArr = {
    rub: 'ք',
    dollar: '$',
    euro: '€',
  };
  const currencyStr = curArr[props.currency];
  const userLabelStr = props.sum > 0 ? 'От кого получено' : 'Кому переведено';

  return `
    <div class="timeline-item__date">${dateToStr(props.date)}</div>
    <div class="timeline-item__text ${props.sum < 0 ? '-bad' : '-good'}">
      <b>Сумма:</b> ${props.sum} ${currencyStr}
    </div>
    <div class="timeline-item__text">
      <b>${userLabelStr}:</b> ${props.user}
    </div>
  `;
}

export function view (props) {
  return `
    <div class="timeline-item -transaction js-timeline-item" data-id="${props.id}">
      <div class="timeline-item__type">
        Финансовая транзакция
      </div>
      <div class="timeline-item__content">
        ${generalContent(props)}
      </div>
      <div class="timeline-item__footer">
        <a class="js-more" href="#${props.id}" data-id="${props.id}">Подробнее</a>
      </div>
    </div>
  `;
}

export function fullview (props) {
  return `
    ${generalContent(props)}
    <div class="timeline-item__text">${props.text}</div>
    <div class="timeline-item__footer">
      <button class="btn -danger js-transaction-delete" data-id="${props.id}">Удалить</button>
    </div>
  `;
}

export function validate (props) {
  const sum = parseInt(props.sum);
  if (!sum) {
    return 'Введите сумму отличную от нуля';
  }
  return true;
}

export function addModalListeners (renderFunc) {
  const btn = document.querySelector('.js-transaction-delete');
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('data-id');
      removeItem(id);
      renderFunc();
      closeModals();
    });
  }
}
