import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculator} from './components/calculator';
import {roles, mainRoles, groupedRoles} from './components/sectors';

const mainSectors = Array.from(mainRoles);
const sectors = Array.from(roles);

const outputContainer = d3.select('.output-container');
const sectorDiv = d3.select('div.input-sector-list');
const dispatch = d3.dispatch("updateState", "compute", "seeMore");


const state = new Map;
state.set("gender", "woman"); //default state set to women

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

dispatch.on("seeMore", function(length){
  clearSectorList(sectorDiv);
  generateMainSectorList(sectorDiv, length);
});

function clearSectorList(sectorList){
  sectorList.html("")
}

function generateMainSectorList(sectorList, num){
  const mainSectorsToShow = mainSectors.slice(0, num);

  console.log("NOW CHOSEN", mainSectorsToShow);

  mainSectorsToShow.forEach(sector => {
    const sectionEl = sectorList.attr("class", "o-forms")
      .append('div')
      .attr('class', 'input-sector-group')

    sectionEl.append("p")
      .attr('class', "main-category")
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
      .attr("class", "o-forms__label")
      .attr("for", subSectorJoined)
      .text(subSector)
    });
};

function fillOutput(element, data ){
  const cleanSalary = parseInt(data.swappedSalary).toLocaleString();
  const salaryDifference = data.swappedSalary - data.salary;
  const cleanWeekly = (salaryDifference / 52).toFixed(2);
  const cleanDaily = (salaryDifference / 365).toFixed(2);
  const comparatorWord = salaryDifference > 0 ? 'more' : 'less';

  element.select('.output-yearly-salary').text(`£${cleanSalary}`);
  element.select('.output-weekly-salary').text(`£${cleanWeekly} ${comparatorWord}`);
  element.select('.output-daily-salary').text(`£${cleanDaily} ${comparatorWord}`);
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

const sectorForm = d3.select('.input-box-sector .o-forms');
sectorForm.on("change", function(){
  const selectedInput = document.querySelector('input[selected=true]');
  console.log("INPUT IS", selectedInput);

  dispatch.call("updateState", this, {sector: selectedInput.value} );
})

// run compute function and generate output
const computeButton = d3.select('.input-compute');
computeButton.on("click", function(){
  dispatch.call("compute", this, state)
})

// listener on compute button
const seeMoreButton = d3.select('.see-more');
seeMoreButton.on("click", function(){
  let numberShown = document.querySelectorAll('.input-sector-group').length;
  console.log("number shown", numberShown);
  const numberToShow = (numberShown === 4) ? 9 : 4;
  console.log("is this happening?" + numberToShow);
  dispatch.call("seeMore", this, numberToShow);
})

window.onload = function(){
  generateMainSectorList(sectorDiv, 4);
}
