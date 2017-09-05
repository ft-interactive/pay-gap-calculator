const article = document.querySelector("body main article");

function ageCheck(config){
  if(config.has("age")){
    article.classList.remove("no-age")
  } else { article.classList.add("no-age")}
}

function sectorCheck(config){
  if(config.has("sector")){
    article.classList.remove("no-sector")
  } else { article.classList.add("no-sector")}
}

function salaryCheck(config){
  if(config.has("salary")){
    article.classList.remove("no-salary")
  } else { article.classList.add("no-salary")}
}

export {ageCheck, sectorCheck, salaryCheck};