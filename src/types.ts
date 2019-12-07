/**
 * Format of User-related data
 *
 * @class User
 */
export class User{
    Username:string;
    password:string;
    role: string;
    constructor( Username:string, password:string)
    {
        this.Username=Username;
        this.password=password;
        this.role="user";
    }
}

/**
 * Format of Ingredient-related data
 *
 * @class Ingredient
 */
export class Ingredient{
    name:string;
    quantity:number;
    unit:string;
    optional:boolean;
    constructor( name:string, quantity:number, unit:string, Optional:boolean)
    {
        this.name=name;
        this.quantity=quantity;
        this.unit=unit;
        this.optional=Optional;
    }
}

/**
 * Format of Instruction-related data
 *
 * @class Instruction
 */
export class Instruction{
    StepNo:number;
    description:string;
    constructor( StepNo:number, description:string)
    {
        this.StepNo = StepNo;
        this.description = description;
    }
}

/**
 * Format of Recipe-related data
 *
 * Note that this class contains an array of
 * Ingredients and Instructions
 *
 * @class Recipe
 */
export class Recipe{
    title:string;
    username:string;
    ingredients:Ingredient[];
    instructions:Instruction[];
    DateAdded:Date;
    Etime:number;
    rating: Rating;
    constructor(title:string, username:string, ingredients:Ingredient[],
                instructions:Instruction[], DateAdded:Date, Etime:number)
    {
        this.title=title;
        this.username=username;
        this.ingredients=ingredients;
        this.instructions=instructions;
        this.DateAdded=DateAdded;
        this.Etime=Etime;
        this.rating = new Rating(0,0);
    }
}

/**
 * Format of Favorite-related data
 *
 * @class Favorite
 */
export class Favorite{
    username:string;
    RecipeTitle:string;
    constructor(username:string, RecipeTitle:string)
    {
        this.username=username;
        this.RecipeTitle=RecipeTitle;
    }
}

/**
 * Format of Rating-related data
 *
 * @class Rating
 */
export class Rating{
    Upvotes:number;
    Downvotes:number;
    constructor(Upvotes:number, Downvotes:number)
    {
        this.Upvotes=Upvotes;
        this.Downvotes=Downvotes;
    }
}