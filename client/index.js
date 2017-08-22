import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculator} from './components/calculator';
import {roles, mainRoles, groupedRoles} from './components/sectors';
import {fillOutput} from './components/fillOutput';
import {generateSectorList} from './components/generateSectorList';
import {toggleSelection, formatSalaryInput} from './components/helpers';

const mainSectors = Array.from(mainRoles);
const sectors = Array.from(roles);

const article = document.querySelector("body main article");
const outputContainer = d3.select('.output-container');
const sectorDiv = d3.select('div.input-sector-list');
const genderButtons = d3.selectAll(".input-gender");
const ageInput = d3.selectAll(".input-age");
const salaryInput = d3.select(".input-salary");
const computeButton = d3.select('.input-compute');
const seeMoreButton = d3.select('.see-more');
const seeAllMobileButton = d3.select('.see-all');

const dispatch = d3.dispatch("updateState", "compute", "toggleMore", "toggleSubsection", "toggleAllMobile");

// DEFAULT CONFIG
const state = new Map;
state.set("gender", "woman");
const sectorsToShowDefault = 4;


// DEFINE EVENTS
dispatch.on("updateState", function (o){
  const key = Object.keys(o)[0];
  const value = Object.values(o)[0];
  state.set(key, value);
  console.log(`STATE IS NOW:`, state);
});

dispatch.on("compute", async function(config){
  const outputData = await calculator(config);
  fillOutput(outputContainer, outputData);
});

dispatch.on("toggleMore", function(inputsToChange, titlesToChange){
  inputsToChange.forEach( input => {
    input.classList.toggle("hidden")
  })
  titlesToChange.forEach(title => {
    title.classList.toggle("hidden");
  })
});

dispatch.on("toggleSubsection", function(selectedSector){
  const subSectorToToggle = selectedSector.nextSibling;
  selectedSector.classList.toggle("expanded");
  subSectorToToggle.classList.toggle("hidden");
});

dispatch.on("toggleAllMobile", function(){
  console.log("trigger mobile view");
});

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

salaryInput.on("keyup", function(){
  formatSalaryInput(this.value);
  dispatch.call("updateState", this, {salary: this.value} );
});

sectorDiv.on("click", function(){
  // if radio button is selected
  const selectedInput = document.querySelector(".o-forms__radio:checked");
  if(selectedInput !== null){
    dispatch.call("updateState", this, {sector: selectedInput.value} );
  }
});

sectorDiv.on('click', function(){
  const selectedSector = d3.event.target;
  dispatch.call("toggleSubsection", this, selectedSector);
})

computeButton.on("click", function(){
  dispatch.call("compute", this, state)
});

seeMoreButton.on("click", function(){
  let inputs = document.querySelectorAll('.input-sector-group');
  let titles = document.querySelectorAll('.main-category');
  const inputsToChange = [];
  inputs.forEach(function(currValue, index){
    if(index > (sectorsToShowDefault -1)){inputsToChange.push(currValue)}
  })
  const titlesToChange = [];
  titles.forEach(function(currValue, index){
    if(index > (sectorsToShowDefault -1)){titlesToChange.push(currValue)}
  })
  dispatch.call("toggleMore", this, inputsToChange, titlesToChange);
});

seeAllMobileButton.on("click", function(){
  
});


// catch screen resizes and reapply width classes, nb not an d3 element so using standard event listener
window.addEventListener("resize", resizeThrottler, false);

// apply some throttling to screen resizing events to reduce load
let resizeTimeout;
function resizeThrottler(){
  if(!resizeTimeout){
    resizeTimeout = setTimeout(() =>{
      resizeTimeout = null;
      actualResizeHandler();
    }, 66) // 15fps
  }
}
function actualResizeHandler(){
  const screenWidth = window.innerWidth;
  if(screenWidth > 400){ article.classList.add('large')}
  else { article.classList.remove('large')}
}


window.onload = function(){
  actualResizeHandler();
  generateSectorList(mainSectors, sectorDiv);
}
