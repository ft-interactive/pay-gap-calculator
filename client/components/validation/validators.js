const article = document.querySelector("body main article");
const seeSectorButtonMobileSpan = document.querySelector("button.see-all span");
const seeSectorButtonDesktopSpan = document.querySelector("button.see-more span");
const computeButtonSpan = document.querySelector("button.input-compute span");

const seeSectorButtonMobile = document.querySelector("button.see-all");
const seeSectorButtonDesktop = document.querySelector("button.see-more");
const computeButton = document.querySelector("button.input-compute");

const desktopSectorBox = document.querySelector(".sector-desktop-view");

// check whether state has any validation errors and asisgn article class
function ageCheck(config){
  if(config.has("age")){
    article.classList.remove("no-age");
  } else {
    article.classList.add("no-age");
  }
  setStyleAndText();
}

function sectorCheck(config){
  if(config.has("sector")){
    article.classList.remove("no-sector")
  } else {
    article.classList.add("no-sector")
  }
  setStyleAndText();
}

function salaryCheck(config){
  if(salaryTrue(config)){
    article.classList.remove("no-salary")
  }
  else {
    article.classList.add("no-salary")
  }
  setStyleAndText();
}

// using those classes, determine correct behaviour for each state

function setStyleAndText(){
  if(article.classList.contains("no-age")
      && !article.classList.contains("no-sector")
      && !article.classList.contains("no-salary")){
    noAgeOnly();
  }
  else if(article.classList.contains("no-sector")
    && !article.classList.contains("no-age")
    && !article.classList.contains("no-salary")){
    noSectorOnly();
  }
  else if(article.classList.contains("no-salary")
    && !article.classList.contains("no-sector")
    && !article.classList.contains("no-age")){
    noSalaryOnly()
  }
  else if(article.classList.contains("no-salary")
    && article.classList.contains("no-sector")
    && !article.classList.contains("no-age")){
    noSalaryNoSector();
  }
  else if(article.classList.contains("no-salary")
    && !article.classList.contains("no-sector")
    && article.classList.contains("no-age")){
    noSalaryNoAge();
  }
  else if(article.classList.contains("no-salary")
    && article.classList.contains("no-sector")
    && article.classList.contains("no-age")){
    noSalaryNoSectorNoAge();
  }
  else if(!article.classList.contains("no-salary")
    && article.classList.contains("no-sector")
    && article.classList.contains("no-age")){
    noSectorNoAge();
  }
  else{
    removeWarning(seeSectorButtonMobile);
    removeWarning(seeSectorButtonDesktop);
    removeWarning(computeButton);
    setNormalText();
  }
}

// different dom configurations for each state
function noAgeOnly(){
  addWarning(seeSectorButtonMobile);
  addWarning(seeSectorButtonDesktop)
  addWarning(computeButton);
  computeButtonSpan.textContent = 'Enter an age';
  seeSectorButtonDesktopSpan.textContent = 'Enter an age';
  seeSectorButtonMobileSpan.textContent = 'Enter an age';
}

function noSectorOnly(){
  addWarning(seeSectorButtonMobile );
  addWarning(seeSectorButtonDesktop);
  addWarning(computeButton);
  computeButtonSpan.textContent = 'Enter a sector';
  seeSectorButtonDesktopSpan.textContent = 'Enter a sector';
  seeSectorButtonMobileSpan.textContent = 'Enter a sector';
}

function noSalaryOnly(){
  console.log("the no salary ony button fired");
  removeWarning(seeSectorButtonMobile);
  removeWarning(seeSectorButtonDesktop);
  addWarning(computeButton);
  computeButtonSpan.textContent = 'Enter a salary';
  if(desktopSectorBox.classList.contains('expanded')){
    seeSectorButtonDesktopSpan.textContent = 'See fewer job types'
  }
  else { seeSectorButtonDesktopSpan.textContent = 'See more job types'};
  seeSectorButtonMobileSpan.textContent = 'See all job types';
}

function noSalaryNoSector(){
  addWarning(seeSectorButtonMobile);
  addWarning(seeSectorButtonDesktop);
  addWarning(computeButton);
  computeButtonSpan.textContent = 'Enter a sector and a salary';
  seeSectorButtonDesktopSpan.textContent = 'Enter a sector';
  seeSectorButtonMobileSpan.textContent = 'Enter a sector';
}

function noSalaryNoAge(){
  addWarning(seeSectorButtonMobile);
  addWarning(seeSectorButtonDesktop);
  addWarning(computeButton);
  computeButtonSpan.textContent = 'Enter an age and a salary';
  seeSectorButtonDesktopSpan.textContent = 'Enter an age';
  seeSectorButtonMobileSpan.textContent = 'Enter an age';
}
function noSalaryNoSectorNoAge(){
  addWarning(seeSectorButtonMobile );
  addWarning(seeSectorButtonDesktop);
  addWarning(computeButton);
  computeButtonSpan.textContent = 'Enter an age, a sector and a salary';
  seeSectorButtonDesktopSpan.textContent = 'Enter an age and a sector';
  seeSectorButtonMobileSpan.textContent = 'Enter an age and a sector';
}
function noSectorNoAge(){
  addWarning(seeSectorButtonMobile );
  addWarning(seeSectorButtonDesktop);
  addWarning(computeButton);
  computeButtonSpan.textContent = 'Enter an age and a sector';
  seeSectorButtonDesktopSpan.textContent = 'Enter an age and a sector';
  seeSectorButtonMobileSpan.textContent = 'Enter an age and a sector';
}

// helper methods;
function addWarning(element){
  element.classList.add("o-buttons-icon--warning");
  element.classList.add("o-buttons-icon");
}
function removeWarning(element){
  element.classList.remove("o-buttons-icon--warning");
  element.classList.remove("o-buttons-icon");
}

function clearEmptyWarnings(state){
  if(state.has("salary")){
    article.classList.remove("no-salary");
  }
  if(state.has("sector")){
    article.classList.remove("no-sector");
  }
  if(state.has("age")){
    article.classList.remove("no-age")
  }
}

function salaryTrue(config){
  if(config.has("salary")){
    if(!Number.isNaN(config.get("salary"))){
      return true;
    }
    return false;
  }
}

function setNormalText(){
  if(desktopSectorBox.classList.contains('expanded')){
    seeSectorButtonDesktopSpan.textContent = 'See fewer job types'
  }
  else { seeSectorButtonDesktopSpan.textContent = 'See more job types'};
  seeSectorButtonMobileSpan.textContent = 'See job types';
  computeButtonSpan.textContent = 'Show pay gap';
}

export {ageCheck, sectorCheck, salaryCheck, clearEmptyWarnings};
