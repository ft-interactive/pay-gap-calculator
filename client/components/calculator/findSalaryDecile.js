
// various helper functions, that locate the salary in the pay bands

function findSalaryDecile(salary, salarySet) {
  const payBands = findAvailablePayBandsForSelected(salarySet);
  const payBandsFormatted = formatPayBands(payBands, salarySet);

  const salaryDecilesDesc = payBandsFormatted.sort((a, b) => b.salary - a.salary);
  const matchingCategory = getMatchingCategory(salary, salaryDecilesDesc);

  return matchingCategory;
};

function findAvailablePayBandsForSelected(salarySet){
  const keys = Object.keys(salarySet);
  return keys.filter(x => x.includes('percent'));
}

function formatPayBands(payBands, salarySet){
  return payBands.reduce((acc, curr, index) => {
    const salaryAsNum = parseInt(salarySet[curr]);
    acc[index] = {
      group: curr,
      salary: salaryAsNum,
    };
    return acc;
  }, []);
}

function getMatchingCategory(salary, salaryDeciles, median){
  for (let i = 0; i < salaryDeciles.length; i++) {
    let currentDecile = salaryDeciles[i];

    if (salary > currentDecile.salary) {
      return currentDecile.group;
    }
    else if(i === (salaryDeciles.length - 1)){
      if(salary < currentDecile.salary){ return currentDecile.group }
      else { return null } // if no deciles match
    }
  };
};


export {findSalaryDecile};