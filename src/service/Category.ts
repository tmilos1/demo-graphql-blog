import { getManager, getRepository } from "typeorm"
import { Category } from "../entity/Category"

export const createCategory = async (category) => {
    let insertResult = null
    try {
        insertResult = await getManager().insert(Category,  category)
    } catch (error) {
        return {
            code: "500",
            success: false,
            message: "Error creating Category."
        }
    }

    const savedCategory = await getRepository(Category).findOne(
        insertResult.identifiers.shift().id
    )

    return {
        code: "201",
        success: true,
        message: "Category has been created.",
        category: savedCategory
    }
}
