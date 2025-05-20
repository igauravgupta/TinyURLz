import {asyncHandler} from "../../utils/asyncHandler.js"
import { getAllUserUrlsDao } from "../dao/user.dao.js"

export const getAllUserUrls = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const urls = await getAllUserUrlsDao(_id)
    res.status(200).json({message:"success",urls})
})