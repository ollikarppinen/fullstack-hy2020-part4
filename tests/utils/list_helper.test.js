const { dummy, totalLikes, favouriteBlog } = require("../../utils/list_helper")

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

describe("dummy", () => {
  test("returns 1", () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
  })
})
