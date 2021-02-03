const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const api = supertest(app)
const Blog = require("../../models/blog")
const helpers = require("../helpers")
const initialBlogs = [
  {
    title: "blii",
    author: "bluu",
    url: "blaa",
    likes: "123",
  },
  {
    title: "fuu",
    author: "bar",
    url: "baz",
    likes: "456",
  },
]

let token = null
let user = null

beforeEach(async () => {
  await helpers.deleteUsers()
  const userPayload = { username: "foo", password: "bar" }
  const createdUserResponse = await helpers.createUser(userPayload)
  user = createdUserResponse.body
  token = await helpers.loginUser(userPayload)
  await Blog.deleteMany({})
  let blogObject = new Blog({
    user: user.id,
    ...initialBlogs[0],
  })
  await blogObject.save()
  blogObject = new Blog({
    user: user.id,
    ...initialBlogs[1],
  })
  await blogObject.save()
})

test("token should be defined", () => {
  expect(token).toBeDefined()
})

describe("index", () => {
  describe("with 2 blogs", () => {
    test("returns json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    })

    test("returns 2 blogs", async () => {
      const response = await api.get("/api/blogs")

      expect(response.body).toHaveLength(2)
    })

    test("id is defined", async () => {
      const response = await api.get("/api/blogs")
      expect(response.body[0].id).toBeDefined()
    })
  })
})

describe("create", () => {
  const newBlog = {
    title: "newBlog",
    author: "newAuthor",
    url: "newUrl",
    likes: "123456",
  }
  describe("with 2 blogs", () => {
    describe("with all parameters", () => {
      test("returns json", async () => {
        await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/)
      })

      test("persists blog in db", async () => {
        await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
        const blogs = await Blog.find(newBlog)
        expect(blogs).toHaveLength(1)
      })

      test("responds with correct body", async () => {
        const response = await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
        expect(response.body).toMatchObject({ ...newBlog, likes: 123456 })
      })
    })

    describe("without like parameter", () => {
      const newBlog = {
        title: "newBlog",
        author: "newAuthor",
        url: "newUrl",
      }
      test("returns json", async () => {
        await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/)
      })

      test("persists blog in db", async () => {
        await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
        const blogs = await Blog.find(newBlog)
        expect(blogs).toHaveLength(1)
      })

      test("responds with correct body with 0 likes", async () => {
        const response = await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
        expect(response.body).toMatchObject({ ...newBlog, likes: 0 })
      })
    })

    describe("without authentication", async () => {
      const newBlog = {
        title: "newBlog",
        author: "newAuthor",
        url: "newUrl",
      }
      test("responds with 401", async () => {
        await api.post("/api/blogs").send(newBlog).expect(401)
      })
    })

    describe("without title parameter", () => {
      const newBlog = {
        author: "newAuthor",
        url: "newUrl",
        likes: "123456",
      }
      test("responds with 400", async () => {
        await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
          .expect(400)
      })

      test("blog is not persisted", async () => {
        await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
        const blogs = await Blog.find(newBlog)
        expect(blogs).toHaveLength(0)
      })
    })

    describe("without author parameter", () => {
      const newBlog = {
        title: "newBlog",
        url: "newUrl",
        likes: "123456",
      }
      test("responds with 400", async () => {
        await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
          .expect(400)
      })

      test("blog is not persisted", async () => {
        await api
          .post("/api/blogs")
          .auth(token, { type: "bearer" })
          .send(newBlog)
        const blogs = await Blog.find(newBlog)
        expect(blogs).toHaveLength(0)
      })
    })
  })
})

describe("delete", () => {
  describe("with 2 blogs", () => {
    describe("without authentication", async () => {
      test("responds with 401", async () => {
        const blogs = await Blog.find({})
        await api.delete(`/api/blogs/${blogs[0].id}`).expect(401)
      })
    })

    test("responds with 204", async () => {
      const blogs = await Blog.find({})
      await api
        .delete(`/api/blogs/${blogs[0].id}`)
        .auth(token, { type: "bearer" })
        .expect(204)
    })

    test("deletes the blog from db", async () => {
      const blogs = await Blog.find({})
      expect(blogs).toHaveLength(2)
      await api
        .delete(`/api/blogs/${blogs[0].id}`)
        .auth(token, { type: "bearer" })
      expect(await Blog.find({})).toHaveLength(1)
    })
  })
})

describe("put", () => {
  describe("with 2 blogs", () => {
    describe("with updating likes", () => {
      const updatePayload = { likes: 111 }

      test("responds with 200", async () => {
        const blogs = await Blog.find({})
        await api
          .put(`/api/blogs/${blogs[0].id}`)
          .send(updatePayload)
          .expect(200)
      })

      test("likes is updated in db", async () => {
        const blogs = await Blog.find({ likes: 123 })
        const id = blogs[0].id
        expect(blogs[0].likes).toBe(123)
        await api.put(`/api/blogs/${id}`).send(updatePayload)
        const updatedBlogs = await Blog.find({ _id: id })
        expect(updatedBlogs[0].likes).toBe(111)
      })
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
