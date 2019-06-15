const { runQuery } = require("./db");

const getAllComments = async () => {
    return await runQuery("select * from comment");
}

const getComment = async (id) => {
    return (await runQuery(`select * from comment where id = ${id}`))[0];
}

const updateComment = async (id, field, value) => {
    return await runQuery(`update comment set ${field} = ${value} where id = ${id}`);
}

const deleteComment = async (id) => {
    return await runQuery(`delete from comment where id = ${id}`);
}

const createComment = async (comment) => {
    return await runQuery(`
        insert into comment (authorId, body, postId, createdAt)
        values (${comment.authorId}, "${comment.body}", ${comment.postId}, ${new Date().getTime()})
    `);
}

const getCommentsByPostId = async (postId) => {
    return await runQuery(
        `select * from comment where postId = ${postId}`
    );
}

module.exports = {
    getAllComments,
    getComment,
    updateComment,
    deleteComment,
    createComment,
    getCommentsByPostId
}