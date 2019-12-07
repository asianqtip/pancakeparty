import {NextFunction, Request, Response} from "express";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import "../config/passport";
/** AuthController()
 * Handles user login and authentication.
 * Currently, login is authenticated by searching the db for a matching username.
 * To be implemented: SHA1 password hashing and verification.
 *
**/
class AuthController{

    /** login()
     * Connects to database to find data matching the username.
     * Successful login results in a redirection to the homepage.
     * Otherwise, will be redirected to the login page. (input form blank)
     **/
     static login (req: Request, res: Response, next: NextFunction) {
        passport.authenticate("local", { session: true }, (err, user, info: IVerifyOptions) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash("errors", info.message);
                return res.status(400).redirect("/login");
            }
            req.login(user, (err) => {
                if (err) { return next(err); }
                req.flash("success", "You have successfully logged in." );
                res.status(200).redirect(req!.session!.returnTo || "/");
            });
        })(req, res, next);
    }
    static logout (req: Request, res: Response){
         req.logout();
         req.flash("success", "You have successfully logged out." );
         res.status(200).redirect(req!.session!.returnTo || "/");
    }
}
export default AuthController;
