const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>
  blogs.reduce((sum, { likes = 0 }) => sum + likes, 0)

module.exports = {
  dummy,
  totalLikes,
}
