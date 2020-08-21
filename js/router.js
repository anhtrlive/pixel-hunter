import {Intro} from './view/intro';
import {showScreen} from './utils/showScreen';
import {Greeting} from './view/greeting';
import {Rules} from './view/rules';
import GameScreen from './game-screen';
import GameModel from './game-model';
import {Preloader} from './view/preloader'
import {ModalConfrim} from './view/modaConfirm';
import {Stats} from './view/stats';
import Loader from './utils/dataLoadToServer';
import {levelsData} from './game-data/levels-data';
import {newLevelsData} from './utils/serverToLocal';

export default class Application {
  static start() {
    const preloader = new Preloader();
    showScreen(preloader.element);
    Application.showIntro();
  }

  static showIntro() {
    const intro = new Intro();
    showScreen(intro.element)
    intro.onClick = () => {
      this.showGreeting();
    }
  }

  static showGreeting() {
    const greeting = new Greeting();
    showScreen(greeting.element)
    greeting.onClick = () => {
      this.showRules();
    }
  }

  static showRules() {
    const rules = new Rules();
    rules.onBack = () => {
      Application.showGreeting();
    };
    showScreen(rules.element)
    rules.onClick = () => {
      this.showGame(rules.userName);
    }
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
};
