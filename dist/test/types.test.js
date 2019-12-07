"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var chai_1 = require("chai");
describe('Type test:', function () {
    var testDate = new Date("2018-10-17");
    var testRating = new types_1.Rating(420, 66);
    var testIngredient = new types_1.Ingredient("Goat Cheese", 2, "cups", false);
    var testInstruction = new types_1.Instruction(1, "This is a test");
    var testUser = new types_1.User("Flamey_Boi", "#420Blazeit");
    var testRecipe = new types_1.Recipe("Baked Pancakes", "Flamey_Boi", [testIngredient], [testInstruction], testDate, 5);
    it('should allow the values to be accessed', function () {
        chai_1.expect(testIngredient.name).to.equal("Goat Cheese");
        chai_1.expect(testInstruction.description).to.equal("This is a test");
    });
    it('should allow the values to be changed', function () {
        var newDate = new Date(2019 - 4 - 20);
        testRecipe.DateAdded = newDate;
        chai_1.expect(testRecipe.DateAdded).to.not.equal(testDate);
    });
});
//# sourceMappingURL=types.test.js.map