import 'babel-polyfill';
import './styles.scss';

import * as d3 from 'd3';

import {ageCheck, sectorCheck, salaryCheck, clearEmptyWarnings} from './components/validation/validators';
import {calculation, calculationAgeSector, calculationAge} from './components/calculator/calculator';
import {fillOutput} from './components/output/fillOutput';
import {calculateSalary, updateHours, fadeButton} from './components/salary/salary-calculations';
import {toggleSelection, setElementsToChange} from './components/helpers';
import {makeSectorComponents, sectorAddShowHideEvents} from './components/sectors/index';
import {handleCalculationAgeSector, handleCalculationAge, toggleFeedbackBoxes} from './components/feedback/feedback';
import {gaEventTracking} from './components/tracking/ga-custom-tracking';

if (cutsTheMustard) {
  const article = document.querySelector("body main article");
  const outputContainer = document.querySelector('.output-container');
  const sectorDivDesktop = d3.select('div.sector-desktop-view');
  const sectorDivMobile = d3.select('div.sector-mobile-view');
  const genderButtons = d3.selectAll(".input-gender");
  const ageInput = d3.selectAll(".input-age");
  const salaryTimePeriodInput = d3.select('.input-salary-time-period .o-buttons__group');
  const salaryHoursWorkedInput = d3.select('.input-salary-hours-worked .hour-input');
  const salaryInput = d3.select(".input-salary");
  const computeButton = d3.select('.input-compute');
  var updateHoursTimer;

  const mobileScreenWidth = 400;

  const dispatch = d3.dispatch("updateState", "compute");

  // DEFAULT CONFIG
  const state = new Map;
  state.set("gender", "woman");
  state.set("weeklyHours", 37);

  // DEFINE EVENTS
  dispatch.on("updateState", async function (o){
    const key = Object.keys(o)[0];
    const value = Object.values(o)[0];
    state.set(key, value);
    toggleFeedbackBoxes(state);
    clearEmptyWarnings(state);
    gaEventTracking(`PayGap-${key}`, 'PayGap-valueChange', 'PayGap Calculator');

    article.classList.remove("computed");

    if(state.has("age")){
      const response = await calculationAge(state);
      handleCalculationAge(response);
    }
    if(state.has("age") && state.has("sector")){
      const response = await calculationAgeSector(state);
      handleCalculationAgeSector(response);
    }
  });

  dispatch.on("compute", async function(config){
    ageCheck(config);
    sectorCheck(config);
    salaryCheck(config);
    const salaryValid = state.has("salary") && !Number.isNaN(state.get("salary"));

    if(state.has("age") && state.has("sector") && salaryValid){
      const outputData = await calculation(config);
      handleCalculationFull(outputData, state);
      gaEventTracking(`PayGap-CalculationButton`, 'PayGap-submitData', 'PayGap Calculator');
    }
  });

  function handleCalculationFull(outputData, state){
    article.classList.add("computed");
    fillOutput(outputContainer, outputData, state);
  }

  // ADD EVENT LISTENERS
  genderButtons.on("click", function(){
    const prevSelectedEl = document.querySelector('.input-gender.selected')
    toggleSelection(this, prevSelectedEl);
    dispatch.call("updateState", this, {gender: this.getAttribute('data')} );
  });

  // AGE
  ageInput.on("mousedown", function(){
    const prevSelectedEl = document.querySelector('.input-age.selected');
    toggleSelection(this, prevSelectedEl);
    dispatch.call("updateState", this, {age: this.getAttribute('data')} );
    ageCheck(state);
  });

  ageInput.on("touchstart", function(){
    const prevSelectedEl = document.querySelector('.input-age.selected');
    toggleSelection(this, prevSelectedEl);
    dispatch.call("updateState", this, {age: this.getAttribute('data')} );
    ageCheck(state);
  });

  // SECTORS
  sectorDivDesktop.on("click", function(){
    ageCheck(state);
    const selectedInput = document.querySelector(".sector-desktop-view .o-forms__radio:checked");
    if(selectedInput !== null){
      dispatch.call("updateState", this, {sector: selectedInput.value} );
      sectorCheck(state);
    }
  });

  sectorDivMobile.on("click", function(){
    ageCheck(state);
    const selectedInput = document.querySelector(".sector-mobile-view .o-forms__radio:checked");
    if(selectedInput !== null){
      dispatch.call("updateState", this, {sector: selectedInput.value} );
      sectorCheck(state);
    }
  });

  // SALARY
  salaryTimePeriodInput.on("click", function(){
    const prevSelectedEl = document.querySelector('button.input-salary-time.selected');
    const clickedEl = d3.event.target;
    toggleSelection(clickedEl, prevSelectedEl);
    ageCheck(state);
    sectorCheck(state);

    const salaryInput = document.querySelector(".input-salary").value;
    if(salaryInput){
      const salary = calculateSalary(salaryInput);
      dispatch.call("updateState", this, {salary: salary});
      salaryCheck(state);
    }
  });

  salaryHoursWorkedInput.on("mousedown", function(){
    startHoursWorked();
  });
  salaryHoursWorkedInput.on("touchstart", function(){
    startHoursWorked();
  });
  salaryHoursWorkedInput.on("mouseup", function(){
    stopHoursWorked();
  });
  salaryHoursWorkedInput.on("touchend", function(){
    stopHoursWorked();
  });
  salaryHoursWorkedInput.on("mouseout", function(){
    stopHoursWorked();
  });

  salaryHoursWorkedInput.on("click", function(){
    updateHoursWorked(d3.event.target);
    d3.event.preventDefault();
  });

  function startHoursWorked(){
    const element = d3.event.target;
    updateHoursTimer = setInterval(function(){updateHoursWorked(element)}, 150);
  };

  function stopHoursWorked(){
    clearInterval(updateHoursTimer);
  };

  function updateHoursWorked(element){
    const hoursInput = document.querySelector('.hours-worked');
    const buttonClickedAction = element.getAttribute('data');
    const updatedHours = updateHours(hoursInput.value, buttonClickedAction);

    // set UI to show new value
    hoursInput.value = updatedHours;

    // fade button if value too high/low
    fadeButton(updatedHours, salaryHoursWorkedInput.node());

    // update state
    dispatch.call("updateState", this, {weeklyHours: updatedHours});
  };

  salaryInput.on("keyup", function(){
    const salary = calculateSalary(this.value);
    dispatch.call("updateState", this, {salary: salary});
    ageCheck(state);
    sectorCheck(state);
    salaryCheck(state);
  });

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
    if(screenWidth < mobileScreenWidth){ article.classList.add('small')}
    else { article.classList.remove('small')}
  }

  actualResizeHandler();
  makeSectorComponents();
  sectorAddShowHideEvents(state);

  article.classList.add('calculator-ready');
}
