import * as d3 from 'd3';
import women from '../data/women.csv';

const womenPay = d3.csvParse(women);

function getSectors(){
  console.log(dataset.columns)
  return dataset.columns();
}


export {getSectors};
