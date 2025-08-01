import urlSchema from "../../models/short_url.model.js";
import { ConflictError } from "../../middlewares/apiError.middleware.js";

export const saveShortUrl = async (shortUrlCode, longUrl, userId, expireAt) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrlCode,
      user: userId,
      expireAt: expireAt,
    });
    await newUrl.save();
  } catch (err) {
    if (err.code === 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw new Error(err.message || err);
  }
};

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({short_url:slug});
}

export const deleteShortUrlById = async (id) => {
    return await urlSchema.findByIdAndDelete(id);
}