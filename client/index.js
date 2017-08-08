import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculator} from './components/calculator';
import {roles, mainRoles} from './components/sectors';


const state = new Map;
const outputContainer = d3.select('.output-container');
const dispatch = d3.dispatch("updateState", "compute");


//generate sector list
function generateSectorList(){
  const sectors = roles;
  const mainSectors = mainRoles;
  const sectorList = d3.select('.input-sector-list');
  sectors.forEach(sector => {
    sectorList.append('li')
    .attr('class', "input-sector")
    .attr('data', sector)
    .text(sector)
    .classed("main-category", function(){
      return mainSectors.has(sector);
    });
  });
}

// add generated list of roles
generateSectorList();

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

function fillOutput(element, data ){
  const cleanSalary = parseInt(data.swappedSalary).toLocaleString();
  console.log("TYPE", typeof cleanSalary)
  const salaryDifference = data.swappedSalary - data.salary;
  const cleanWeekly = (salaryDifference / 52).toFixed(2);
  const cleanDaily = (salaryDifference / 365).toFixed(2);

  const comparatorWord = salaryDifference > 0 ? 'more' : 'less';

  element.select('.output-yearly-salary').text(`£${cleanSalary}`);
  element.select('.output-weekly-salary').text(`£${cleanWeekly} ${comparatorWord}`);
  element.select('.output-daily-salary').text(`£${cleanDaily} ${comparatorWord}`);

}

// listener on gender buttons
const genderButtons = d3.selectAll(".input-gender");
genderButtons.on("click", function(){
  dispatch.call("updateState", this, {gender: this.getAttribute('data')} );
})

const ageInput = d3.select(".input-age");
ageInput.on("change", function(){
  dispatch.call("updateState", this, {age: this.value} );
})

const salaryInput = d3.select(".input-salary");
salaryInput.on("change", function(){
  dispatch.call("updateState", this, {salary: this.value} );
})

const sectorInput = d3.selectAll('.input-sector');
sectorInput.on("click", function(){
  const prevSelectedEl = document.querySelector('.input-sector.selected');
  if(prevSelectedEl){ prevSelectedEl.classList.remove("selected"); }
  this.classList.add("selected");
  dispatch.call("updateState", this, {sector: this.getAttribute('data')} );
})

// run compute function and generate output
const computeButton = d3.select('.input-compute');
computeButton.on("click", function(){
  dispatch.call("compute", this, state)
})
