import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculator} from './components/calculator.js';
import {outputPanel} from './components/output-panel.js';


const state = new Map;

const dispatch = d3.dispatch("updateState", "compute");

dispatch.on("updateState", function (o){
  const key = Object.keys(o)[0];
  const value = Object.values(o)[0];
  state.set(key, value);
  console.log(`STATE IS NOW:`, state);
});

dispatch.on("compute", async function(config){
  const outputData = await calculator(config);
  console.log("HERE IS OUTPUT DATA", outputData);
});

// const output = outputPanel();

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
  dispatch.call("updateState", this, {sector: this.getAttribute('data')} );
})

// run compute function and generate output
const computeButton = d3.select('.input-compute');
computeButton.on("click", function(){
  dispatch.call("compute", this, state)
})

// writer on outputPanel
const outputContainer = d3.select('.output-container');

//
// const config = { gender: 'women', age: 32, sector:'Business, media and public service professionals', salary: 40000 }
//
// calculator(config);
