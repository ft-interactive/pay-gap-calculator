import * as d3 from 'd3';
import women from '../../data/women.csv';
import men from '../../data/men.csv';
import summary from '../../data/median_pay_summary.csv';
import {
  findSalaryDecile
} from './findSalaryDecile';

const womenPay = d3.csvParse(women);
const menPay = d3.csvParse(men);
const summaryPay = d3.csvParse(summary);

async function calculation(config) {
  let gender = config.get("gender");
  let age = config.get("age");
  let sector = config.get("sector");
  let salary = cleanSalary(config.get("salary"));

  try {
    const salarySetSelected = findSalarySet(gender, age, sector);
    const comparisonGender = gender === 'woman' ? 'man' : 'woman';
    const salarySetComparison = findSalarySet(comparisonGender, age, sector);
    const selectedDecile = getSalaryDecileThatWorks(salary, salarySetSelected, salarySetComparison);

    const selectedSalary = getSalaryFromDecile(selectedDecile, salarySetSelected);
    const comparisonSalary = getSalaryFromDecile(selectedDecile, salarySetComparison);

    const ratio = getRatio(selectedSalary, comparisonSalary);
    const swappedSalary = outputSwappedSalary(salary, ratio);
    return {
      swappedSalary,
      ratio,
      salary,
      selectedDecile
    };
  } catch (err) {
    console.log("ERROR", err);
  };
};

async function calculationAgeSector(config) {
  let gender = config.get("gender");
  let age = config.get("age");
  let sector = config.get("sector");

  try {
    const salarySetSelected = findSalarySet(gender, age, sector);
    const comparisonGender = gender === 'woman' ? 'man' : 'woman';
    const salarySetComparison = findSalarySet(comparisonGender, age, sector);
    const medianAgeSector = getSalaryFromDecile("medianPay", salarySetSelected);
    const comparisonMedianAgeSector = getSalaryFromDecile("medianPay", salarySetComparison);
    const ratio = getRatio(medianAgeSector, comparisonMedianAgeSector);
    return {
      ratio
    };
  } catch (err) {
    console.log("ERROR", err)
  };
};

async function calculationAge(config) {
  let gender = config.get("gender");
  let age = config.get("age");

  try {
    const salaryAgeSelected = findAgeGroup(age);
    const maleSalary = salaryAgeSelected.men;
    const femaleSalary = salaryAgeSelected.women;
    const salaryForSelectedGender = gender === 'woman' ? femaleSalary : maleSalary;
    const salaryForComparisonGender = gender === 'woman' ? maleSalary : femaleSalary;
    const ratio = getRatio(salaryForSelectedGender, salaryForComparisonGender);
    return {
      ratio
    };
  } catch (err) {
    console.log('ERROR', err);
  }
}

function findAgeGroup(age) {
  const ageSelected = summaryPay.filter(row => {
    const [lowestAge, highestAge] = row.age.split("-");
    return age <= highestAge && age >= lowestAge;
  });
  return ageSelected[0];
}

function findSalarySet(gender, age, sector) {
  const dataSource = gender === 'woman' ? womenPay : menPay;
  const sectorSelected = dataSource.filter(row => row.role === sector);
  const ageSectorSelected = sectorSelected.filter(row => {
    const [lowestAge, highestAge] = row.age.split("-");
    return age <= highestAge && age >= lowestAge;
  })
  const selected = { ...ageSectorSelected[0]
  };
  return selected;
};

function getSalaryDecileThatWorks(salary, salarySetSelected, comparisonSalarySet) {
  const selectedGenderDecile = findSalaryDecile(salary, salarySetSelected);
  const comparisonGenderDecile = findSalaryDecile(salary, comparisonSalarySet);

  if (selectedGenderDecile === null || comparisonGenderDecile === null) {
    return 'medianPay';
  }
  else if (selectedGenderDecile === comparisonGenderDecile) {
    return selectedGenderDecile;
  }
  // check that the selected decile is present in the comparison salary set
  else if (parseInt(comparisonSalarySet[selectedGenderDecile])) {
    return selectedGenderDecile;
  }
  // if not, check if the comparison decile is present in the selected salary set
  else if (parseInt(salarySetSelected[comparisonGenderDecile])) {
    return comparisonGenderDecile;
  }
  else { return 'medianPay'}
}

function getSalaryFromDecile(decileToGet, salarySet) {
  return salarySet[decileToGet];
};

function getRatio(selectedSalary, comparisionSalary) {
  return selectedSalary / comparisionSalary;
};

function outputSwappedSalary(salary, ratio) {
  // if ratio is > 1 user salary will be brought down, if ratio < 1, salary will go up
  return salary / ratio;
}

function cleanSalary(rawSalary) {
  if (typeof rawSalary === 'number') {
    return rawSalary
  } else if (typeof rawSalary === 'string') {
    const noComma = rawSalary.split(",").join("");
    const cleanSalary = noComma.match(/(\d+)(.\d+)?/);
    return parseInt(cleanSalary);
  }
}

export {
  calculation,
  calculationAgeSector,
  calculationAge
};
