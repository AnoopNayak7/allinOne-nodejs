const name = require('../constant')

const myRandomFnction = () => {
  setInterval(() => {
    console.log("2    SERVICE/SERVICE1/FOLDER1/FILE1.js :::::::::::::::::::::: inside function");
  }, 5000);
};

module.exports={
  printThis1 : () => {
    setInterval(() => {
      console.log("1 SERVICE/SERVICE1/FOLDER1/FILE1.js ::::", name);
    }, 5000);
  }
}
