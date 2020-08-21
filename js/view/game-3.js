import {GameTypeOne} from './game-1';
// import {resize} from './resize';

export class GameTypeThree extends GameTypeOne {
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
    // const width = this.initialDataGame.options[0].width / 3 + 'px';
    // const height = this.initialDataGame.options[0].height / 3 + 'px';
    // const coefficient = this.initialDataGame.options[0].height / this.initialDataGame.options[1].height;
    // const width1 = this.initialDataGame.options[1].width / coefficient + 'px';
    // const height1 = height;
    // const width2 = this.initialDataGame.options[2].width / coefficient + 'px';
    // const height2 = height;

    return `<form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.initialDataGame.options[0].src}" alt="Option 1" width="304px" height="455px">
        </div>
        <div class="game__option">
          <img src="${this.initialDataGame.options[1].src}" alt="Option 2" width="304px" height="455px">
        </div>
        <div class="game__option">
          <img src="${this.initialDataGame.options[2].src}" alt="Option 3"  width="304px" height="455px">
        </div>
      </form>
    `;
  }

  bind() {
    const formGameOne = this.element.querySelector(`.game__content`);
    formGameOne.addEventListener(`click`, (evt) => {
      const timervalue = +document.querySelector(`.game__timer`).textContent;
      this.onNext([evt.target, timervalue]);
    });
  }

  onNext() {}

};
