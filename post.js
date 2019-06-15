const { runQuery } = require("./db");

const getAllPosts = async () => {
    return await runQuery("select * from post");
}

const getPost = async (id) => {
    return await runQuery(`select * from post where id = ${id}`)
}

const updatePost = async (id, field, value) => {
    return await runQuery(`update post set ${field} = ${value} where id = ${id}`);
}

const deletePost = async (id) => {
    return await runQuery(`delete from post where id = ${id}`);
}

const createPost = async (post) => {
    return await runQuery(`
        insert into post (title, body, author_id, created_at)
        values ("${post.title}", "${post.body}", ${post.authorId}, ${new Date().getTime()})
    `)
}
