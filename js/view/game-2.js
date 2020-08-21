import {GameTypeOne} from './game-1';
// import {resize} from './resize';

export class GameTypeTwo extends GameTypeOne {
  constructor(initialDataGame, initialDataGeneral) {
    super();
    // this.level = level;
    this.initialDataGame = initialDataGame;
    this.initialDataGeneral = initialDataGeneral;
  }
  
  get gameQuestionTemplate() {
    return `<p class="game__task">${this.initialDataGame.task}</p>`;
  }

  get gameTemplate() {
    // const width = this.initialDataGame.options[0].width / 1.4 + 'px';
    // const height = this.initialDataGame.options[0].height / 1.4 + 'px';

    return `<form class="game__content  game__content--wide">
        <div class="game__option" >
          <img src="${this.initialDataGame.options[0].src}" alt="Option 1" width="705px" height="455px">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
    `;
  }

  bind() {
    const formGameOne = this.element.querySelector(`.game__content`);
    formGameOne.addEventListener(`change`, (evt) => {
      const timervalue = +document.querySelector(`.game__timer`).textContent;
      this.onNext([evt.target.value, timervalue]);
    });
    
    // changeWidthHeigt(resize(frameSizeImg(`Option 1`, mainSectionGame), naturalSize(`Option 1`, mainSectionGame)), `Option 1`, mainSectionGame);
  }
  
  onNext() {}

};
