import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculation, calculationWithoutSalary} from './components/calculator';
import {fillOutput} from './components/output/fillOutput';
import {toggleSelection, formatSalaryInput, setElementsToChange} from './components/helpers';
import {makeSectorComponents, sectorAddShowHideEvents} from './components/sectors/index';

const article = document.querySelector("body main article");
const outputContainer = d3.select('.output-container');
const sectorDivDesktop = d3.select('div.sector-desktop-view');
const sectorDivMobile = d3.select('div.sector-mobile-view');
const genderButtons = d3.selectAll(".input-gender");
const ageInput = d3.selectAll(".input-age");
const salaryTimePeriodInput = d3.select('.input-salary-time-period .o-buttons__group');
const salaryInput = d3.select(".input-salary");
const computeButton = d3.select('.input-compute');

const parentGender = document.querySelector('.input-box-gender');
const parentAge = document.querySelector('.input-box-age');
const parentSector = document.querySelector('.input-box-sector');

const genderText = document.querySelectorAll('.gender-choice');
const inverseGenderText = document.querySelectorAll('.gender-choice-inverse');
const ageText = document.querySelectorAll('.age-choice');
const sectorText = document.querySelectorAll('.sector-choice');
const payDifferentialAgeText = document.querySelectorAll('.salary-difference-age');
const payDifferentialAgeSectorText = document.querySelectorAll('.salary-difference-gender-age-sector');

const dispatch = d3.dispatch("updateState", "compute");

// DEFAULT CONFIG
const state = new Map;
state.set("gender", "woman");

// DEFINE EVENTS
dispatch.on("updateState", async function (o){
  const key = Object.keys(o)[0];
  const value = Object.values(o)[0];
  state.set(key, value);
  console.log(`STATE IS NOW:`, state);
  toggleFeedbackBoxes(state);
  if(state.has("sector") && state.has("age")){
    const medianRatio = await calculationWithoutSalary(state);
    console.log("MEDIAN RATIO IN CALC", medianRatio);
    addFeedbackText(payDifferentialAgeSectorText, medianRatio.ratio.toFixed(2));
  }
});

dispatch.on("compute", async function(config){
  const outputData = await calculation(config);
  fillOutput(outputContainer, outputData);
});

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

  if(state.has("sector")){
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

// ADD EVENT LISTENERS
genderButtons.on("click", function(){
  const prevSelectedEl = document.querySelector('.input-gender.selected')
  toggleSelection(this, prevSelectedEl);
  dispatch.call("updateState", this, {gender: this.getAttribute('data')} );
});

ageInput.on("click", function(){
  const prevSelectedEl = document.querySelector('.input-age.selected');
  toggleSelection(this, prevSelectedEl);
  dispatch.call("updateState", this, {age: this.getAttribute('data')} );
});

sectorDivDesktop.on("click", function(){
  const selectedInput = document.querySelector(".sector-desktop-view .o-forms__radio:checked");
  if(selectedInput !== null){
    dispatch.call("updateState", this, {sector: selectedInput.value} );
  }
});

sectorDivMobile.on("click", function(){
  const selectedInput = document.querySelector(".sector-mobile-view .o-forms__radio:checked");
  if(selectedInput !== null){
    dispatch.call("updateState", this, {sector: selectedInput.value} );
  }
});

salaryTimePeriodInput.on("click", function(){
  const prevSelectedEl = document.querySelector('button.input-salary-time.selected');
  const clickedEl = d3.event.target;
  toggleSelection(clickedEl, prevSelectedEl);

  const salaryInput = document.querySelector(".input-salary").value;
  if(salaryInput){
    const salary = calculateSalary(salaryInput);
    dispatch.call("updateState", this, {salary: salary});
  }
});

salaryInput.on("keyup", function(){
  const salary = calculateSalary(this.value);
  dispatch.call("updateState", this, {salary: salary});
  formatSalaryInput(this.value); // format number we show users
});

function calculateSalary(salary){
  const period = document.querySelector('button.input-salary-time.selected').getAttribute('data');
  const salaryMultiplier = period === 'year' ? 1 : 12;
  const cleanSalary = salary.split(",").join("");
  const adjustedSalary = parseInt(cleanSalary) * salaryMultiplier;
  return adjustedSalary;
};

computeButton.on("click", function(){
  dispatch.call("compute", this, state)
});

// CHECK SCREEN WIDTH & SET ARTICLE CLASS
window.addEventListener("resize", resizeThrottler, false);
// apply some throttling to screen resizing events to reduce load
let resizeTimeout;
function resizeThrottler(){
  if(!resizeTimeout){
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();
    }, 66) // 15fps
  }
}
function actualResizeHandler(){
  const screenWidth = window.innerWidth;
  if(screenWidth < 400){ article.classList.add('small')}
  else { article.classList.remove('small')}
}

window.onload = function(){
  actualResizeHandler();
  makeSectorComponents();
  sectorAddShowHideEvents();
}
