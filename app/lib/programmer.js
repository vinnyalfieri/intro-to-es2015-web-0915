// import { bestLanguages } from 'intro-to-es6/lib/programmer';
// import { addJavaScript } from 'intro-to-es6/lib/programmer';
// import Programmer from 'intro-to-es6/lib/programmer';


var bestLanguages = ["Ruby", "Elixir"];

class Programmer{
  constructor(name, language = "Ruby"){
    this.name = name;
    this.language = language;
  }

  evangelize(){
    return `${this.name}: ${this.language.toUpperCase()} IS THE BEST LANGUAGE EVER`;
  }
}

function addJavaScript(array){
  var awesomearray = [].concat.apply([], array);
  // this.array.push(array);
  awesomearray.push("JavaScript");
  return awesomearray;
}

export {bestLanguages};
export default Programmer;
export {addJavaScript};