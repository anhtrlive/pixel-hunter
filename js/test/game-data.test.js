import {assert} from 'chai';
import {calculatePoints} from "../stringToHtml";
import {manageLifeCount} from "../stringToHtml";
import {resize} from './resize';

const resultsArrayNotEnd = [
  [1, 20],
  [0, 23],
  [1, 10],
  [0, 10]
];
const resultsArrayAllAns = [
  [1, 15],
  [1, 15],
  [1, 15],
  [1, 15],
  [1, 15],
  [1, 15],
  [1, 15],
  [1, 15],
  [1, 15],
  [1, 15]
];
const resultsArrayAllFastAns = [
  [1, 25],
  [1, 25],
  [1, 25],
  [1, 25],
  [1, 25],
  [1, 25],
  [1, 25],
  [1, 25],
  [1, 25],
  [1, 25]
];
const resultsArrayAllSlowAns = [
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5]
];
const resultsArrayAllOneMistake = [
  [0, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5]
];
const resultsArrayAllTwoMistake = [
  [1, 5],
  [0, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [0, 5],
  [1, 5],
  [1, 5]
];
const resultsArrayAllThreeMistake = [
  [0, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [1, 5],
  [0, 5],
  [0, 5],
  [1, 5],
  [1, 5],
  [1, 5]
];
const lifes = {
  zero: 0,
  one: 1,
  two: 2,
  thee: 3,
};

describe(`all`, () => {
  describe(`calculatePoints`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, calculatePoints(resultsArrayNotEnd, lifes.one));
    });
    it(`should return 1150`, () => {
      assert.equal(1150, calculatePoints(resultsArrayAllAns, 3));
    });
    it(`should return 1050`, () => {
      assert.equal(1050, calculatePoints(resultsArrayAllAns, 1));
    });
    it(`should return 1050`, () => {
      assert.equal(1050, calculatePoints(resultsArrayAllAns, 1));
    });
    it(`should return 1650`, () => {
      assert.equal(1650, calculatePoints(resultsArrayAllFastAns, 3));
    });
    it(`should return 550`, () => {
      assert.equal(550, calculatePoints(resultsArrayAllSlowAns, 1));
    });
  });
  describe(`manageLifeCount`, () => {
    it(`should return 2 if user made a mistakes once`, () => {
      assert.equal(2, manageLifeCount(resultsArrayAllOneMistake));
    });
    it(`should return 1 if user made a mistakes twice`, () => {
      assert.equal(1, manageLifeCount(resultsArrayAllTwoMistake));
    });
    it(`should return 0 iif user made a mistakes three times`, () => {
      assert.equal(0, manageLifeCount(resultsArrayAllThreeMistake));
    });
    it(`should return 3 if user has never made a mistake`, () => {
      assert.equal(3, manageLifeCount(resultsArrayAllSlowAns));
    });
  });
});

const createTestForFrame = (frame) => {
  const assertRatio = (given, expected) => {
    const actual = resize(frame, given);
    assert.deepEqual(actual, expected);
  };

  const createTest = (expected, multiplier) => {
    const given = {
      width: Math.floor(expected.width * multiplier),
      height: Math.floor(expected.height * multiplier)
    };
    it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
      assertRatio(given, expected);
    });
  };

  const sequence = (expected) => {
    createTest(expected, 8);
    createTest(expected, 7);
    createTest(expected, 5);
    createTest(expected, 4);
    createTest(expected, 3);
    createTest(expected, 2);
    createTest(expected, 1);
  };

  describe(`Resize into frame: ${frame.width}x${frame.height}`, () => {

    describe(`when "width === height"`, () => {
      sequence({width: frame.width, height: frame.height});
    });

    describe(`when "width > height"`, () => {
      sequence({width: frame.width, height: Math.floor(frame.height / 2)});
    });

    describe(`when "width < height"`, () => {
      sequence({width: Math.floor(frame.width / 2), height: frame.height});
    });

  });
};

createTestForFrame({width: 256, height: 256});
createTestForFrame({width: 256, height: 128});
createTestForFrame({width: 468, height: 458});
createTestForFrame({width: 705, height: 455});
createTestForFrame({width: 304, height: 455});
