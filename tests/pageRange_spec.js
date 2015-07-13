import {pageRange} from '../src/pagination';

describe('pageRange', () => {
  it('should return a range of pages', () => {
    const tests = [
      {selected: 2, numPages: 20, num: 5, result: [1, 2, 3, 4, 5]},
      {selected: 1, numPages: 4, num: 5, result: [1, 2, 3, 4]},
      {selected: 3, numPages: 7, num: 5, result: [1, 2, 3, 4, 5]},
      {selected: 4, numPages: 7, num: 5, result: [2, 3, 4, 5, 6]},
      {selected: 4, numPages: 5, num: 6, result: [2, 3, 4, 5]},
      {selected: 3, numPages: 10, num: 6, result: [1, 2, 3, 4, 5, 6]}
    ];

    tests.forEach((t) => {
      expect(pageRange(t.selected, t.numPages, t.num)).toEqual(t.result);
    });
  });
});
