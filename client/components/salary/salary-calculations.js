const maxHoursPerWeek = 70;
const minHoursPerWeek = 35;

// DECIDE IF SALARY IS MONTHLY OR YEARLY
function calculateSalary(salary){
  const period = document.querySelector('button.input-salary-time.selected').getAttribute('data');
  const salaryMultiplier = period === 'year' ? 1 : 12;
  const cleanSalary = salary.split(",").join("");
  return parseInt(cleanSalary) * salaryMultiplier;
};

// ITERATE HOURS WORKED COUNT BY 1
function updateHours(hours, buttonClickedAction){
  const hoursNum = parseInt(hours);

  if(buttonClickedAction === "+1"){
    return hoursNum >= maxHoursPerWeek ? hoursNum : hoursNum + 1;
  }
  else if(buttonClickedAction === "-1"){
    return hoursNum <= minHoursPerWeek ? hoursNum : hoursNum - 1;
  }
  else {return hoursNum };
}

// APPLY FADED CLASS TO BUTTONS WHEN MAX OR MIN HOURS IS REACHED
function fadeButton(amount, buttonContainer){
  if(amount === 70){
    buttonContainer.classList.add("plus-faded");
  }
  else if(amount === 35){
    buttonContainer.classList.add("minus-faded");
  }
  else {
    if(buttonContainer.classList.contains("plus-faded")) buttonContainer.classList.remove("plus-faded");
    if(buttonContainer.classList.contains("minus-faded")) buttonContainer.classList.remove("minus-faded");
  }
}

export {calculateSalary, updateHours, fadeButton};
