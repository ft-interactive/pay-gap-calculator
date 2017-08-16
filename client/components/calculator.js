import * as d3 from 'd3';
import women from '../data/women.csv';
import men from '../data/men.csv'

const womenPay = d3.csvParse(women);
const menPay = d3.csvParse(men);

async function calculator(config) {

  let gender = config.get("gender");
  let age = config.get("age");
  let sector = config.get("sector");
  let salary = cleanSalary(config.get("salary"));

  try {
    const salarySetSelected = findSalaryRange(gender, age, sector);
    const comparisonGender = gender === 'woman' ? 'man' : 'woman';
    const salarySetComparison = findSalaryRange(comparisonGender, age, sector);
    const selectedDecile = findSalaryDecile(salary, salarySetSelected);
    console.log("DECILE", selectedDecile);
    const comparisonSalary = findComparisionDecile(selectedDecile, salarySetComparison);
    const ratio = getRatio(selectedDecile.salary, comparisonSalary);
    const swappedSalary = outputSwappedSalary(salary, ratio);
    console.log("RATIO", ratio);
    console.log("Output Salary", swappedSalary);
    return { swappedSalary, ratio, salary };

  } catch (err) {
    console.log("ERROR", err)
  };


  function cleanSalary(rawSalary){
    const cleanSalary = rawSalary.match(/\d+.\d+/);
    const noComma = cleanSalary[0].replace(",", "");
    return parseInt(noComma);
  }

  function findSalaryRange(gender, age, sector) {
    const dataSource = gender === 'woman' ? womenPay : menPay;
    const sectorSelected = dataSource.filter(row => row.role === sector);
    const ageSectorSelected = sectorSelected.filter(row => {
      const [lowestAge, highestAge] = row.age.split("-");
      return age <= highestAge && age >= lowestAge;
    })
    const selected = { ...ageSectorSelected[0]};
    return selected;
  };

  function findSalaryDecile(salary, salarySet) {
    console.log("SALARYSET", salarySet)
    const keys = Object.keys(salarySet);
    const payGroups = keys.filter(x => x.includes('percent'));

    const salarySetNum = payGroups.reduce((acc, curr, index) => {
      const salaryAsNum = parseInt(salarySet[curr]);
      acc[index] = {
        group: curr,
        salary: salaryAsNum,
      };
      return acc;
    }, []);

    const salaryMedian = {group: 'medianPay', salary: parseInt(salarySet.medianPay)};

    const salaryDecilesDesc = salarySetNum.sort((a, b) => b.salary - a.salary);
    const matchingCategory = getMatchingCategory(salary, salaryDecilesDesc, salaryMedian);
    return matchingCategory;
  };

  function getMatchingCategory(salary, salaryDeciles, median){
    for (let i = 0; i < salaryDeciles.length; i++) {
      let current = salaryDeciles[i];

      if (salary > current.salary) {
        return current;
      }
      else if(i === (salaryDeciles.length - 1)){
        if(salary < current.salary){ return current }
        else { return median }
      }
    };
  };


  function findComparisionDecile(decileToGet, salarySet) {
    const decileKey = decileToGet.group;
    return salarySet[decileKey];
  };

  function getRatio(selectedSalary, comparisionSalary) {
    return selectedSalary / comparisionSalary;
  };

  function outputSwappedSalary(salary, ratio) {
    // if ratio is > 1 user salary will be brought down, if ratio < 1, salary will go up
    return salary / ratio;
  }


};

export { calculator };
