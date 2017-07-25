import 'babel-polyfill';

import './styles.scss';

import * as d3 from 'd3';
import women from './data/women.csv';


async function app(){
  // Generate a set of ratios from the raw male / female data
  const womenPay = d3.csvParse(women);
  const tester = d3.csvParse('./data/test.csv');

  //use median to generate median pay gap

  console.log("hellllooooooo");

  console.log(tester);
  console.log(tester);

  console.log(womenPay.columns);
  console.log(womenPay);
  console.log(womenPay.length);
};

app();

export { app };
