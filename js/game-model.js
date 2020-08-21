import {generalData} from './game-data/structureData';
// import {levelsData} from './game-data/levels-data'

export default class GameModel {
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