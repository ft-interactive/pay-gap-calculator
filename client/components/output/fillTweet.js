import * as d3 from 'd3';
import {formatPercentageDifference} from '../helpers';

const twitterButton = document.querySelector('.output-share a');

function generateTweet(state, percentageDifference, percentile){

  const gender = state.get("gender");
  const inverseGender = gender === 'woman' ? 'man' : 'woman';
  const age = state.get("age");
  const sector = state.get("sector");
  const percentDiffClean = cleanPercentSign(percentageDifference);

  const twitterShareText = `https://twitter.com/home?status= A ${gender} in their
  ${age}s in a ${sector} role in ${percentile} earns ${percentDiffClean}.
  Find your pay gap @FT: https://ig.ft.com/pay-gap-calculator/`;

  appendTweet(twitterShareText);
};

function cleanPercentSign(percentageText){
  return percentageText.replace(/%/, '%25');
}
function appendTweet(tweet){
  twitterButton.href = `${tweet}`;
}

export {generateTweet};
