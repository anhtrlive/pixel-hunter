import {newLevelsData} from './serverToLocal';

const SERVER_URL = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter`; 
const DEFAULT_NAME = `o0`;
const APP_ID = 89788582;

export default class Loader {

  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    let levelsData = await response.json();
    levelsData = newLevelsData(levelsData);
    levelsData.forEach((element) => {
      element.options.forEach((el)=> {
        let img=new Image();
        img.src=el.src;
      })
    })

    return levelsData;
  }
  
  static async loadResults(name = DEFAULT_NAME) {
    let response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`);
    return await response.json();
  }
  static async saveResult(data, name = DEFAULT_NAME) {
    const options = {
      body: JSON.stringify(data),
      headers: {'Content-Type' : 'application/json'},
      method: 'POST'	
    };

    return await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, options);
  }
};
