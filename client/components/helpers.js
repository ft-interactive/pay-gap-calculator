
// HELPER FUNCTIONS
function toggleSelection(selectedEl, prevSelectedEl){
  if(prevSelectedEl){ prevSelectedEl.classList.remove("selected"); }
  selectedEl.classList.add("selected");
};

function setElementsToChange(elements, sectorsToShowDefault){
  let elementsToChange = [];
  elements.forEach(function(currValue, index){
    if(index > (sectorsToShowDefault -1)){elementsToChange.push(currValue)}
  })
  return elementsToChange;
}

export{toggleSelection, setElementsToChange};
