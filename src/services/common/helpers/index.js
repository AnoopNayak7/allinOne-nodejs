let timers = new Map()
let services = ['service1', 'service2']
for(let i=0; i< services.length; i++){
    timers.set(services[i], {
        intervals: [],
        timeouts: []
    })
}

// Clears intervals from timers array
const globalTimerClearer = (intervalsArr, timerType) => {
  if(timerType === 'interval'){
    let count = 0;
    for (let i = 0; i < intervalsArr.length; i++) {
      clearInterval(intervalsArr[i])
      count++
    }
    console.log('Loop Ran for +++++++++++> Intervals :::::', count)
  }
  else{
    let count = 0;
    for (let i = 0; i < intervalsArr.length; i++) {
      clearTimeout(intervalsArr[i])
      count++
    }
    console.log('Loop Ran for +++++++++++> Timeout :::::', count)
  }
};

module.exports = {
  timers,
  globalTimerClearer,
};
