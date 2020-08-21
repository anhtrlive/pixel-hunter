import {AbstractView} from './abstract';

export class Hedaer extends AbstractView {
  constructor(initialDataGeneral) {
    super();
    this.initialDataGeneral = initialDataGeneral;
  }
  
  get template() {
    return this.headerTemplate;
  }

  get headerTemplate() {
    return `<header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
        ${
          this.initialDataGeneral.timer < 6 ? 
          `<div class="game__timer blink">${this.initialDataGeneral.timer}</div>` : 
          `<div class="game__timer">${this.initialDataGeneral.timer}</div>`
        }
        <div class="game__lives">
        ${new Array(3)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Missed Life" width="31" height="27">`, this.initialDataGeneral.lives)
          .reverse()
          .join('')}
        </div>
      </header>
    `;
  }
  bind() {
    const backButton = this.element.querySelector(".back");
    backButton.addEventListener('click', () => {
      this.onBack();
    });
  }
    
  onBack() {}
};
