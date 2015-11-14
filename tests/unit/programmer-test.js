/* jshint expr:true */
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Programmer from 'intro-to-es6/lib/programmer';

var programmer;
describe("Programmer", function(){
  beforeEach(function(){
    programmer = new Programmer("Steven", "Elixir");
  });

  it("has a name", function(){
    expect(programmer.name).to.eq("Steven");
  });

  it("has a programming language", function(){
    expect(programmer.language).to.eq("Elxir");
  });
  it("is excited about programming", function(){
    expect(programmer.evangelize()).to.eq("Steven: ELIXIR IS THE BEST LANGUAGE EVER");
  });
});
