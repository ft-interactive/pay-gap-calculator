import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculator} from './components/calculator';
import {roles, mainRoles} from './components/sectors';

const mainSectors = Array.from(mainRoles);
const sectors = Array.from(roles);

const state = new Map;
const outputContainer = d3.select('.output-container');
const sectorUl = d3.select('ul.input-sector-list');
const dispatch = d3.dispatch("updateState", "compute", "seeMore");


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
  clearSectorList(sectorUl);
  generateMainSectorList(sectorUl, length);
});

function clearSectorList(sectorList){
  console.log("IN CLEAR", sectorList.firstChild);
  //this doesn't work with d3 selection
  sectorList.html("")

}

function generateMainSectorList(sectorList, num){
  const sectorsToShow = mainSectors.slice(0, num);
  console.log("sectorList", sectorList);

  sectorsToShow.forEach(sector => {
    sectorList.append('li')
    .attr('class', "input-sector main-category")
    .attr('data', sector)
    .text(sector)
  });
}


function fillOutput(element, data ){
  const cleanSalary = parseInt(data.swappedSalary).toLocaleString();
  const salaryDifference = data.swappedSalary - data.salary;
  const cleanWeekly = (salaryDifference / 52).toFixed(2);
  const cleanDaily = (salaryDifference / 365).toFixed(2);
  const comparatorWord = salaryDifference > 0 ? 'more' : 'less';

  element.select('.output-yearly-salary').text(`£${cleanSalary}`);
  element.select('.output-weekly-salary').text(`£${cleanWeekly} ${comparatorWord}`);
  element.select('.output-daily-salary').text(`£${cleanDaily} ${comparatorWord}`);
}

function toggleSelection(selectedEl, prevSelectedEl){
  if(prevSelectedEl){ prevSelectedEl.classList.remove("selected"); }
  selectedEl.classList.add("selected");
}

function formatSalaryInput(input){
  if(input){
    const inputBox = document.querySelector('.input-salary');
    const cleanInput = input.replace(/,/, "");
    const formattedInput = parseInt(cleanInput).toLocaleString();
    inputBox.value = formattedInput;
  }
  else{
    return;
  }
}

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

const sectorInput = d3.selectAll('.input-sector');
sectorInput.on("click", function(){
  const prevSelectedEl = document.querySelector('.input-sector.selected');
  toggleSelection(this, prevSelectedEl);
  dispatch.call("updateState", this, {sector: this.getAttribute('data')} );
})

// run compute function and generate output
const computeButton = d3.select('.input-compute');
computeButton.on("click", function(){
  dispatch.call("compute", this, state)
})

// listener on compute button
const seeMoreButton = d3.select('.see-more');
seeMoreButton.on("click", function(){
  let numberShown = document.querySelectorAll('li.input-sector').length;
  console.log("Number shown", numberShown);

  const numberToShow = numberShown = 4 ? 9 : 4;
  dispatch.call("seeMore", this, numberToShow);
})

window.onload = function(){
  generateMainSectorList(sectorUl, 4);
}
