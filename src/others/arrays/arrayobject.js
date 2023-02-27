let timers = new Map()
let services = ['service1', 'service2']
for(let i=0; i< services.length; i++){
    timers.set(services[i], {
        intervals: [],
        timeouts: []
    })
}
timers.get('service1').intervals.push('Anoop')
console.log(timers)






















// let services = new Map(["service1", "service2"]);
// let timers = {};

// for (let i = 0; i < services.length; i++) {
//   timers[services[i]] = {
//     intervals: [],
//     timeouts: [],
//   };
// }

// console.log(timers);

// timers["service1"].intervals.push(
//   setInterval(() => {
//     console.log("Server @ 1 :::: 11 :::: SetIntervals");
//   }, 2000)
// );

// timers["service1"].intervals.push(
//     setInterval(() => {
//       console.log("Server @ 1 :::: 12 :::: SetIntervals");
//     }, 2000)
//   );
// console.log(timers);

// console.log("Final", timers);
