const article = document.querySelector("body main article");
const seeSectorButtonMobile = document.querySelector("button.see-all span");
const seeSectorButtonDesktop = document.querySelector("button.see-more span");
const computeButton = document.querySelector("button.input-compute span");
const desktopSectorBox = document.querySelector(".sector-desktop-view");

function ageCheck(config){
  if(config.has("age")){
    article.classList.remove("no-age")
  } else {
    article.classList.add("no-age");
  }
}

function sectorCheck(config){
  if(config.has("sector")){
    article.classList.remove("no-sector")
  } else {
    article.classList.add("no-sector")
  }
}

function salaryCheck(config){
  if(salaryTrue(config)){
    article.classList.remove("no-salary")
  }
  else {
    article.classList.add("no-salary")
  }
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
    computeButton.textContent = 'Enter an age';
    seeSectorButtonDesktop.textContent = 'Enter an age';
    seeSectorButtonMobile.textContent = 'Enter an age';
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
    computeButton.textContent = 'Enter a salary';
    if(desktopSectorBox.classList.contains('expanded')){
      seeSectorButtonDesktop.textContent = 'See fewer job types'
    }
    else { seeSectorButtonDesktop.textContent = 'See more job types'};
    seeSectorButtonMobile.textContent = 'See all job types';
  }
  // no salary no sector
  else if(state.has("age") && !state.has("sector") && !isSalaryTrue){
    console.log("this fired, as only age is correct");
    computeButton.textContent = 'Enter a sector and a salary';
    seeSectorButtonDesktop.textContent = 'Enter a sector';
    seeSectorButtonMobile.textContent = 'Enter a sector';
  }
  // no salary no sector no age
  else if(!state.has("age") && !state.has("sector") && !isSalaryTrue){
    computeButton.textContent = 'Enter an age, a sector and a salary';
    seeSectorButtonDesktop.textContent = 'Enter an age and a sector';
    seeSectorButtonMobile.textContent = 'Enter an age and a sector';
  }
  // no age
  else if(!state.has("age") && state.has("sector") && isSalaryTrue){
    computeButton.textContent = 'Enter an age';
    seeSectorButtonDesktop.textContent = 'Enter an age';
    seeSectorButtonMobile.textContent = 'Enter an age';
  }
  // no age no sector
  else if(!state.has("age") && !state.has("sector") && isSalaryTrue){
    computeButton.textContent = 'Enter an age and a sector';
    seeSectorButtonDesktop.textContent = 'Enter an age and a sector';
    seeSectorButtonMobile.textContent = 'Enter an age and a sector';
  }
  // no age no salary
  else if(!state.has("age") && state.has("sector") && !isSalaryTrue){
    computeButton.textContent = 'Enter an age and a salary';
    seeSectorButtonDesktop.textContent = 'Enter an age';
    seeSectorButtonMobile.textContent = 'Enter an age';
  }
  // no sector
  else if(state.has("age") && !state.has("sector") && !isSalaryTrue){
    computeButton.textContent = 'Enter a sector';
    seeSectorButtonDesktop.textContent = 'Enter a sector';
    seeSectorButtonMobile.textContent = 'Enter a sector';
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
    seeSectorButtonDesktop.textContent = 'See fewer job types'
  }
  else { seeSectorButtonDesktop.textContent = 'See more job types'};
  seeSectorButtonMobile.textContent = 'See job types';
  computeButton.textContent = 'Show pay gap';
}


export {ageCheck, sectorCheck, salaryCheck, clearEmptyWarnings, setAppropriateWarnings, setAgeWarningTop};
