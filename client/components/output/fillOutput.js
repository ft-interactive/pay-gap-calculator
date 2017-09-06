
import * as d3 from 'd3';

function fillOutput(element, data){
  const cleanSalary = parseInt(data.swappedSalary).toLocaleString();
  const salaryDifference = data.swappedSalary - data.salary;

  console.log("DATA", data);
  const cleanWeekly = (salaryDifference / 52).toFixed(2);
  const cleanDaily = (salaryDifference / 365).toFixed(2);
  const comparatorWord = salaryDifference > 0 ? 'more' : 'less';
  const genderAdjective = getGenderAdjective('woman');

  showCorrectDataBox(element, data.selectedDecile);

  const d3element = d3.select(element);

  d3element.select('.output-yearly-salary').text(`£${cleanSalary}`);
  d3element.select('.output-weekly-salary').text(`£${cleanWeekly} ${comparatorWord}`);
  d3element.select('.output-daily-salary').text(`£${cleanDaily} ${comparatorWord}`);
  d3element.select('.gender-choice-adjective').text(`${genderAdjective}`);

};

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
