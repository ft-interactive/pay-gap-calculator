import * as d3 from 'd3';
import women from '../../data/women.csv';
import {renameAndRemoveSectors, renameSectors, renameSectorCategories} from './renamer';

const womenPay = d3.csvParse(women);

function getSectors(){

  const allRoles = womenPay.map(role => role.role);

  const mainRoles = womenPay.reduce((acc, curr) => {
    if(curr.mainGroup === 'TRUE') acc.push(curr.role)
    return acc;
  }, [])

  const rolesNoNulls = allRoles.filter(role => role.length > 0 );
  const rolesDeduped = new Set(rolesNoNulls);
  const rolesClean = removeSectorsPatchyFemaleSalaryData(rolesDeduped);

  const mainRolesDeduped = new Set(mainRoles);
  const mainRolesRenamed = renameSectorCategories(Array.from(mainRolesDeduped));

  const groupedRoles = groupSubRoles(rolesClean, mainRolesDeduped);
  const groupedRolesRenamed = renameAndRemoveSectors(groupedRoles);

  return {
    roles: rolesClean,
    mainRoles: mainRolesRenamed,
    groupedRoles: groupedRolesRenamed,
  }
}

function removeSectorsPatchyFemaleSalaryData(sectorSet){
  sectorSet.delete('Skilled metal, electrical and electronic trades');
  sectorSet.delete('Skilled agricultural and related trades');
  sectorSet.delete('Skilled construction and building trades');
  sectorSet.delete('Textiles, printing and other skilled trades');
  return sectorSet;
}

function groupSubRoles(roles, mainRoles){
  const rolesArr = Array.from(roles);
  const mainRolesArr = Array.from(mainRoles);

  return rolesArr.reduce((acc,curr,index) => {
    if(mainRolesArr.includes(curr)){
      const arr = [curr];
      acc.push(arr);
    }
    else{
      const latestObjPos = acc.length;
      acc[latestObjPos -1].push(curr);
    }
    return acc;
  }, []);
}

const roles = getSectors().roles;
const mainRoles = getSectors().mainRoles;
const groupedRoles = getSectors().groupedRoles;

export {roles, mainRoles, groupedRoles};
