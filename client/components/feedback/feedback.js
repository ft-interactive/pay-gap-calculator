import * as d3 from 'd3';

const article = document.querySelector("body main article");
const parentGender = document.querySelector('.input-box-gender');
const parentAge = document.querySelector('.input-box-age');
const parentSector = document.querySelector('.input-box-sector');

const genderText = document.querySelectorAll('.gender-choice');
const inverseGenderText = document.querySelectorAll('.gender-choice-inverse');
const ageText = document.querySelectorAll('.age-choice');
const sectorText = document.querySelectorAll('.sector-choice');
const payDifferentialAgeText = document.querySelectorAll('.salary-difference-age');
const payDifferentialAgeSectorText = document.querySelectorAll('.salary-difference-gender-age-sector');

const computeButton = d3.select('.input-compute');


// HANDLE INSUFFICIENT DATA ERRORS
function handleCalculationWithoutSalaryResponse(response){
  const ratio = response.ratio;
  console.log("RESPONSE", response.ratio, typeof response.ratio)
  if(Number.isNaN(ratio)){
    article.classList.add('insufficient-data');
    computeButton.attr("disabled", true);
    return;
  }
  else if(typeof ratio === 'number'){
    addFeedbackText(payDifferentialAgeSectorText, formatPercentageDifference(ratio));
    article.classList.remove('insufficient-data');
    computeButton.attr("disabled", null);
  }
}

// UPDATE FEEDBACK BOX DISPLAY BASED ON STATE
function toggleFeedbackBoxes(state){
  if(state.has("gender")){
    parentGender.classList.add("selection-made");
    let inverseGender = state.get('gender') === 'woman' ? "man" : "woman";
    addFeedbackText(genderText, state.get('gender'));
    addFeedbackText(inverseGenderText, inverseGender);
  }
  else {parentGender.classList.remove("selection-made")}

  if(state.has("age")){
    parentAge.classList.add("selection-made");
    addFeedbackText(ageText, state.get("age"));
  }
   else {parentAge.classList.remove("selection-made")}

  if(state.has("sector") && state.has("age")){
    parentSector.classList.add("selection-made");
    addFeedbackText(sectorText, state.get("sector"));
  }
  else {parentSector.classList.remove("selection-made")}
}

// UPDATE FEEDBACK TEXT CONTENT BASED ON STATE
function addFeedbackText(elements, value){
  elements.forEach((element) => {
    element.textContent = value;
  })
}

// FORMAT SECTOR OUTPUT
function formatPercentageDifference(ratio){
  if(ratio < 1){
    const diff = 1 - ratio;
    const diffBasedOnLowerSalary = ((diff / ratio) * 100).toFixed(1);
    return diffBasedOnLowerSalary;
  }
}

export {handleCalculationWithoutSalaryResponse, toggleFeedbackBoxes};
