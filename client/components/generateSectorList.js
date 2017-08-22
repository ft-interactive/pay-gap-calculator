import * as d3 from 'd3';
import {roles, mainRoles, groupedRoles} from './sectors';


function generateSectorList(mainSectors, sectorDiv){
  mainSectors.forEach((sector, index) => {
    const sectionEl = sectorDiv.attr("class", "o-forms")
      .append('div')
      .attr('class', 'input-sector-group')
      .classed('hidden', index > 3)

    sectionEl.append("p")
      .attr('class', "main-category")
      .classed('hidden', index > 3)
      .text(sector)

    generateSubSectorList(sectionEl, sector)
  });
};

function generateSubSectorList(sectionEl, sectorName){
  const relevantGroup = groupedRoles.filter(group => group.includes(sectorName)).pop();

  const subSectorBox = sectionEl.append('div')
                                .attr("class", "sub-section-box hidden");

  relevantGroup.forEach(subSector => {
    const subSectorJoined = subSector.toLowerCase().replace(/,/, "").split(" ").join("");
    subSectorBox.append("input")
      .attr("type", "radio")
      .attr("class", "sub-category o-forms__radio")
      .attr("value", subSector)
      .attr("id", subSectorJoined)
      .attr("name", "sector-choice")

    subSectorBox.append("label")
      .attr("class", "o-forms__label")
      .attr("for", subSectorJoined)
      .text(subSector)
    });
}

export{generateSectorList};
