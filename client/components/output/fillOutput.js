
import * as d3 from 'd3';
import {formatAgeGroup, formatPercentageDifference} from '../feedback/feedback';
import {renameSectorShort} from '../sectors/renamer';
import {generateShareMessage} from './fillShareMsg';
import {getSalaryAfterTax} from './calculateTax';

function fillOutput(element, data, state){

  const cleanSalary = formatAsCurrency(data.swappedSalary);

  const yearlyGrossDifference = formatAsCurrency(getYearlySalaryDifference(data.swappedSalary, data.salary));
  const dailyGrossDifference = formatAsCurrency(getDailySalaryDifference(data.swappedSalary, data.salary));

  const netSwappedSalary = getSalaryAfterTax(data.swappedSalary);
  const netSalary = getSalaryAfterTax(data.salary);

  const yearlyNetDifference = formatAsCurrency(getYearlySalaryDifference(netSwappedSalary, netSalary));
  const dailyNetDifference = formatAsCurrency(getDailySalaryDifference(netSwappedSalary, netSalary));

  const comparatorWord = getYearlySalaryDifference(data.swappedSalary, data.salary) > 0 ? 'more' : 'less';
  const gender = state.get("gender");
  const age = state.get("age");
  const sector = renameSectorShort(state.get("sector")).renamedRoleShort;
  const genderAdjective = getGenderAdjective(gender);
  const comparisionGender = gender === 'woman' ? 'man' : 'woman';
  const comparisonGenderAdjective = getGenderAdjective(comparisionGender);

  const percentageGroup = data.selectedDecile === 'medianPay' ? "median" : getPercentageGroup(data.selectedDecile);
  const percentageDifference = formatPercentageDifference(data.ratio);

  generateShareMessage(state, percentageDifference, percentageGroup);

  showCorrectDataBox(element, data.selectedDecile);

  const d3element = d3.select(element);
  d3element.select('.output-yearly-salary').text(`£${cleanSalary}`);

  d3element.select('.output-yearly-net-difference').text(`£${yearlyNetDifference} ${comparatorWord}`);
  d3element.select('.output-yearly-gross-difference').text(`£${yearlyGrossDifference} ${comparatorWord}`);

  d3element.select('.output-daily-net-difference').text(`£${dailyNetDifference} ${comparatorWord}`);
  d3element.select('.output-daily-gross-difference').text(`£${dailyGrossDifference} ${comparatorWord}`);

  d3element.selectAll('.gender-choice-adjective').text(`${genderAdjective}`);
  d3element.selectAll('.gender-choice-inverse-adjective').text(`${comparisonGenderAdjective}`);
  d3element.selectAll('.percentile').text(`${percentageGroup}`);
  d3element.selectAll('.percentile-pay-gap').text(`${percentageDifference}`);
};

function formatAsCurrency(number){
  const formatted = convertToPostiveNumber(number);
  return parseInt(formatted).toLocaleString();
}

function getYearlySalaryDifference(salary1, salary2){
  return (salary1 - salary2).toFixed(0);
}

function getDailySalaryDifference(salary1, salary2){
  const yearlyDifference = getYearlySalaryDifference(salary1, salary2);
  const dailyDifference = (yearlyDifference / 365).toFixed(2);
  return dailyDifference;
}

function getPercentageGroup(decile){
  const decileNum = decile.match(/\d+/)[0];
  if(decileNum < 50){
    return `bottom ${decileNum}%`;
  }
  else if(decileNum >= 50){
    return `top ${100 - decileNum}%`;
  }
}

function convertToPostiveNumber(num){
  if(num > 0) return num
  else { return -num };
}

function getGenderAdjective(gender){
  return gender === 'woman' ? 'female' : 'male';
}

function showCorrectDataBox(element, decile){
  if(decile === "medianPay"){
    element.classList.add("median");
    element.classList.remove("decile");
  }
  else {
    element.classList.add("decile");
    element.classList.remove("median");
  }
}

module.exports = {fillOutput};
