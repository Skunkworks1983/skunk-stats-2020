const {
  workerData,
  parentPort
} = require('worker_threads');
const {
  jStat
} = require('jstat');

// take the average of all table rows
workerData.forEach(element => {

});

parentPort.postMessage({
  fileName: work,
  status: 'Done'
})