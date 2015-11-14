/* jshint expr:true */
import { expect } from 'chai';
import { describe, it} from 'mocha';
import { bestLanguages } from 'intro-to-es6/lib/programmer';
import { addJavaScript } from 'intro-to-es6/lib/programmer';
import Programmer from 'intro-to-es6/lib/programmer';

describe("Programmer", function(){
  it("knows all the best languages", function(){
    expect(bestLanguages).to.include.members(["Ruby", "Elixir"]);
  });

  it("adds Javascript to the list", function(){
    let newList = addJavaScript(bestLanguages);
    expect(newList).to.include('JavaScript');
    expect(bestLanguages).to.not.include('JavaScript');
  });

  it("has a name", function(){
    let programmer = new Programmer("Steven", "Elixir");
    expect(programmer.name).to.eq("Steven");
  });

  it("has a programming language", function(){
    let programmer = new Programmer("Steven", "Elixir");
    expect(programmer.language).to.eq("Elixir");
  });
  it("is excited about programming", function(){
    let programmer = new Programmer("Steven", "Elixir");
    expect(programmer.evangelize()).to.eq("Steven: ELIXIR IS THE BEST LANGUAGE EVER");
  });

  it("assigns a language by default if none given", function(){
    let programmer = new Programmer("Steven");
    expect(programmer.evangelize()).to.eq("Steven: RUBY IS THE BEST LANGUAGE EVER");
  });
});
