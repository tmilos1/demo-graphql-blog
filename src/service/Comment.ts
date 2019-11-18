import { getManager, getRepository } from "typeorm"
import { Comment } from "../entity/Comment"

export const createComment = async (comment) => {
    let insertResult = null
    try {
        insertResult = await getManager().insert(Comment,  comment)
    } catch (error) {
        return {
            code: "500",
            success: false,
            message: "Error creating Comment."
        }
    }

    const savedComment = await getRepository(Comment).findOne(
        insertResult.identifiers.shift().id
    )

    return {
        code: "201",
        success: true,
        message: "Comment has been created.",
        comment: savedComment
    }
}
