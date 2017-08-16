
// HELPER FUNCTIONS
function toggleSelection(selectedEl, prevSelectedEl){
  if(prevSelectedEl){ prevSelectedEl.classList.remove("selected"); }
  selectedEl.classList.add("selected");
};

function formatSalaryInput(input){
  if(input){
    const inputBox = document.querySelector('.input-salary');
    const cleanInput = input.replace(/,/, "");
    const formattedInput = parseInt(cleanInput).toLocaleString();
    inputBox.value = formattedInput;
  }
  else{ return }
};

export{toggleSelection, formatSalaryInput};
