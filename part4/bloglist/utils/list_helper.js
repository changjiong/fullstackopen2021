const dummy = (blogs) => {
    console.log('dummy')
    return 1
}

const totalLikes = (blogs) => {
    console.log('totalLikes')
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    console.log('favoriteBlog')
    const result = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    const { title, author, likes } = result
    return { title, author, likes }

}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}