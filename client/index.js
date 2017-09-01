import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {calculation, calculationAgeSector, calculationAge} from './components/calculator/calculator';
import {fillOutput} from './components/output/fillOutput';
import {toggleSelection, formatSalaryInput, setElementsToChange} from './components/helpers';
import {makeSectorComponents, sectorAddShowHideEvents} from './components/sectors/index';
import {handleCalculationAgeSector, handleCalculationAge, toggleFeedbackBoxes} from './components/feedback/feedback';

if (cutsTheMustard) {
  const article = document.querySelector("body main article");
  const outputContainer = d3.select('.output-container');
  const sectorDivDesktop = d3.select('div.sector-desktop-view');
  const sectorDivMobile = d3.select('div.sector-mobile-view');
  const genderButtons = d3.selectAll(".input-gender");
  const ageInput = d3.selectAll(".input-age");
  const salaryTimePeriodInput = d3.select('.input-salary-time-period .o-buttons__group');
  const salaryInput = d3.select(".input-salary");
  const computeButton = d3.select('.input-compute');

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

    if(state.has("age")){
      const response = await calculationAge(state);
      handleCalculationAge(response);
    }

    if(state.has("age") && state.has("sector")){
      const response = await calculationAgeSector(state);
      handleCalculationAgeSector(response);
    }

    if(state.has("age") && state.has("sector") && state.has("salary")){
      article.classList.remove('inputs-incomplete');
    }
  });

  dispatch.on("compute", async function(config){
    const outputData = await calculation(config);
    handleCalculationFull(outputData);
  });

  function handleCalculationFull(outputData){
    article.classList.add("computed");
    fillOutput(outputContainer, outputData);
  }

  // ADD EVENT LISTENERS
  genderButtons.on("click", function(){
    const prevSelectedEl = document.querySelector('.input-gender.selected')
    toggleSelection(this, prevSelectedEl);
    dispatch.call("updateState", this, {gender: this.getAttribute('data')} );
  });

  ageInput.on("mousedown", function(){
    const prevSelectedEl = document.querySelector('.input-age.selected');
    toggleSelection(this, prevSelectedEl);
    dispatch.call("updateState", this, {age: this.getAttribute('data')} );
  });

  ageInput.on("touchstart", function(){
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
    // formatSalaryInput(this.value); // format number we show users
  });

  computeButton.on("click", function(){
    dispatch.call("compute", this, state)
  });

  // DECIDE IF SALARY IS MONTHLY OR YEARLY
  function calculateSalary(salary){
    const period = document.querySelector('button.input-salary-time.selected').getAttribute('data');
    const salaryMultiplier = period === 'year' ? 1 : 12;
    const cleanSalary = salary.split(",").join("");
    const adjustedSalary = parseInt(cleanSalary) * salaryMultiplier;
    return adjustedSalary;
  };

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

  actualResizeHandler();
  makeSectorComponents();
  sectorAddShowHideEvents();

  article.classList.add('calculator-ready');
}
