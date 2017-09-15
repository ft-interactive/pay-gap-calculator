import {nameConfigFull, nameConfigShort, nameConfigTwitter, nameConfigCategory} from './nameConfig';

function renameAndRemoveSectors(roles){
  const thinnedRoles = roles.map(roleGroup => {
    return removeMainCategoryWhereNotNeeded(roleGroup)
  });
  const renamedRoles = thinnedRoles.map(roleGroup => {
    return renameSectors(roleGroup);
  })
  return renamedRoles;
};

function removeMainCategoryWhereNotNeeded(roleGroup){
  const rolesSet = new Set(roleGroup);
  if(rolesSet.has("Administrative and secretarial occupations")) rolesSet.delete("Administrative and secretarial occupations");
  if(rolesSet.has("Caring, leisure and other service occupations")) rolesSet.delete("Caring, leisure and other service occupations");
  if(rolesSet.has("Sales and customer service occupations")) rolesSet.delete("Sales and customer service occupations");
  if(rolesSet.has("Elementary occupations")) rolesSet.delete("Elementary occupations");
  if(rolesSet.has("Professional occupations")) rolesSet.delete("Professional occupations");
  if(rolesSet.has("Managers, directors and senior officials")) rolesSet.delete("Managers, directors and senior officials");
  if(rolesSet.has("Associate professional and technical occupations")) rolesSet.delete("Associate professional and technical occupations");

  const rolesArr = Array.from(rolesSet);
  return rolesArr;
};

function renameSectors(roleGroup){
  return roleGroup.map(role => renameSectorFull(role));
};
function renameSectorCategories(roleGroup){
  return roleGroup.map(role => renameSectorMainCategory(role));
}
function renameSectorFull(role){
  const renamedRole = nameConfigFull[role];
  return {role, renamedRole};
}
function renameSectorShort(role){
  const renamedRoleShort = nameConfigShort[role];
  return {role, renamedRoleShort};
}
function renameSectorMainCategory(role){
  const renamedCategory = nameConfigCategory[role];
  return {role, renamedCategory};
}
function renameSectorTwitter(role){
  const renamedRoleTwitter = nameConfigTwitter[role];
  return {role, renamedRoleTwitter};
}

export {renameAndRemoveSectors, renameSectors, renameSectorShort, renameSectorTwitter, renameSectorCategories};
