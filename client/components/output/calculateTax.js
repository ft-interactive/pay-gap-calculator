import TaxCalculator from 'uk-tax-calculator';

function getSalaryAfterTax(fullSalary){
  const taxer = new TaxCalculator(fullSalary);
  const netPay = taxer.getTotalNetPayPerYear();
  return netPay;
}

export {getSalaryAfterTax};
