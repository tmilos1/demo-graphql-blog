import { getRepository, getManager } from "typeorm";
import { Post } from "../entity/Post";

export const createPost = async (post) => {
    let insertResult = null

    try {
        insertResult = await getManager().insert(Post, post)
    } catch (error) {
        return {
            code: "500",
            success: false,
            message: "Error creating Post.",
        }
    }

    const savedPost = await getRepository(Post).findOne(
        insertResult.identifiers.shift().id
    )

    return {
        code: "200",
        success: true,
        message: "Post has been created.",
        post: savedPost
    }
}
