(function () {
  'use strict';

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
          throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error('Template is required');
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      const container = document.createElement(`div`);
      container.innerHTML = this.template;
      return container;
    }

    bind(element) {

    }

  }

  class Intro extends AbstractView {
    constructor() {
      super();
    }
    
    get template() {
      return `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;
    }

    bind() {
      const nextButton = this.element.querySelector(`.intro__asterisk`);
      nextButton.addEventListener(`click`, () => {
        this.onClick();
      });
    }
   
    onClick() {}
  }

  const showScreen = (htmlElements) => {
    const mainBlock = document.querySelector(`#main`);
    if (mainBlock.lastElementChild !== null) {
      [...mainBlock.children].forEach((element) => element.remove());
    }
    mainBlock.append(htmlElements);
  };

  class Greeting extends AbstractView {
    constructor() {
      super();
    }
    
    get template() {
      return `<section class="greeting central--blur">
    <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
    <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
  <div class="greeting__challenge">
    <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
  <p class="greeting__challenge-text">Правила игры просты:</p>
  <ul class="greeting__challenge-list">
    <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
  <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
  <li>Фотореализм обманчив и коварен.</li>
  <li>Помни, главное — смотреть очень внимательно.</li>
  </ul>
  </div>
  <button class="greeting__continue" type="button">
    <span class="visually-hidden">Продолжить</span>
    <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-right"></use>
    </svg>
    </button>
    </section>`;
    }

    bind() {
      const rightArrow = this.element.querySelector(`.greeting__continue`);
      rightArrow.addEventListener('click', () => {
        this.onClick();
      });
    }

    onClick() {}
  }

  class Rules extends AbstractView {
    constructor() {
      super();
    }
    
    get template() {
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
  </header>
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`;
    }

    get userName() {
      return this.element.querySelector("input").value;
    }

    bind() {
        const inputName = this.element.querySelector(`.rules__input`);
        const buttonFormName = this.element.querySelector(`.rules__button`);
        inputName.addEventListener(`input`, (evt) => {
          buttonFormName.disabled = evt.target.value.length < 3;
        });
        buttonFormName.addEventListener(`click`, () => {
          this.onClick();
        });
        const backButton = this.element.querySelector(".back");
        backButton.addEventListener('click', () => {
          this.onBack();
        });
    }

    onClick() {}

    onBack() {}
  }

  class Hedaer extends AbstractView {
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
  }

  // import {resize} from './resize';

  class GameTypeOne extends AbstractView {
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

  }

  // import {resize} from './resize';

  class GameTypeTwo extends GameTypeOne {
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

  }

  // import {resize} from './resize';

  class GameTypeThree extends GameTypeOne {
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

  }

  // import {levelsData} from './game-data/levels-data';

  class GameScreen {
    constructor(model) {
      this.model = model;
      this.header = new Hedaer(model.state);
      this.content = this._typeOfGame(this.model.levelsData[model.state.level], model.state);

      this.pageHtml = document.createElement(`div`);
      this.pageHtml.appendChild(this.header.element);
      this.pageHtml.appendChild(this.content.element);
    }

    get element() {
      return this.pageHtml;
    }

    _typeOfGame (level, state) {
      if (level.type === 'GameTypeOne') {
        return new GameTypeOne(level, state);
      }
      else if (level.type === 'GameTypeTwo') {
        return new GameTypeTwo(level, state);
      }
      else if (level.type === 'GameTypeThree') {
        return new GameTypeThree(level, state);
      }
      else {
        throw new Error(`Cand find this type of levels`);
      }
    }
    
    startGame() {
      this.header.onBack = () => this.onBack();
      this.content.onNext = (answers) => this.onAnswer(answers);

      this._interval = setInterval(() => {
        this.model.tick();
        if (!this.model.state.timer) {
          this.onAnswer();
        } else {
          this.updateHeader();
        }
      }, 1000);
      
    }

    stopTimer() {
      clearInterval(this._interval);
    }

    resetTimer() {
      clearInterval(this._interval);
      this.model.resetTimer();
    }

    updateHeader() {
      const header = new Hedaer(this.model.state);
      this.pageHtml.replaceChild(header.element, this.header.element);
      this.header = header;
      this.header.onBack = () => this.onBack();
    }

    changeLevel() {
      const level = this._typeOfGame(this.model.levelsData[this.model.state.level], this.model.state);
      this.pageHtml.replaceChild(level.element, this.content.element);
      this.content = level;
      this.startGame();
    }

    onAnswer(answers = [0, 0]) {
      this.model.onAnswer(answers);

      this.resetTimer();
      this.updateHeader();

      if (this.model.state.lives === -1) {
        this.onEndGame(this.model.state, this.model.userName);
        return;
      }

      if (this.model.state.level < this.model.levelsData.length) {
        this.changeLevel();
      } else {
        this.onEndGame(this.model.state, this.model.userName);
      }
    }

    bind() {}

    onBack() {}

    onEndGame() {}
  }

  const generalData = {
    level: 0,
    lives: 3,
    timer: 30,
    answers: [],
    stats: [`unknown`, `unknown`, `unknown`, `unknown`, `unknown`,
      `unknown`, `unknown`, `unknown`, `unknown`, `unknown`],
    gameIndicator: new Map([[0, `wrong`], [1, `slow`], [2, `correct`], [3, `fast`]]),
  };

  // import {levelsData} from './game-data/levels-data'

  class GameModel {
    constructor(userName, levels) {
      this.userName = userName;
      this.levelsData = levels;
      this.restart();
    }

    get state() {
      return Object.freeze(this._state);
    }

    restart() {
      this._state = generalData;
    }

    tick() {
      this._state = this._tick(this._state);
    }

    _tick(state) {
     return Object.assign({}, state, {
        timer: state.timer -1
      });
    }

    resetTimer() {
      this._state = Object.assign({}, this._state, {timer: generalData.timer});
    }

    onAnswer(answers) {
      this._state = this._saveResult(this._state, this._checkAnswer(answers, this.levelsData[this._state.level]));
      this._state = this._countLives(this._state, this._manageLifeCount(this._state.answers));
      this._state = this._changeLevel(this._state, this._state.level + 1);
      this._state = this._changeIndecator(this._state);
    }

    _manageLifeCount(answersArr) {
      return (3 - answersArr.filter((element) => element[0] === 0).length);
    }

    _checkAnswer(arrValue, levelData) {
      if (arrValue[0].src !== undefined) {
        const filteredOptions =  levelData.options.filter((element) => {
          return element.src === arrValue[0].src;
        });
        let answers = levelData.options.filter((el) => {
          return el.answer === filteredOptions[0].answer
        });
        return answers.length < 2 ? [1, arrValue[1]] : [0, arrValue[1]];
      }
      if (Array.isArray(arrValue[0])) {
        return arrValue[0].every((element, index) => {
          return element === levelData.options[index].answer;
        }) ? [1, arrValue[1]] : [0, arrValue[1]];
      }
      return arrValue[0] === levelData.options[0].answer ? [1, arrValue[1]] : [0, arrValue[1]];
    }

    _changeIndecator(initialData) {
      const stats = [].concat(initialData.stats);
      const resultGame = initialData.answers.map(function (element) {
        return element[0] * Math.ceil(element[1] / 10);
      });
      resultGame.forEach((element,index) => {
        stats[index] = initialData.gameIndicator.get(element);
      });
      return Object.assign({}, initialData, {stats});
    };

    _saveResult(game, array) {
      const answers = [...game.answers, array];
      return Object.assign({}, game, {answers});
    };
    
    
    _countLives(game, lives) {
      if (typeof lives !== `number`) {
        throw new Error(`Lives should be of type number`);
      }
      if (lives < -1) {
        throw new Error(`Lives should be negative value`);
      }
      const newGame = Object.assign({}, game, {
        lives,
      });
      return newGame;
    };
    
    _changeLevel(game, level) {
      if (typeof level !== `number`) {
        throw new Error(`Screen should be of type number`);
      }
      if (level < 0) {
        throw new Error(`Screen should be negative value`);
      }
      const newGame = Object.assign({}, game, {
        level,
      });
      return newGame;
    };
  }

  class Preloader extends AbstractView  {
    constructor() {
      super();
    }

    get template() {
      return this.preloadTemplate;
    }

    get preloadTemplate() {
      return `<section class="result firstPreload"><div class="bar">
    <div id="textLoader">Загрузка</div>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </section>`
    }

    bind() {
    }
  }

  class ModalConfrim extends AbstractView {
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
        });
      }
        
      onBack() {}

      onCancel() {}
    }

  const calculatePoints = (initialData) => {
    const LIFE_COST = 50;
    const POINTS_COST_TIME = 50;
    const wrongAnswers = initialData.answers.filter((el) => el[0] ===0);
    if (initialData.answers.length <= 10 && wrongAnswers.length === 4) {
      return -1;
    }
    const points = initialData.answers.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue[0] * Math.ceil(currentValue[1] / 10) * POINTS_COST_TIME;
    }, 0);
    return points + initialData.lives * LIFE_COST;
  };

  class Stats extends AbstractView {
    constructor() {
      super();
    }
    
    get template() {
      return this.headerStatsTemplate + this.preload;
    }

    get headerStatsTemplate() {
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
      </header>
    `;
    }


    get preload() {
      return `<section class="result"><div class="bar">
    <div id="textLoader">Загрузка</div>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </section>`
    }
    templateStats(initialDataGame, numberOfGame) {
      return `<section class="result">
      <h2 class="result__title">${calculatePoints(initialDataGame) === -1 ? `Поражение` : `Победа!`}</h2>
          <table class="result__table  ${calculatePoints(initialDataGame) === -1 ? `visually-hidden` : ``}">
            <tr>
              <td class="result__number">${numberOfGame}.</td>
              <td id="success" colspan="2">
                <ul class="stats"> 
                  ${initialDataGame.stats.map((element) => {
                    return `<li class="stats__result stats__result--${element}"></li>`;
                  }).join(`\n`)}
              </ul>
              </td>
              <td class="result__points">× 100</td>
              <td class="result__total">${initialDataGame.answers.filter((element) => element[0] === 1).length * 100}</td>
            </tr>
            <tr class="${(~initialDataGame.stats.indexOf(`fast`) ? `` : `visually-hidden`)}">
              <td></td>
              <td class="result__extra">Бонус за скорость:</td>
              <td class="result__extra">${initialDataGame.stats.filter((element) => element === `fast`).length}
              <span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">× 50</td>
              <td class="result__total">${initialDataGame.stats.filter((element) => element === `fast`).length * 50}</td>
            </tr>
            <tr class="${(3 - initialDataGame.answers.filter((element) => element[0] === 0).length) > 0 ? `` : `visually-hidden`}">
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
                <td class="result__extra"><span class="stats__result stats__result--alive"> ${3 - initialDataGame.answers.filter((element) => element[0] === 0).length}</span>
                </td>
              <td class="result__points">× 50</td>
              <td class="result__total">${(3 - initialDataGame.answers.filter((element) => element[0] === 0).length) * 50}</td>
            </tr>
            <tr class="${(~initialDataGame.stats.indexOf(`slow`) ? `` : `visually-hidden`)}">
              <td></td>
              <td class="result__extra">Штраф за медлительность:</td>
              <td class="result__extra">${initialDataGame.stats.filter((element) => element === `slow`).length}
                <span class="stats__result stats__result--slow"></span></td>
              <td class="result__points">× 50</td>
              <td class="result__total">-${initialDataGame.stats.filter((element) => element === `slow`).length * 50}</td>
            </tr>
            <tr class="">
              <td colspan="5" class="result__total result__total--final">${calculatePoints(initialDataGame)}</td>
            </tr>
          </table>
          <table class="result__table  ${calculatePoints(initialDataGame) === -1 ? `` : `visually-hidden`}">
            <tr>
              <td class="result__number">${numberOfGame}</td>
              <td id="fail">
                <ul class="stats"> 
                  ${initialDataGame.stats.map((element) => {
                    return `<li class="stats__result stats__result--${element}"></li>`;
                  }).join(`\n`)}
                </ul>
              </td>
              <td class="result__total"></td>
              <td class="result__total  result__total--final">fail</td>
            </tr>
        </table>
      </section>
    `;
    }

    showScore(data) {
      let allStats = [];
      data.forEach((element, index, array) => {
        allStats[index] = this.templateStats(element, array.length - index);
      });
      allStats = allStats.reverse().join('');
      const container = document.createElement(`div`);
      container.innerHTML = allStats;
      document.querySelector('.bar').remove();
      document.querySelector('#main').appendChild(container);
    }

    bind() {  
      this.onClick();
      const backButton = this.element.querySelector(".back");
      backButton.addEventListener('click', () => {
        this.onBack();
      });
    }

    onClick() {}
    
    onBack() {}
  }

  const newLevelsData = (arr) => {
  	const serverToLocal = (obj) => {
  		return {
  			type: (obj.type === "two-of-two") ? "GameTypeOne" : (obj.type ===
  				"tinder-like") ? "GameTypeTwo" : "GameTypeThree",
  			task: obj.question,
  			options: obj.answers.map((element) => {
  				return {
  					src: element.image.url,
  					height: element.image.height,
  					width: element.image.width,
  					answer: (element.type === "painting") ? "paint" : "photo"
  				}
  			}),
  		}
  	};
  	return arr.map((el) => serverToLocal(el));
  };

  const levelsData = [
    {
       "type":"tinder-like",
       "question":"Угадай, фото или рисунок?",
       "answers":[
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/391205/art/6303693/5373463-XJBVKDMN-7.jpg",
                "width":770,
                "height":753
             },
             "type":"painting"
          }
       ]
    },
    {
       "type":"tinder-like",
       "question":"Угадай, фото или рисунок?",
       "answers":[
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/67871/art/2170314/1228269-QRTYSOAU-7.jpg",
                "width":770,
                "height":572
             },
             "type":"photo"
          }
       ]
    },
    {
       "type":"one-of-three",
       "question":"Найдите фото среди изображений",
       "answers":[
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/1009360/art/4323415/3393255-JXZQWNAL-7.jpg",
                "width":770,
                "height":770
             },
             "type":"painting"
          },
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/763890/art/2525455/1595398-HGTSPQFD-7.jpg",
                "width":770,
                "height":507
             },
             "type":"painting"
          },
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/894537/art/4145000/3214851-LPQQVQVW-7.jpg",
                "width":770,
                "height":468
             },
             "type":"photo"
          }
       ]
    },
    {
       "type":"two-of-two",
       "question":"Угадайте для каждого изображения фото или рисунок?",
       "answers":[
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/343280/art/463039/247474-UPMXLKGA-7.jpg",
                "width":770,
                "height":1155
             },
             "type":"photo"
          },
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/403015/art/2009033/1132294-7.jpg",
                "width":770,
                "height":577
             },
             "type":"painting"
          }
       ]
    },
    {
       "type":"two-of-two",
       "question":"Угадайте для каждого изображения фото или рисунок?",
       "answers":[
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/155519/art/1263027/574904-7.jpg",
                "width":468,
                "height":458
             },
             "type":"photo"
          },
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/662192/art/3418160/2488047-LKPHZZUA-7.jpg",
                "width":468,
                "height":458
             },
             "type":"painting"
          }
       ]
    },
    {
       "type":"tinder-like",
       "question":"Угадай, фото или рисунок?",
       "answers":[
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/96892/art/4024011/3093865-TCLGSUHD-7.jpg",
                "width":705,
                "height":455
             },
             "type":"photo"
          }
       ]
    },
    {
       "type":"tinder-like",
       "question":"Угадай, фото или рисунок?",
       "answers":[
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/337392/art/3980232/3050086-YZYSSYCI-7.jpg",
                "width":705,
                "height":455
             },
             "type":"painting"
          }
       ]
    },
    {
       "type":"two-of-two",
       "question":"Угадайте для каждого изображения фото или рисунок?",
       "answers":[
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/771197/art/2564064/1633985-OSDHCNJV-7.jpg",
                "width":468,
                "height":458
             },
             "type":"photo"
          },
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/301980/art/3611358/2681244-YFXGOCAP-7.jpg",
                "width":468,
                "height":458
             },
             "type":"painting"
          }
       ]
    },
    {
       "type":"two-of-two",
       "question":"Угадайте для каждого изображения фото или рисунок?",
       "answers":[
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/1053866/art/7726222/6794345-LKEYJMFH-7.jpg",
                "width":468,
                "height":458
             },
             "type":"painting"
          },
          {
             "image":{
                "url":"https://images.saatchiart.com/saatchi/55459/art/1852781/989883-UHMCBDVU-7.jpg",
                "width":468,
                "height":458
             },
             "type":"painting"
          }
       ]
    },
    {
       "type":"tinder-like",
       "question":"Угадай, фото или рисунок?",
       "answers":[
          {
             "image":{
                "url":"https://wl-brightside.cf.tsp.li/resize/728x/png/305/0ed/413a295c6daa5148d20baf04cc.png",
                "width":705,
                "height":455
             },
             "type":"painting"
          }
       ]
    }
  ];

  class Application {
    static start() {
      const preloader = new Preloader();
      showScreen(preloader.element);
      Application.showIntro();
    }

    static showIntro() {
      const intro = new Intro();
      showScreen(intro.element);
      intro.onClick = () => {
        this.showGreeting();
      };
    }

    static showGreeting() {
      const greeting = new Greeting();
      showScreen(greeting.element);
      greeting.onClick = () => {
        this.showRules();
      };
    }

    static showRules() {
      const rules = new Rules();
      rules.onBack = () => {
        Application.showGreeting();
      };
      showScreen(rules.element);
      rules.onClick = () => {
        this.showGame(rules.userName);
      };
    }

    static showGame(userName) {
      const gameModel = new GameModel(userName, newLevelsData(levelsData));
      const gameScreen = new GameScreen(gameModel);
      gameScreen.startGame();
      showScreen(gameScreen.element);

      gameScreen.onBack = () => {
        gameScreen.stopTimer();
        const modalConfirm = new ModalConfrim();
        showScreen(modalConfirm.element);
        modalConfirm.onBack = () => {
          Application.showGreeting();
        };

        modalConfirm.onCancel = () => {
          gameScreen.startGame();
          showScreen(gameScreen.element);
        };
      };

      gameScreen.onEndGame = async (data, userName) => {
        Application.showStats(data, userName);
      };
    }

    static showStats(sentData, userName) {
      const stats = new Stats();
      showScreen(stats.element);
      let allData = [];
      let data = localStorage.getItem(userName);
      if (data) {
        [...JSON.parse(data)].forEach(element => allData.push(element));
        allData.push(sentData);
      } else {
        allData.push(sentData);
      }
      localStorage.setItem(userName, JSON.stringify(allData));
      data = localStorage.getItem(userName);
      stats.showScore(JSON.parse(data)); 

      stats.onBack = () => {
        Application.showGreeting();
      };
    }
  }

  Application.start();

}());

//# sourceMappingURL=main.js.map
