const {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
} = require("../../utils/list_helper")

describe("totalLikes", () => {
  describe("without blogs", () => {
    test("returns 0", () => expect(totalLikes([])).toBe(0))
  })

  describe("with blog", () => {
    describe("without likes", () => {
      test("returns 0", () => expect(totalLikes([{ foo: 1 }])).toBe(0))
    })

    describe("with 0 likes", () => {
      test("returns 0", () => expect(totalLikes([{ likes: 0 }])).toBe(0))
    })

    describe("with 1 like", () => {
      test("returns 1", () => expect(totalLikes([{ likes: 1 }])).toBe(1))
    })
  })

  describe("with multiple blogs", () => {
    test("returns sum of likes", () =>
      expect(totalLikes([{ likes: 1 }, { likes: 2 }])).toBe(3))
  })
})

describe("favouriteBlog", () => {
  describe("without blogs", () => {
    test("returns undefined", () => expect(favouriteBlog([])).toBe(undefined))
  })

  describe("with blog", () => {
    describe("without likes", () => {
      const blog = { foo: 1 }
      test("returns blog", () => expect(favouriteBlog([blog])).toEqual(blog))
    })

    describe("with 1 like", () => {
      const blog = { likes: 1 }
      test("returns blog", () => expect(favouriteBlog([blog])).toEqual(blog))
    })
  })

  describe("with multiple blogs", () => {
    const blog = { likes: 1 }

    describe("with one blog having most likes", () => {
      const blogWithMostLikes = { likes: 2 }

      test("returns the blog with most likes", () =>
        expect(favouriteBlog([blog, blogWithMostLikes])).toEqual(
          blogWithMostLikes
        ))
    })

    describe("with multiple blogs having most likes", () => {
      const blogWithTiedMostLikes = { title: "blogWithTiedMostLikes", likes: 1 }

      test("returns the first blog with most likes", () =>
        expect(favouriteBlog([blogWithTiedMostLikes, blog])).toEqual(
          blogWithTiedMostLikes
        ))
    })
  })
})

describe("mostBlogs", () => {
  describe("without blogs", () => {
    const blogs = []
    test("returns undefined", () =>
      expect(mostBlogs(blogs)).toEqual({
        author: undefined,
        blogs: 0,
      }))
  })

  describe("with blog", () => {
    describe("without author", () => {
      const blogs = [{ title: "foo" }]
      test("returns undefined", () =>
        expect(mostBlogs(blogs)).toEqual({
          author: "undefined",
          blogs: 1,
        }))
    })

    describe("with author", () => {
      const blogs = [{ author: "foo" }]
      expect(mostBlogs(blogs)).toEqual({
        author: "foo",
        blogs: 1,
      })
    })
  })

  describe("with multiple blogs", () => {
    describe("with one author having most blogs", () => {
      const blogs = [
        { author: "authorWithMostBlogs" },
        { author: "authorWithLeastBlogs" },
        { author: "authorWithMostBlogs" },
      ]

      test("returns the author with most blogs", () =>
        expect(mostBlogs(blogs)).toEqual({
          author: "authorWithMostBlogs",
          blogs: 2,
        }))
    })

    describe("with multiple author having most blogs", () => {
      const blogs = [
        { author: "authorWithTiedMostBlogs" },
        { author: "secondAuthorWithTiedMostBlogs" },
      ]

      test("returns first author with most blogs", () =>
        expect(mostBlogs(blogs)).toEqual({
          author: "authorWithTiedMostBlogs",
          blogs: 1,
        }))
    })
  })
})

describe("mostLikes", () => {
  describe("without blogs", () => {
    const blogs = []
    test("returns undefined", () =>
      expect(mostLikes(blogs)).toEqual({ author: undefined, likes: 0 }))
  })

  describe("with blog", () => {
    describe("without author", () => {
      const blogs = [{ title: "foo" }]
      test("returns undefined", () =>
        expect(mostLikes(blogs)).toEqual({ author: "undefined", likes: 0 }))
    })

    describe("with author", () => {
      describe("with likes", () => {
        const blogs = [{ author: "foo" }]
        test("returns author", () =>
          expect(mostLikes(blogs)).toEqual({ author: "foo", likes: 0 }))
      })

      describe("without likes", () => {
        const blogs = [{ author: "foo", likes: 1 }]
        test("returns author", () =>
          expect(mostLikes(blogs)).toEqual({ author: "foo", likes: 1 }))
      })
    })
  })

  describe("with multiple blogs", () => {
    describe("with one author having most likes", () => {
      const blogs = [
        { author: "authorWithMostLikes", likes: 2 },
        { author: "authorWithLeastLikes", likes: 3 },
        { author: "authorWithMostLikes", likes: 2 },
      ]

      test("returns the author with most likes", () =>
        expect(mostLikes(blogs)).toEqual({
          author: "authorWithMostLikes",
          likes: 4,
        }))
    })

    describe("with multiple author having most likes", () => {
      const blogs = [
        { author: "authorWithLestLikes", likes: 1 },
        { author: "firstAuthorWithTiedMostLikes", likes: 2 },
        { author: "secondAuthorWithTiedMostLikes", likes: 2 },
      ]

      test("returns first author with most likes", () =>
        expect(mostLikes(blogs)).toEqual({
          author: "firstAuthorWithTiedMostLikes",
          likes: 2,
        }))
    })
  })
})

describe("dummy", () => {
  test("returns 1", () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
  })
})
