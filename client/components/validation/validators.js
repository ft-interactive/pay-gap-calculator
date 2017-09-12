const article = document.querySelector("body main article");
const seeSectorButtonMobileSpan = document.querySelector("button.see-all span");
const seeSectorButtonDesktopSpan = document.querySelector("button.see-more span");
const computeButtonSpan = document.querySelector("button.input-compute span");

const seeSectorButtonMobile = document.querySelector("button.see-all");
const seeSectorButtonDesktop = document.querySelector("button.see-more");
const computeButton = document.querySelector("button.input-compute");

const desktopSectorBox = document.querySelector(".sector-desktop-view");

function ageCheck(config){
  if(config.has("age")){
    article.classList.remove("no-age");
  } else {
    article.classList.add("no-age");
  }
  setButtonStyles();
}

function sectorCheck(config){
  if(config.has("sector")){
    article.classList.remove("no-sector")
  } else {
    article.classList.add("no-sector")
  }
  setButtonStyles();
}

function salaryCheck(config){
  if(salaryTrue(config)){
    article.classList.remove("no-salary")
  }
  else {
    article.classList.add("no-salary")
  }
  setButtonStyles();
}

function setButtonStyles(){
  if(article.classList.contains("no-age")){
    addWarning(seeSectorButtonMobile);
    addWarning(seeSectorButtonDesktop)
    addWarning(computeButton);
  }
  else if(article.classList.contains("no-sector")){
    addWarning(seeSectorButtonMobile );
    addWarning(seeSectorButtonDesktop);
    addWarning(computeButton);
  }
  else if(article.classList.contains("no-salary")
    && !article.classList.contains("no-sector")
    && !article.classList.contains("no-age")){
    removeWarning(seeSectorButtonMobile);
    removeWarning(seeSectorButtonDesktop);
    addWarning(computeButton);
  }
  else{
    removeWarning(seeSectorButtonMobile);
    removeWarning(seeSectorButtonDesktop);
    removeWarning(computeButton);
  }
}

function addWarning(element){
  element.classList.add("o-buttons-icon--warning");
}
function removeWarning(element){
  element.classList.remove("o-buttons-icon--warning");
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

function setAgeWarningTop(state){
  console.log("in age warning", state);
  if(!state.has("age")){
    computeButtonSpan.textContent = 'Enter an age';
    seeSectorButtonDesktopSpan.textContent = 'Enter an age';
    seeSectorButtonMobileSpan.textContent = 'Enter an age';
  }
  else{
    setNormalText();
  }
}

function setAppropriateWarnings(state){
  const isSalaryTrue = salaryTrue(state);
  if(state.has("age") && state.has("sector") && isSalaryTrue){
    setNormalText();
  }
  // no salary
  else if(state.has("age") && state.has("sector") && !isSalaryTrue){
    computeButtonSpan.textContent = 'Enter a salary';
    if(desktopSectorBox.classList.contains('expanded')){
      seeSectorButtonDesktopSpan.textContent = 'See fewer job types'
    }
    else { seeSectorButtonDesktopSpan.textContent = 'See more job types'};
    seeSectorButtonMobileSpan.textContent = 'See all job types';
  }
  // no salary no sector
  else if(state.has("age") && !state.has("sector") && !isSalaryTrue){
    console.log("this fired, as only age is correct");
    computeButtonSpan.textContent = 'Enter a sector and a salary';
    seeSectorButtonDesktopSpan.textContent = 'Enter a sector';
    seeSectorButtonMobileSpan.textContent = 'Enter a sector';
  }
  // no salary no sector no age
  else if(!state.has("age") && !state.has("sector") && !isSalaryTrue){
    computeButtonSpan.textContent = 'Enter an age, a sector and a salary';
    seeSectorButtonDesktopSpan.textContent = 'Enter an age and a sector';
    seeSectorButtonMobileSpan.textContent = 'Enter an age and a sector';
  }
  // no age
  else if(!state.has("age") && state.has("sector") && isSalaryTrue){
    computeButtonSpan.textContent = 'Enter an age';
    seeSectorButtonDesktopSpan.textContent = 'Enter an age';
    seeSectorButtonMobileSpan.textContent = 'Enter an age';
  }
  // no age no sector
  else if(!state.has("age") && !state.has("sector") && isSalaryTrue){
    computeButtonSpan.textContent = 'Enter an age and a sector';
    seeSectorButtonDesktopSpan.textContent = 'Enter an age and a sector';
    seeSectorButtonMobileSpan.textContent = 'Enter an age and a sector';
  }
  // no age no salary
  else if(!state.has("age") && state.has("sector") && !isSalaryTrue){
    computeButtonSpan.textContent = 'Enter an age and a salary';
    seeSectorButtonDesktopSpan.textContent = 'Enter an age';
    seeSectorButtonMobileSpan.textContent = 'Enter an age';
  }
  // no sector
  else if(state.has("age") && !state.has("sector") && !isSalaryTrue){
    computeButtonSpan.textContent = 'Enter a sector';
    seeSectorButtonDesktopSpan.textContent = 'Enter a sector';
    seeSectorButtonMobileSpan.textContent = 'Enter a sector';
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


export {ageCheck, sectorCheck, salaryCheck, clearEmptyWarnings, setAppropriateWarnings, setAgeWarningTop};
