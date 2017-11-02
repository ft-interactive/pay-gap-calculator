import * as d3 from 'd3';
import {renameSectorShort} from '../sectors/renamer';

const article = document.querySelector("body main article");
const parentGender = document.querySelector('.input-box-gender');
const parentAge = document.querySelector('.input-box-age');
const parentSector = document.querySelector('.input-box-sector');

const genderText = document.querySelectorAll('.gender-choice');
const inverseGenderText = document.querySelectorAll('.gender-choice-inverse');
const genderPossessiveText = document.querySelectorAll('.gender-possessive');
const ageText = document.querySelectorAll('.age-choice');
const sectorText = document.querySelectorAll('.sector-choice');
const payDifferentialAgeText = document.querySelectorAll('.salary-difference-gender-age');
const payDifferentialAgeSectorText = document.querySelectorAll('.salary-difference-gender-age-sector');

const computeButton = d3.select('.input-compute');

// UPDATE FEEDBACK BOX DISPLAY BASED ON STATE
function toggleFeedbackBoxes(state){
  if(state.has("gender")){
    parentGender.classList.add("selection-made");
    let inverseGender = state.get('gender') === 'woman' ? "man" : "woman";
    let genderPossessive = state.get('gender') === 'woman' ? "her" : "his";
    addFeedbackText(genderText, state.get('gender'));
    addFeedbackText(inverseGenderText, inverseGender);
    addFeedbackText(genderPossessiveText, genderPossessive);
  }
  else {parentGender.classList.remove("selection-made")}

  if(state.has("age")){
    parentAge.classList.add("selection-made");
    const ageGroup = formatAgeGroup(state.get("age"));
    addFeedbackText(ageText, ageGroup);
  }
   else {parentAge.classList.remove("selection-made")}

  if(state.has("sector") && state.has("age")){
    parentSector.classList.add("selection-made");
    const renamedSector = renameSectorShort(state.get("sector")).renamedRoleShort;
    addFeedbackText(sectorText, renamedSector);
  }
  else {parentSector.classList.remove("selection-made")}
}

// UPDATE FEEDBACK TEXT CONTENT BASED ON STATE
function addFeedbackText(elements, value){
  elements.forEach((element) => {
    element.textContent = value;
  })
}

// FORMAT AGE OUTPUT
function formatAgeGroup(age){
  const decade = age.split('').shift();
  return `${decade}0s`;
}

// FORMAT SECTOR OUTPUT
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


// HANDLE INSUFFICIENT DATA ERRORS
function handleCalculationAgeSector(response){
  const ratio = response.ratio;
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

function handleCalculationAge(response){
  const ratio = response.ratio;
  addFeedbackText(payDifferentialAgeText, formatPercentageDifference(ratio))
}

export {handleCalculationAgeSector, handleCalculationAge, toggleFeedbackBoxes, formatAgeGroup, formatPercentageDifference};
