const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const api = supertest(app)
const Blog = require("../../models/blog")
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
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
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/)
      })

      test("persists blog in db", async () => {
        await api.post("/api/blogs").send(newBlog)
        const blogs = await Blog.find(newBlog)
        expect(blogs).toHaveLength(1)
      })

      test("responds with correct body", async () => {
        const response = await api.post("/api/blogs").send(newBlog)
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
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/)
      })

      test("persists blog in db", async () => {
        await api.post("/api/blogs").send(newBlog)
        const blogs = await Blog.find(newBlog)
        expect(blogs).toHaveLength(1)
      })

      test("responds with correct body with 0 likes", async () => {
        const response = await api.post("/api/blogs").send(newBlog)
        expect(response.body).toMatchObject({ ...newBlog, likes: 0 })
      })
    })

    describe("without title parameter", () => {
      const newBlog = {
        author: "newAuthor",
        url: "newUrl",
        likes: "123456",
      }
      test("responds with 400", async () => {
        await api.post("/api/blogs").send(newBlog).expect(400)
      })

      test("blog is not persisted", async () => {
        await api.post("/api/blogs").send(newBlog)
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
        await api.post("/api/blogs").send(newBlog).expect(400)
      })

      test("blog is not persisted", async () => {
        await api.post("/api/blogs").send(newBlog)
        const blogs = await Blog.find(newBlog)
        expect(blogs).toHaveLength(0)
      })
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
