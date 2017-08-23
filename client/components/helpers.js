
// HELPER FUNCTIONS
function toggleSelection(selectedEl, prevSelectedEl){
  if(prevSelectedEl){ prevSelectedEl.classList.remove("selected"); }
  selectedEl.classList.add("selected");
};

function formatSalaryInput(input){
  if(input){
    const inputBox = document.querySelector('.input-salary');
    const cleanInput = input.split(",").join("");
    console.log("CLEANDED", cleanInput);
    const formattedInput = parseInt(cleanInput).toLocaleString();
    inputBox.value = formattedInput;
  }
  else{ return }
};

function setElementsToChange(elements, sectorsToShowDefault){
  let elementsToChange = [];
  elements.forEach(function(currValue, index){
    if(index > (sectorsToShowDefault -1)){elementsToChange.push(currValue)}
  })
  return elementsToChange;
}

export{toggleSelection, formatSalaryInput, setElementsToChange};
