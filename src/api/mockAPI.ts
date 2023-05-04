import { type Request, createServer, Model, IdentityManager, Response } from "miragejs"
import { type ContentPost } from "../models"

interface Student {
  id: number;
  name: string;
}
interface Message {
  author: string;
  message: string;
  timestamp: Date;
}

export default function mockAPI(): void {
  createServer({
    environment: "development",
    identityManagers: {
      application: IdentityManager
    },
    models: {
      student: Model.extend<Partial<Student>>({}),
      post: Model,
      message: Model.extend<Partial<Message>>({})
    },
    namespace: "/api/v1",
    seeds(server) {
      createExamplePosts(server),
        server.db.loadData({
          students: [
            { id: 1, name: "john" },
            { id: 2, name: "jackson" },
            { id: 3, name: "jimmy" },
            { id: 4, name: "jonathon" },
            { id: 5, name: "james" },
            { id: 6, name: "jack" },
            { id: 7, name: "jill" },
            { id: 8, name: "junior" },
          ],
        });
    },
    routes() {
      this.post("/posts", mockCreatingPost)
      this.get("/posts", mockFetchingPosts)
      this.delete("/posts/:id", mockDeletingPost)
      this.post("/students", mockSignUp)
      this.post("/signin", mockSignIn)

      this.get("/students/:name", (schema, request) => {
        const name = request.params.name.toLowerCase();
        return schema.db.students.filter((student) => student.name.includes(name));
        // return schema.db.students.length;
      });

      this.get("/chat/messages/get", (schema) => {
        return schema.db.messages;
      });

      this.post("/chat/messages", (schema, request) => {
        const message = JSON.parse(request.requestBody);
        schema.db.messages.insert(message);
        return schema.db.messages;
      });
    }
  })
}

const createExamplePosts = (server: any): void => {
  for (let i = 0; i < 10; i++)
    server.create("post", {
      id: i.toString(),
      title: "A post",
      tags: [i.toString()],
      content:
        "An example post, that could contain some text like this.\n And possibly even more (eventually). Whatever it's gonna be fine, it's alright…",
      posterId: i % 3
    })
}

const mockCreatingPost = (schema: any, { requestBody }: Request): ContentPost =>
  schema.posts.create(JSON.parse(requestBody))

const mockFetchingPosts = (schema: any, { queryParams }: Request): Response =>
  new Response(
    200,
    {},
    JSON.stringify(
      (schema.posts.all().models as any[])
        .map((model) => ({ ...model.attrs, id: parseInt(model.id) }))
        .sort((lhs: any, rhs: any) =>
          (JSON.parse(queryParams.sortAscending) as boolean)
            ? lhs.id - rhs.id
            : rhs.id - lhs.id
        )
    )
  )

const mockDeletingPost = (schema: any, { params }: Request): any => {
  return schema.posts.find(params.id).destroy()
}

const mockSignUp = (): any => ({
  id: 1,
  name: "name",
  email: "email",
  token: "xyz123",
  type: "Bearer"
})

const mockSignIn = (): any => ({
  id: 1,
  name: "name",
  email: "email",
  token: "xyz123",
  type: "Bearer"
})

const mockGettingProfile = (): any => ({
  name: "Jessica",
  bio: "Life is a mixture of emotions. There are times when things are gloomy and we are sad, while there are times when good things happen and our heart gets uplifted with positive vibes. But, always remember that we shouldn’t let our sad times derail our positive energy and keep us down.",
  icon: "School"
})

const mockUpdatingProfile = (schema: any, { requestBody }: Request): any => {
  const json = JSON.parse(requestBody)
  return {
    name: json.newName ?? "Jessica",
    bio:
      json.newBio ??
      "Life is a mixture of emotions. There are times when things are gloomy and we are sad, while there are times when good things happen and our heart gets uplifted with positive vibes. But, always remember that we shouldn’t let our sad times derail our positive energy and keep us down.",
    icon: json.newIcon ?? "School"
  }
}