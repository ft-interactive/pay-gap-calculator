
function fillOutput(element, data){
  const cleanSalary = parseInt(data.swappedSalary).toLocaleString();
  const salaryDifference = data.swappedSalary - data.salary;

  console.log("DATA", data);
  const cleanWeekly = (salaryDifference / 52).toFixed(2);
  const cleanDaily = (salaryDifference / 365).toFixed(2);
  const comparatorWord = salaryDifference > 0 ? 'more' : 'less';

  element.select('.output-yearly-salary').text(`£${cleanSalary}`);
  element.select('.output-weekly-salary').text(`£${cleanWeekly} ${comparatorWord}`);
  element.select('.output-daily-salary').text(`£${cleanDaily} ${comparatorWord}`);

  // element.select('.output-decile')
};

module.exports = {fillOutput};
