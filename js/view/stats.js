import {calculatePoints} from "../utils/calculatePoints";
// import {resize} from './resize';
import {AbstractView} from './abstract';

export class Stats extends AbstractView {
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
};
