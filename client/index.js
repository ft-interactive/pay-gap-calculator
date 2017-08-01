import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculator} from './components/calculator.js';
import {outputPanel} from './components/output-panel.js';

const dispatch = d3.dispatch("updateState", "compute");

console.log("DISPATCH", dispatch);

// const state = {
//                 gender: '',
//                 age: 0,
//                 sector:'',
//                 salary: 0
//               };

const selectedData = new Map;
console.log

const output = outputPanel();


// listener on gender buttons
const genderButtons = d3.selectAll(".input-gender");
genderButtons.on("click", function(){
  console.log(`This button was clicked ${this.getAttribute('data')}`)
  dispatch.call("updateState", {gender: this.getAttribute('data')} );
})

const ageInput = d3.select(".input-age");
ageInput.on("change", function(){
  console.log(`This value changed ${this.value}`);
})

const salaryInput = d3.select(".input-salary");
salaryInput.on("change", function(){
  console.log(`This value changed ${this.value}`)
})

const sectorInput = d3.selectAll('.input-sector');
sectorInput.on("click", function(){
  console.log(`This value was selected ${this.getAttribute('data')}`);
})

// run compute function and generate output
const computeButton = d3.select('.input-compute');
computeButton.on("click", function(){
  calculator(state);
})

// writer on outputPanel
const outputContainer = d3.select('.output-container');


const config = { gender: 'women', age: 32, sector:'Business, media and public service professionals', salary: 40000 }

calculator(config);
