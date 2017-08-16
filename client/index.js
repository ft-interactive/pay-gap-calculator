import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculator} from './components/calculator';
import {roles, mainRoles, groupedRoles} from './components/sectors';
import {fillOutput} from './components/fillOutput';

const mainSectors = Array.from(mainRoles);
const sectors = Array.from(roles);

const outputContainer = d3.select('.output-container');
const sectorDiv = d3.select('div.input-sector-list');
const dispatch = d3.dispatch("updateState", "compute", "toggleMore");

const state = new Map;
state.set("gender", "woman"); //default state set to women
const sectorsToShowDefault = 4;

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

function generateMainSectorList(mainSectors, sectorDiv){

  mainSectors.forEach((sector, index) => {
    const sectionEl = sectorDiv.attr("class", "o-forms")
      .append('div')
      .attr('class', 'input-sector-group')
      .classed('hidden', index > 3)

    sectionEl.append("p")
      .attr('class', "main-category")
      .classed('hidden', index > 3)
      .attr('data', sector)
      .text(sector)

    generateSubSectorList(sectionEl, sector)
  });
};

function generateSubSectorList(sectionEl, sectorName){
  const relevantGroup = groupedRoles.filter(group => group.includes(sectorName)).pop();

  relevantGroup.forEach(subSector => {
    const subSectorJoined = subSector.toLowerCase().replace(/,/, "").split(" ").join("");
    sectionEl.append("input")
      .attr("type", "radio")
      .attr("class", "input-sector sub-category o-forms__radio")
      .attr("value", subSector)
      .attr("id", subSectorJoined)
      .attr("name", "sector-choice")

    sectionEl.append("label")
      .attr("class", "input-sector o-forms__label")
      .attr("for", subSectorJoined)
      .text(subSector)
    });
};

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

// listener on gender buttons
const genderButtons = d3.selectAll(".input-gender");
genderButtons.on("click", function(){
  const prevSelectedEl = document.querySelector('.input-gender.selected')
  toggleSelection(this, prevSelectedEl);
  dispatch.call("updateState", this, {gender: this.getAttribute('data')} );
})

const ageInput = d3.selectAll(".input-age");
ageInput.on("click", function(){
  const prevSelectedEl = document.querySelector('.input-age.selected');
  toggleSelection(this, prevSelectedEl);
  dispatch.call("updateState", this, {age: this.getAttribute('data')} );
})

const salaryInput = d3.select(".input-salary");
salaryInput.on("keyup", function(){
  formatSalaryInput(this.value);
  dispatch.call("updateState", this, {salary: this.value} );
})

const sectorChoices = d3.select(".input-sector");
sectorChoices.on("click", function(){
  console.log("this runs");
  // const selectedInput = document.querySelector('input[selected=true]');
  // console.log("INPUT IS", selectedInput);
  // dispatch.call("updateState", this, {sector: selectedInput.value} );
})

// run compute function and generate output
const computeButton = d3.select('.input-compute');
computeButton.on("click", function(){
  dispatch.call("compute", this, state)
})

// listener on see more button
const seeMoreButton = d3.select('.see-more');
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


window.onload = function(){
  generateMainSectorList(mainSectors, sectorDiv);
}
