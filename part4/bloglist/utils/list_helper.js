const dummy = (blogs) => {

    return 1
}

const totalLikes = (blogs) => {
    console.log('totalLikes')
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const result = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    const { title, author, likes } = result
    return { title, author, likes }

}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const authorsCount = authors.reduce((count, author) => {
        count[author] = (count[author] || 0) + 1
        return count
    }, {})
    const max = Object.keys(authorsCount).reduce((a, b) => authorsCount[a] > authorsCount[b] ? a : b)
    return { author: max, blogs: authorsCount[max] }
}

const mostLikes = (blogs) => {
    const authorsLikeCount = blogs.reduce((count, blog) => {
        count[blog.author] = (count[blog.author] || 0) + blog.likes
        return count
    }, {})
    const max = Object.keys(authorsLikeCount).reduce((a, b) => authorsLikeCount[a] > authorsLikeCount[b] ? a : b)
    return { author: max, likes: authorsLikeCount[max] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}