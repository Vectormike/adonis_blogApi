"use strict";
const User = use("App/Models/User");

class UserController {
  async login({ auth, request, response }) {
    const { username, password } = request.post();
    try {
      console.log(username);
      let token = await auth.authenticator("jwt").attempt(username, password);

      if (token) {
        return response.status(200).send({
          status_code: 200,
          status: "Success",
          message: "Logged In Successfully.",
          result: token,
        });
      }
    } catch (error) {
      return response.status(400).json({
        error,
        message: "We cannot find any account with these credentials.",
      });
    }
  }

  async store({ auth, request, response }) {
    const { username, email, password } = request.post();
    const data = { username, email, password };
    console.log(data);

    const user = await User.create(data);

    return response.status(201).json({
      status: "Success",
      message: "Sign up Successful",
    });
  }

  async delete({ auth, response }) {
    await auth.logout();

    return response.status(201).json({
      message: "Log out successful",
    });
  }
}

module.exports = UserController;
