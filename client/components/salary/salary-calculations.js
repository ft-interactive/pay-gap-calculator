
// DECIDE IF SALARY IS MONTHLY OR YEARLY
function calculateSalary(salary){
  const period = document.querySelector('button.input-salary-time.selected').getAttribute('data');
  const salaryMultiplier = period === 'year' ? 1 : 12;
  const cleanSalary = salary.split(",").join("");
  return parseInt(cleanSalary) * salaryMultiplier;
};

// ITERATE HOURS WORKED COUNT BY 1


export {calculateSalary}
