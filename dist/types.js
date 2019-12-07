"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Format of User-related data
 *
 * @class User
 */
var User = /** @class */ (function () {
    function User(Username, password) {
        this.Username = Username;
        this.password = password;
        this.role = "user";
    }
    return User;
}());
exports.User = User;
/**
 * Format of Ingredient-related data
 *
 * @class Ingredient
 */
var Ingredient = /** @class */ (function () {
    function Ingredient(name, quantity, unit, Optional) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.optional = Optional;
    }
    return Ingredient;
}());
exports.Ingredient = Ingredient;
/**
 * Format of Instruction-related data
 *
 * @class Instruction
 */
var Instruction = /** @class */ (function () {
    function Instruction(StepNo, description) {
        this.StepNo = StepNo;
        this.description = description;
    }
    return Instruction;
}());
exports.Instruction = Instruction;
/**
 * Format of Recipe-related data
 *
 * Note that this class contains an array of
 * Ingredients and Instructions
 *
 * @class Recipe
 */
var Recipe = /** @class */ (function () {
    function Recipe(title, username, ingredients, instructions, DateAdded, Etime) {
        this.title = title;
        this.username = username;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.DateAdded = DateAdded;
        this.Etime = Etime;
        this.rating = new Rating(0, 0);
    }
    return Recipe;
}());
exports.Recipe = Recipe;
/**
 * Format of Rating-related data
 *
 * @class Rating
 */
var Rating = /** @class */ (function () {
    function Rating(Upvotes, Downvotes) {
        this.Upvotes = Upvotes;
        this.Downvotes = Downvotes;
    }
    return Rating;
}());
exports.Rating = Rating;
//# sourceMappingURL=types.js.map