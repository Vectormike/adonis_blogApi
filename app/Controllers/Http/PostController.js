"use strict";
const Post = use("App/Models/Post");

class PostController {
  async index({ response }) {
    const posts = await Post.all();

    return response.status(200).json({
      status_code: 200,
      status: "Success",
      message: "Your Posts",
      results: posts,
    });
  }

  async store({ auth, request, response }) {
    const { title, body } = request.post();

    const currentUser = await auth.current.user;
    if (currentUser) {
      await Post.create({ title, body });
      return response.status(200).json({
        status_code: 201,
        status: "Created",
        message: "Post has been made",
      });
    }
  }

  async update({ params, request, response }) {
    const { title, body } = request.post();

    const post = await Post.findOrFail(params.id);
    post.merge({ title, body });
    await post.save();

    return response.status(201).json({
      status_code: 201,
      status: "Created",
      message: "Post has been edited",
    });
  }

  async delete({ params, response }) {
    const post = await Post.findOrFail(params.id);
    await post.delete();

    return response.status(201).json({
      status_code: 201,
      status: "Created",
      message: "Post has been deleted",
    });
  }
}

module.exports = PostController;
