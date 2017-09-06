
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

function formatPercentageDifference(ratio){
  if(ratio < 1){
    const diff = 1 - ratio;
    const diffPercent = (diff * 100).toFixed(1);
    return `${diffPercent}% less`;
  }
  else {
    const diff = ratio - 1;
    const diffPercent = (diff * 100).toFixed(1);
    return `${diffPercent}% more`;
  }
}

export{toggleSelection, setElementsToChange, formatPercentageDifference};
