import * as d3 from 'd3';
import {renameSectorTwitter} from '../sectors/renamer';
import {formatAgeGroup} from '../feedback/feedback';

const pageUrl = `https://ig.ft.com/pay-gap-calculator`;
const twitterButton = document.querySelector('.output-share a');

function generateTweet(state, percentageDifference, percentile){

  const gender = state.get("gender");
  const inverseGender = gender === 'woman' ? 'man' : 'woman';
  const genderAdjective = gender === 'woman' ? 'female' : 'male';
  const genderPossessive = gender === 'woman' ? 'her' : 'his';
  const age = formatAgeGroup(state.get("age"));
  const sector = state.get("sector");
  const sectorTwitter = renameSectorTwitter(sector).renamedRoleTwitter;
  const percentDiffClean = cleanPercentSign(percentageDifference);
  const percentGroupClean = cleanPercentSign(percentile);

  const tweetIntro = formatIntroForTwitter(gender, percentGroupClean, sectorTwitter);

  const twitterShareText = `https://twitter.com/home?status=${tweetIntro} in ${genderPossessive} ${age} earns ${percentDiffClean} than a ${inverseGender}. Get your gap @FT https://ig.ft.com/pay-gap-calculator/`;

  appendTweet(twitterShareText);
};

function cleanPercentSign(text){
  console.log(text);
  return text.replace(/%/, '%25');
}
function appendTweet(tweet){
  twitterButton.href = `${tweet}`;
}
function formatIntroForTwitter(gender, percentGroupClean, sector){
  if(percentGroupClean === 'median'){
    return `An average ${gender} in a ${sector} role`;
  }
  else{
    return `A ${gender} in the ${percentGroupClean} of ${sector}`;
  }
}

export {generateTweet};