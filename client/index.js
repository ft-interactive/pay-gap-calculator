import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculator} from './components/calculator';
import {roles, mainRoles, groupedRoles} from './components/sectors';
import {fillOutput} from './components/fillOutput';
import {generateDesktopSectorList, generateMobileSectorList} from './components/generateSectorList';
import {toggleSelection, formatSalaryInput} from './components/helpers';

const mainSectors = Array.from(mainRoles);
const sectors = Array.from(roles);

const article = document.querySelector("body main article");
const outputContainer = d3.select('.output-container');
const sectorDivDesktop = d3.select('div.sector-desktop-view .input-sector-list');
const sectorDivMobile = d3.select('div.sector-mobile-view .input-sector-list');
const genderButtons = d3.selectAll(".input-gender");
const ageInput = d3.selectAll(".input-age");
const salaryInput = d3.select(".input-salary");
const computeButton = d3.select('.input-compute');
const seeMoreButton = d3.select('.see-more');
const showAllMobileButton = d3.select('.input-box-sector .see-all');
const hideAllMobileButton = d3.select('.input-box-sector .sector-back-button');

const dispatch = d3.dispatch("updateState", "compute", "toggleMore", "toggleSubsection", "hideAllMobile", "showAllMobile");

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
  console.log("selectedSector", selectedSector)
  const subSectorToToggle = selectedSector.nextSibling;
  selectedSector.classList.toggle("expanded");
  subSectorToToggle.classList.toggle("hidden");
});

dispatch.on("showAllMobile", function(){
  const mobView = document.querySelector('div.sector-mobile-view .o-forms');
  mobView.classList.remove("hidden");
  const article = document.querySelector('article');
  article.classList.add("sector-choice");
  const backButton = document.querySelector('div.sector-mobile-view .sector-back-button');
  backButton.classList.remove("hidden");
});

dispatch.on("hideAllMobile", function(){
  const mobView = document.querySelector('div.sector-mobile-view .o-forms')
  mobView.classList.add("hidden");
  const article = document.querySelector('article');
  article.classList.remove("sector-choice");
  const backButton = document.querySelector('div.sector-mobile-view .sector-back-button');
  backButton.classList.add("hidden");
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

sectorDivDesktop.on("click", function(){
  // if main category heading is clicked, show/hide subsection
  const clicked = d3.event.target;
  if(clicked.classList.contains("main-category")){
    const selectedSector = clicked;
    dispatch.call("toggleSubsection", this, selectedSector);
  }

  // if radio button is selected
  const selectedInput = document.querySelector(".o-forms__radio:checked");
  if(selectedInput !== null){
    dispatch.call("updateState", this, {sector: selectedInput.value} );
  }
});

sectorDivMobile.on("click", function(){
  // if radio button is selected
  const selectedInput = document.querySelector(".sector-mobile-view .o-forms__radio:checked");
  if(selectedInput !== null){
    dispatch.call("updateState", this, {sector: selectedInput.value} );
  }
});

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

showAllMobileButton.on("click", function(){
  dispatch.call("showAllMobile", this);
});

hideAllMobileButton.on("click", function(){
  dispatch.call("hideAllMobile", this);
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
  if(screenWidth < 400){ article.classList.add('small')}
  else { article.classList.remove('small')}
}

window.onload = function(){
  actualResizeHandler();
  generateDesktopSectorList(mainSectors, sectorDivDesktop);
  generateMobileSectorList(mainSectors, sectorDivMobile);
}
