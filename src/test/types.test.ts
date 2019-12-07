import {Rating, Ingredient, Instruction, Recipe, User} from "../types";
import {expect} from 'chai';

describe('Type test:', function(){

    const testDate = new Date("2018-10-17");
    const testRating = new Rating(420, 66);
    const testIngredient = new Ingredient("Goat Cheese", 2, "cups", false);
    const testInstruction = new Instruction(1, "This is a test");
    const testUser = new User("Flamey_Boi", "#420Blazeit")
    const testRecipe = new Recipe( "Baked Pancakes",
           "Flamey_Boi", [testIngredient],
           [testInstruction], testDate, 5);
   it('should allow the values to be accessed', function(){
       expect(testIngredient.name).to.equal("Goat Cheese");
       expect(testInstruction.description).to.equal("This is a test");
   });
   it('should allow the values to be changed', function(){
       const newDate = new Date(2019-4-20);
       testRecipe.DateAdded = newDate;
       expect(testRecipe.DateAdded).to.not.equal(testDate)
   });
});