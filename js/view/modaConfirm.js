import {AbstractView} from './abstract';

export class ModalConfrim extends AbstractView {
    constructor() {
      super();
    }
  
    get template() {
      return this.confrimationWindowExit;
    }
  
    get confrimationWindowExit() {
      return `<section class="modal">
      <form class="modal__inner">
        <button class="modal__close" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__button-wrapper">
          <button class="modal__btn">Ок</button>
          <button class="modal__btn">Отмена</button>
        </div>
      </form>
    </section>`;
    }
    
    bind() {
      const buttonOk = this.element.querySelector(".modal__button-wrapper > button:nth-child(1)");
      const buttonCancel = this.element.querySelector(".modal__button-wrapper > button:nth-child(2)");
      buttonOk.addEventListener('click', () => {
        this.onBack();
      });
      buttonCancel.addEventListener('click', () => {
        this.onCancel();
      })
    }
      
    onBack() {}

    onCancel() {}
  };
