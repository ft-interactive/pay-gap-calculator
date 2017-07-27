import 'babel-polyfill';

import './styles.scss';

import * as d3 from 'd3';
import women from './data/women.csv';
import men from './data/men.csv'

const womenPay = d3.csvParse(women);
const menPay = d3.csvParse(men);

async function app() {

  function findSalaryRange(gender, sector, age){
    const dataSource = gender === 'women' ? womenPay : menPay;

    const sectorSelected = dataSource.filter( row => row.role === sector);

    const ageSectorSelected = sectorSelected.filter( row => {
      const [lowestAge, highestAge] = row.age.split("-");
      return age <= highestAge && age >= lowestAge;
    })
    const selected = {...ageSectorSelected[0]};
    return selected;
  };

  function findSalaryDecile(salary, salarySet){
    const keys = Object.keys(salarySet);
    const percentGroups = keys.filter(x => x.includes('percent'));
    console.log(percentGroups);
  }

  function getRatioForWoman(salariesWomen, salariesMen){
  };

  const salarySetWomen = findSalaryRange('women', 'Managers, directors and senior officials', 32);
  const salarySetMen = findSalaryRange('men', 'Managers, directors and senior officials', 32);

  // getRatioForWoman(salarySetWomen, salarySetMen);

  findSalaryDecile(34000, salarySetMen);

};

app();

export {
  app
};
