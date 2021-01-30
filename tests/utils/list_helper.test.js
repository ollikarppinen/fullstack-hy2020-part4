const { dummy, totalLikes } = require("../../utils/list_helper")

describe("totalLikes", () => {
  describe("without blogs", () => {
    test("returns 0", () => expect(totalLikes([])).toBe(0))
  })

  describe("with blog", () => {
    describe("without likes", () => {
      test("returns 0", () => expect(totalLikes([{ foo: 1 }])).toBe(0))
    })

    describe("without 0 likes", () => {
      test("returns 0", () => expect(totalLikes([{ likes: 0 }])).toBe(0))
    })

    describe("without 1 like", () => {
      test("returns 1", () => expect(totalLikes([{ likes: 1 }])).toBe(1))
    })
  })

  describe("with multiple blogs", () => {
    test("returns sum of likes", () =>
      expect(totalLikes([{ likes: 1 }, { likes: 2 }])).toBe(3))
  })
})

describe("dummy", () => {
  test("returns 1", () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
  })
})
