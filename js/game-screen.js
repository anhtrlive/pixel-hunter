// import {levelsData} from './game-data/levels-data';
import {Hedaer } from './view/header';
import {GameTypeOne} from './view/game-1';
import {GameTypeTwo} from './view/game-2';
import {GameTypeThree} from './view/game-3';

export default class GameScreen {
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