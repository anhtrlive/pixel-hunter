// import {resize} from './resize';
import {AbstractView} from './abstract';

export class GameTypeOne extends AbstractView {
  constructor(initialDataGame, initialDataGeneral) {
    super();
    this.initialDataGame = initialDataGame;
    this.initialDataGeneral = initialDataGeneral;
  }
  
  get template() {
    return  `<section class="game">${this.gameQuestionTemplate + 
      this.gameTemplate + this.statsIndicatorTemplate}</section>`;
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


    return `<form class="game__content">
      <div class="game__option">
        <img src="${this.initialDataGame.options[0].src}" alt="Option 1" width="468px" height="458px">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>s
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option" >
        <img src="${this.initialDataGame.options[1].src}" alt="Option 2" width="468px" height="458px">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  `;
  }

  get statsIndicatorTemplate () {
    return `<ul class="stats"> ${this.initialDataGeneral.stats.map((element) => {
      return `<li class="stats__result stats__result--${element}"></li>`;
      }).join(`\n`)}
      </ul>
    `;
  } 

  bind() {
    const arrInputs = [...this.element.querySelectorAll(`input`)];
    const formGameOne = this.element.querySelector(`.game__content`);
    formGameOne.addEventListener(`change`, () => {
      const checkedInputs = arrInputs.filter((it) => it.checked);
      checkedInputs.forEach((el, index, array) => array[index] = el.value);
      if (checkedInputs.length === 2) {
        const timervalue = +document.querySelector(`.game__timer`).textContent;   
        this.onNext([checkedInputs, timervalue]);
      }
    });
  }

  onNext() {}

};