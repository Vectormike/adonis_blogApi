"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  Route.post("login", "UserController.login");
  Route.post("register", "UserController.store");
});

Route.group(() => {
  Route.get("posts", "PostController.index");
  Route.post("posts", "PostController.store");
  Route.put("posts/:id", "PostController.update");
  Route.delete("posts/:id/delete", "PostController.delete");
}).middleware(["auth"]);
