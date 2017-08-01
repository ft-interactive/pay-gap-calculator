import * as d3 from 'd3';
import women from '../data/women.csv';
import men from '../data/men.csv'

const womenPay = d3.csvParse(women);
const menPay = d3.csvParse(men);

async function calculator(config) {

  const dispatch = d3.dispatch('change');
  let {
    gender,
    age,
    sector,
    salary
  } = { ...config
  };
  console.log("GENDER", gender);

  function calculate() {
    try {
      const salarySetSelected = findSalaryRange(gender, age, sector);
      const comparisonGender = gender === 'women' ? 'men' : 'women';
      const salarySetComparison = findSalaryRange(comparisonGender, age, sector);
      const selectedDecile = findSalaryDecile(salary, salarySetSelected);
      const comparisonSalary = findComparisionDecile(selectedDecile, salarySetComparison);
      const ratio = getRatio(selectedDecile.salary, comparisonSalary);

      const swappedSalary = outputSwappedSalary(salary, ratio);
      console.log(ratio);
      console.log("Output Salary", swappedSalary);

    } catch (err) {
      console.log("ERROR", err)
    };
  };

  function findSalaryRange(gender, age, sector) {
    const dataSource = gender === 'women' ? womenPay : menPay;

    const sectorSelected = dataSource.filter(row => row.role === sector);

    const ageSectorSelected = sectorSelected.filter(row => {
      const [lowestAge, highestAge] = row.age.split("-");
      return age <= highestAge && age >= lowestAge;
    })
    const selected = { ...ageSectorSelected[0]
    };
    return selected;
  };

  function findSalaryDecile(salary, salarySet) {
    let matchingCategory;
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

    const salaryDecilesDesc = salarySetNum.sort((a, b) => b.salary - a.salary);

    for (let i = 0; i < salaryDecilesDesc.length; i++) {
      if (salary > salaryDecilesDesc[i].salary) {
        matchingCategory = salaryDecilesDesc[i];
        return matchingCategory;
      }
    };
    return matchingCategory;
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


  return {
    calculate,
    updateState,
  }
};

export {
  calculator
};
