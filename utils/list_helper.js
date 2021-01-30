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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}
