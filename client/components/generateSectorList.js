import * as d3 from 'd3';
import {roles, mainRoles, groupedRoles} from './sectors';


function generateMobileSectorList(mainSectors, sectorDiv){
  mainSectors.forEach((sector, index) => {
    const sectionEl = sectorDiv.attr("class", "o-forms hidden")
      .append('div')
      .attr('class', 'input-sector-group mobile');

    const subsection = generateSubSector(sectionEl, sector);
  })
  sectorDiv.selectAll('input')
    .attr("name", "sector-choice-mobile")
};

function generateDesktopSectorList(mainSectors, sectorDiv){
  mainSectors.forEach((sector, index) => {
    const sectionEl = sectorDiv.attr("class", "o-forms")
      .append('div')
      .attr('class', 'input-sector-group')
      .classed('hidden', index > 3);

    sectionEl.append("p")
      .attr('class', "main-category")
      .classed('hidden', index > 3)
      .text(sector);

    const subsection = generateSubSector(sectionEl, sector);
    sectorDiv.selectAll('.sub-section-box')
      .attr('class', 'sub-section-box hidden')
  });
};

function generateSubSector(sectionEl, sectorName){
  const relevantGroup = groupedRoles.filter(group => group.includes(sectorName)).pop();
  const subSectorBox = sectionEl.append('div').attr("class", "sub-section-box");

  const isMobile = sectionEl.classed('mobile');

  relevantGroup.forEach(subSector => {
    const subSectorJoined = subSector.toLowerCase().split(" ").join("");
    subSectorBox.append("input")
      .attr("type", "radio")
      .attr("class", "sub-category o-forms__radio")
      .attr("name", "sector-choice")
      .attr("value", subSector)
      .attr("id", d => {
        if(isMobile){ return `${subSectorJoined}-mobile`}
        return subSectorJoined;
      })

    subSectorBox.append("label")
      .attr("class", "o-forms__label")
      .attr("for", d => {
        if(isMobile){ return `${subSectorJoined}-mobile`}
        return subSectorJoined;
      })
      .text(subSector)
    });
};

export{generateDesktopSectorList, generateMobileSectorList};
