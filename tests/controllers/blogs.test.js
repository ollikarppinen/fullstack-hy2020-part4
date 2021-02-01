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
  initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
  })
})

describe("index", () => {
  describe("without 2 blogs", () => {
    test("return json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    })

    test("returns 2 blogs", async () => {
      const response = await api.get("/api/blogs")

      expect(response.body).toHaveLength(2)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
