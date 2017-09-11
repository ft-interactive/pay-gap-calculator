const chai = require('chai');
const { readFileSync } = require('fs');

import {calculation, calculationAgeSector, calculationAge} from `${__dirname}/../client/components/calculator.js`;
const should = chai.should();


describe('pay gap calculations', () => {

  describe('calculationAge', () => {

    it("actually works ", () => {
      console.log("the tests run");
    })

  })
})
