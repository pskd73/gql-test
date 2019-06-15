const { runQuery } = require("./db");

const getAllComments = async () => {
    return await runQuery("select * from comment");
}

const getComment = async (id) => {
    return await runQuery(`select * from comment where id = ${id}`)
}

const updateComment = async (id, field, value) => {
    return await runQuery(`update comment set ${field} = ${value} where id = ${id}`);
}

const deleteComment = async (id) => {
    return await runQuery(`delete from comment where id = ${id}`);
}

const createComment = async (comment) => {
    return await runQuery(`
        insert into comment (author_id, body, post_id, created_at)
        values (${comment.authorId}, "${comment.body}", ${comment.postId}, ${new Date().getTime()})
    `)
}
