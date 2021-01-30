const _ = require("lodash")

const dummy = (blogs = []) => {
  return 1
}

const totalLikes = (blogs = []) =>
  blogs.reduce((sum, { likes = 0 }) => sum + likes, 0)

const favouriteBlog = (blogs) =>
  blogs.reduce(
    (blogWithMostLikes, blog) =>
      blogWithMostLikes && blogWithMostLikes.likes >= blog.likes
        ? blogWithMostLikes
        : blog,
    undefined
  )

// FIXME: Blogs with author value undefined/"undefined" and null/"null" handled if they would have same author
const mostBlogs = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, ({ author }) => author)
  const author = _.maxBy(
    Object.keys(blogsByAuthor),
    (author) => blogsByAuthor[author].length
  )
  return { author, blogs: (blogsByAuthor[author] || []).length }
}

// FIXME: Blogs with author value undefined/"undefined" and null/"null" handled if they would have same author
const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, ({ author }) => author)
  const author = _.maxBy(Object.keys(blogsByAuthor), (author) =>
    totalLikes(blogsByAuthor[author])
  )
  return { author, likes: totalLikes(blogsByAuthor[author]) }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
