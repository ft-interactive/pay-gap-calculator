import * as d3 from 'd3';

import {roles, mainRoles, groupedRoles} from './sectors';
import {generateDesktopSectorList, generateMobileSectorList} from './generateSectorList';
import {toggleSelection, formatSalaryInput, setElementsToChange} from '../helpers';
import {ageCheck, sectorCheck, salaryCheck} from '../validation/validators';

const mainSectors = Array.from(mainRoles);
const sectors = Array.from(roles);
const sectorsToShowDefault = 4;

const sectorDivDesktop = d3.select('div.sector-desktop-view .input-sector-list');
const sectorDivMobile = d3.select('div.sector-mobile-view .input-sector-list');

const seeMoreButton = d3.select('.see-more');
const showAllMobileButton = d3.select('.input-box-sector .see-all');
const hideAllMobileButton = d3.select('.input-box-sector .sector-back-button');


const dispatch = d3.dispatch("toggleSectorsDesktop", "toggleSubsectionDesktop", "toggleSectorsMobile");

// DEFINE SECTOR SHOW / HIDE EVENTS
dispatch.on("toggleSectorsDesktop", function(inputsToChange, titlesToChange){
  const desktopSectorContainer = document.querySelector('.sector-desktop-view');
  inputsToChange.forEach( input => {
    input.classList.toggle("hidden")
  })
  titlesToChange.forEach(title => {
    title.classList.toggle("hidden");
  })
  desktopSectorContainer.classList.toggle("expanded");
});

dispatch.on("toggleSubsectionDesktop", function(selectedSector){
  const subSectorToToggle = selectedSector.nextSibling;
  selectedSector.classList.toggle("expanded");
  subSectorToToggle.classList.toggle("hidden");
});

dispatch.on("toggleSectorsMobile", function(){
  const article = document.querySelector('article');
  article.classList.toggle("sector-choice");
});

// ADD SHOW HIDE EVENTS
function sectorAddShowHideEvents(state){
  sectorDivDesktop.on("click", function(){
    ageCheck(state);
    if(!state.has("age")) return;
    // if main category heading is clicked, show/hide subsection
    const clicked = d3.event.target;
    if(clicked.classList.contains("main-category")){
      const selectedSector = clicked;
      dispatch.call("toggleSubsectionDesktop", this, selectedSector);
    }
  });

  seeMoreButton.on("click", function(){
    ageCheck(state);
    if(!state.has("age")) return;
    let inputs = document.querySelectorAll('.input-sector-group');
    let titles = document.querySelectorAll('.main-category');
    const inputsToChange = setElementsToChange(inputs, sectorsToShowDefault);
    const titlesToChange = setElementsToChange(titles, sectorsToShowDefault);
    dispatch.call("toggleSectorsDesktop", this, inputsToChange, titlesToChange);
  });

  // hide and show sector menu on mobile
  showAllMobileButton.on("click", function(){
    ageCheck(state);
    if(!state.has("age")) return;
    dispatch.call("toggleSectorsMobile", this);
  });

  hideAllMobileButton.on("click", function(){
    dispatch.call("toggleSectorsMobile", this);
  });
};

function makeSectorComponents(){
  generateDesktopSectorList(mainSectors, sectorDivDesktop);
  generateMobileSectorList(mainSectors, sectorDivMobile);
};

export {makeSectorComponents, sectorAddShowHideEvents};
