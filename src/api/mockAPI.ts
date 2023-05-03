import { type Request, createServer, Model, IdentityManager, Response } from "miragejs"

import { type ContentPost } from "../models"

export default function mockAPI(): void {
  createServer({
    environment: "development",
    identityManagers: {
      application: IdentityManager,
    },
    models: {
      student: Model,
      post: Model
    },
    seeds(server) { createExamplePosts(server) },
    routes() {
      this.post("api/v1/posts", mockCreatingPost)
      this.get("api/v1/posts", mockFetchingPosts)
      this.post("/api/v1/students", mockSignUp)
      this.post("/api/v1/signin", mockSignIn)
    }
  })
}

const createExamplePosts = (server: any): void => {
  for (let i = 0; i < 10; i++)
    server.create("post", {
      id: i.toString(),
      title: "A post",
      tags: [i.toString()],
      content: "An example post, that could contain some text like this.\n And possibly even more (eventually). Whatever it's gonna be fine, it's alright…",
      posterId: i % 3
    })
}

const mockCreatingPost = (schema: any, request: Request): ContentPost =>
  schema.posts.create(JSON.parse(request.requestBody))

const mockFetchingPosts = (schema: any, request: Request): Response =>
  new Response(200, {}, JSON.stringify(
    (schema.posts.all().models as any[])
      .map(model => ({ ...model.attrs, id: parseInt(model.id) }))
      .sort((lhs: any, rhs: any) => JSON.parse(request.queryParams.sortAscending) as boolean ? lhs.id - rhs.id : rhs.id - lhs.id)

  ))

const mockSignUp = (schema: any, request: Request): any => ({
  id: 1,
  name: "name",
  email: "email",
  token: "xyz123",
  type: "Bearer"
})


const mockSignIn = (schema: any, request: Request): any => ({
  id: 1,
  name: "name",
  email: "email",
  token: "xyz123",
  type: "Bearer"
})
