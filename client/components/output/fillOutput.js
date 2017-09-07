
import * as d3 from 'd3';
import {formatPercentageDifference} from '../helpers';

function fillOutput(element, data, state){
  console.log("RETURNED DATA", data);

  const cleanSalary = parseInt(data.swappedSalary).toLocaleString();
  const salaryDifference = data.swappedSalary - data.salary;
  const cleanWeekly = (salaryDifference / 52).toFixed(2);
  const cleanDaily = (salaryDifference / 365).toFixed(2);
  const comparatorWord = salaryDifference > 0 ? 'more' : 'less';

  const gender = state.get("gender");
  const age = state.get("age");
  const sector = state.get("sector");
  const genderAdjective = getGenderAdjective(gender);

  const percentageGroup = data.selectedDecile === 'medianPay' ? "median" : getPercentageGroup(data.selectedDecile);
  const percentageDifference = formatPercentageDifference(data.ratio);

  const twitterShareText = `https://twitter.com/home?status= A ${gender} in their ${age}s in a ${sector} earns ${percentageDifference} 
    Find out your personal gender pay gap: https://ig.ft.com/pay-gap-calculator/`;

  showCorrectDataBox(element, data.selectedDecile);

  const d3element = d3.select(element);
  d3element.select('.output-yearly-salary').text(`£${cleanSalary}`);
  d3element.select('.output-weekly-salary').text(`£${cleanWeekly} ${comparatorWord}`);
  d3element.select('.output-daily-salary').text(`£${cleanDaily} ${comparatorWord}`);
  d3element.selectAll('.gender-choice-adjective').text(`${genderAdjective}`);
  d3element.selectAll('.percentile').text(`${percentageGroup}%`);
  d3element.selectAll('.percentile-pay-gap').text(`${percentageDifference}`);

  element.querySelector('.output-share a').href = `${twitterShareText}`;


};

function getPercentageGroup(decile){
  const decileNum = decile.match(/\d+/)[0];
  const inTheTopPercentage = 100 - decileNum;
  return inTheTopPercentage;
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

function tweetText(text){
  return ``;
}


module.exports = {fillOutput};
