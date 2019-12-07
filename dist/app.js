"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var passport_1 = __importDefault(require("passport"));
var errorhandler_1 = __importDefault(require("errorhandler"));
var express_session_1 = __importDefault(require("express-session"));
var flash = require('connect-flash');
var index_1 = require("./routes/index");
var login_1 = require("./routes/login");
var register_1 = require("./routes/register");
var browse_1 = require("./routes/browse");
var addrecipe_1 = require("./routes/addrecipe");
var logout_1 = require("./routes/logout");
var myaccount_1 = require("./routes/myaccount");
var recipe_1 = require("./routes/recipe");
var search_1 = require("./routes/search");
var like_1 = require("./routes/like");
var dislike_1 = require("./routes/dislike");
/**
 * The server.
 *
 * @class Server
 */
var Server = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express_1.default();
        //configure application
        this.config();
        //add routes
        this.routes();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    Server.prototype.config = function () {
        //add static paths
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "/types.ts")));
        //configure pug
        this.app.set("views", path_1.default.join(__dirname, "../views"));
        this.app.set("view engine", "pug");
        //mount logger
        this.app.use(morgan_1.default("dev"));
        //mount json form parser
        this.app.use(body_parser_1.default.json());
        this.app.use(flash());
        //mount query string parser
        this.app.use(body_parser_1.default.urlencoded({
            extended: true
        }));
        //mount cookie parser middleware
        this.app.use(cookie_parser_1.default("SECRET_GOES_HERE"));
        //this.app.use(session({secret: 'keyboard cat', cookie: { secure: true }}));
        this.app.use(express_session_1.default({
            secret: 'secret',
            saveUninitialized: false,
            resave: false,
            cookie: { maxAge: 100 * 60 * 60 }
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        this.app.use(flash());
        this.app.use(function (req, res, next) {
            res.locals.user = req.user;
            next();
        });
        this.app.use(function (req, res, next) {
            // After successful login, redirect back to the intended page
            if (!req.user &&
                req.path !== "/login" &&
                req.path !== "/register" &&
                !req.path.match(/^\/auth/) &&
                !req.path.match(/\./)) {
                req.session.returnTo = req.path;
            }
            else if (req.user &&
                req.path == "/addrecipe") {
                req.session.returnTo = req.path;
            }
            next();
        });
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorhandler_1.default());
    };
    /**
     * Create and return Router.
     *
     * @class Server
     * @method routes
     * @return void
     */
    Server.prototype.routes = function () {
        var router;
        router = express_1.default.Router();
        index_1.IndexRoute.create(router);
        login_1.LoginRoute.create(router);
        register_1.RegisterRoute.create(router);
        browse_1.BrowseRoute.create(router);
        addrecipe_1.AddRecipeRoute.create(router);
        logout_1.LogoutRoute.create(router);
        myaccount_1.MyAccountRoute.create(router);
        recipe_1.RecipeRoute.create(router);
        search_1.SearchRoute.create(router);
        like_1.LikeRoute.create(router);
        dislike_1.DislikeRoute.create(router);
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=app.js.map