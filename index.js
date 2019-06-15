const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { getAllPosts, getPost } = require('./post');
const { getCommentsByPostId, createComment } = require('./comment');

const app = express();

const schema = buildSchema(`
  type Query {
    posts: [Post]
    post(id: Int): Post
  }

  type Mutation {
    commentOnPost(body: String, postId: Int): MutationResponse
  }

  type Comment {
    id: Int
    authorId: Int
    body: String
    createdAt: Int
    postId: Int
  }

  type Post {
    id: Int
    title: String
    body: String
    authorId: Int
    createdAt: Int
    comments: [Comment]
  }

  enum ResultCode {
    SUCCESS, FAILURE
  }

  type MutationResponse {
    code: ResultCode
    message: String
  }
`);

const root = {
    posts: async (args) => {
      return await getAllPosts();
    },
    post: async ({id}) => {
      const post = await getPost(id);
      return {...post, comments: await getCommentsByPostId(id)}
    },
    commentOnPost: async ({body, postId}) => {
      await createComment({
        authorId: 123, // should come from request/session/token
        body,
        postId
      })
      return {
        code: 'SUCCESS'
      }
    }
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  rootValue: root
}));

app.listen(4000);
