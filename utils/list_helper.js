const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>
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
  return Object.keys(blogsByAuthor).reduce(
    (authorWithMostBlogs, author) =>
      authorWithMostBlogs &&
      blogsByAuthor[authorWithMostBlogs].length >= blogsByAuthor[author].length
        ? authorWithMostBlogs
        : author,
    undefined
  )
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
}
