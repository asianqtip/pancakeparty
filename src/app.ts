
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import passport from "passport";
import errorHandler from "errorhandler";
import session  from "express-session";

var flash = require('connect-flash');

import { IndexRoute } from "./routes/index";
import { LoginRoute } from "./routes/login";
import { RegisterRoute } from "./routes/register";
import { BrowseRoute } from "./routes/browse";
import {AddRecipeRoute} from "./routes/addrecipe";
import {LogoutRoute} from "./routes/logout";
import {MyAccountRoute} from "./routes/myaccount";
import {RecipeRoute} from "./routes/recipe";
import {SearchRoute} from "./routes/search";
import {FavoriteRoute} from "./routes/favorite";
import {LikeRoute} from "./routes/like";
import {DislikeRoute} from "./routes/dislike";



/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.use(express.static(path.join(__dirname, "/types.ts")));

        //configure pug
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set("view engine", "pug");

        //mount logger
        this.app.use(logger("dev"));

        //mount json form parser
        this.app.use(bodyParser.json());
        this.app.use(flash());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //mount cookie parser middleware
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        //this.app.use(session({secret: 'keyboard cat', cookie: { secure: true }}));
        this.app.use(session({
            secret: 'secret',
            saveUninitialized: false,
            resave: false,
            cookie: { maxAge: 100*60*60 }
            }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash());
        this.app.use((req, res, next) => {
            res.locals.user = req.user;
            next();
        });
        this.app.use((req, res, next) => {
            // After successful login, redirect back to the intended page
            if (!req.user &&
                req.path !== "/login" &&
                req.path !== "/register" &&
                !req.path.match(/^\/auth/) &&
                !req.path.match(/\./)) {
                req!.session!.returnTo = req.path;
            } else if (req.user &&
                req.path == "/addrecipe") {
                req!.session!.returnTo = req.path;
            }
            next();
        });
        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

    /**
     * Create and return Router.
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        let router: express.Router;
        router = express.Router();

        IndexRoute.create(router);
        LoginRoute.create(router);
        RegisterRoute.create(router);
        BrowseRoute.create(router);
        AddRecipeRoute.create(router);
        LogoutRoute.create(router);
        MyAccountRoute.create(router);
        RecipeRoute.create(router);
        SearchRoute.create(router);
        FavoriteRoute.create(router);
        LikeRoute.create(router);
        DislikeRoute.create(router);
        //use router middleware
        this.app.use(router);

    }

}

