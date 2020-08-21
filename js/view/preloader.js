import {AbstractView} from './abstract';

export class Preloader extends AbstractView  {
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
};

