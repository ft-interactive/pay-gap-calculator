import * as d3 from 'd3';

function makeOutputPanel(){

  let state;

  function outputPanel(){
    console.log("here is the output panel");
  }

  outputPanel.updateState = (x) => {
    state = x;
    return outputPanel;
  }

  return outputPanel;
}


export { makeOutputPanel };
