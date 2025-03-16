import { CommonRoutesConfig } from "../../common/routes/common.routes.config";
import UsersController from "../controllers/users.controller";
import UsersMiddleware from "../middlewares/users.middleware";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import express from "express";
import { body } from "express-validator";
import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum";
import permissionMiddleware from "../../common/middleware/common.permission.middleware";
import usersMiddleware from "../middlewares/users.middleware";
import usersController from "../controllers/users.controller";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }
  configureRoutes(): express.Application {
    //user auth
    this.app
      .route(`/api/auth/users/register`)
      .post(
        body("email").isEmail(),
        body("password")
          .isLength({ min: 5 })
          .withMessage("Must include password (5+ characters)"),
        body("fullname").isLength({ min: 1 }),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersController.createUser
      );
    this.app
      .route(`/api/auth/users/verifyOTP`)
      .post(
        body("email").isEmail(),
        body("otp")
          .isLength({ min: 6 })
          .withMessage("Must include otp (6+ characters)"),
        UsersController.verifyCode
      );
    this.app
      .route(`/api/auth/users/resendOTP`)
      .post(body("email").isEmail(), UsersController.resendCode);
    this.app
      .route(`/api/auth/users/resetPassword`)
      .post(body("email").isEmail(), UsersController.forgetPassword);
    this.app
      .route(`/api/auth/users/confirmPassword`)
      .post(
        body("email").isEmail(),
        body("otp")
          .isLength({ min: 6 })
          .withMessage("Must include otp (6+ characters)"),
        body("password")
          .isLength({ min: 5 })
          .withMessage("Must include password (5+ characters)"),
        UsersController.confirmPassword
      );
    this.app
      .route(`/api/auth/users/changePassword`)
      .post(
        body("email").isEmail(),
        body("oldPassword")
          .isLength({ min: 5 })
          .withMessage("Must include password (5+ characters)"),
        body("newPassword")
          .isLength({ min: 5 })
          .withMessage("Must include password (5+ characters)"),
        usersMiddleware.validateAuthorizationHeader,
        UsersController.changePassword
      );
    this.app
      .route(`/api/auth/users/login`)
      .post(
        body("email").isEmail(),
        body("password").isString(),
        UsersController.signIn
      );
    this.app
      .route(`/api/auth/users/verifySession`)
      .post(
        usersMiddleware.validateAuthorizationHeader,
        UsersController.verifySession
      );
    this.app
      .route(`/api/auth/users/renewSession`)
      .post(
        usersMiddleware.validateAuthorizationHeader,
        UsersController.renewSession
      );
    this.app.route("/api/auth/google").get(UsersController.googleLogin);
    this.app
      .route("/api/auth/google/callback")
      .get(UsersController.googleCallback);
    this.app.route("/api/auth/outlook").get(UsersController.outlookLogin);
    this.app
      .route("/api/auth/outlook/callback")
      .get(UsersController.outlookCallback);
    //user profile
    this.app.param("user_id", usersMiddleware.extractUserId);
    this.app
      .route("/api/user/:user_id")
      .get(UsersController.getUserById)
      .patch(usersController.updateUserById)
      .delete(usersController.deleteUserById);
    //user orders
    return this.app;
  }
}
