'use strict';

describe('Reviews E2E Tests:', function () {
  describe('Test Reviews page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/reviews');
      expect(element.all(by.repeater('review in reviews')).count()).toEqual(0);
    });
  });
});
