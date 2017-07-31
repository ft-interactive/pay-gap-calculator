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

    const salarySetNum = percentGroups.reduce((acc, curr, index) => {
      const salaryAsNum = parseInt(salarySet[curr]);
      acc[index] = {
                    group: curr,
                    salary: salaryAsNum,
                  };
      return acc;
    }, []);

    const salaryDecilesDesc = salarySetNum.sort((a, b) => {
      return b.salary > a.salary;
    });

    let matchingCategory;
    for(let i=0; i < salaryDecilesDesc.length; i++ ){
      if(salary > salaryDecilesDesc[i].salary){
        matchingCategory = salaryDecilesDesc[i];
        return matchingCategory;
      }
    };
    return matchingCategory;
  };

  function findComparisionDecile(decileToGet, salarySet){
    console.log("salary", salarySet);
    console.log("dectoget", decileToGet);
    const decileKey = decileToGet.group;
    return salarySet[decileKey];
  };

  function getRatioForWoman(){

  };

  try {
    const salarySetWomen = findSalaryRange('women', 'Managers, directors and senior officials', 32);
    const salarySetMen = findSalaryRange('men', 'Managers, directors and senior officials', 32);
    const selectedDecile = findSalaryDecile(34000, salarySetWomen);
    console.log("The decile is", selectedDecile);
    const comparisonDecile = findComparisionSalary(selectedDecile, salarySetMen )

    getRatioForWoman(salarySetWomen, salarySetMen);
  }
  catch(err){ console.log("ERROR", err) };

};

app();

export {
  app
};
