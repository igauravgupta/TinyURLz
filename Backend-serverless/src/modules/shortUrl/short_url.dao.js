import urlSchema from "../../models/short_url.model.js"; // make sure this is the model, not schema
import { ConflictError } from "../../middlewares/apiError.middleware.js";
import bcrypt from "bcryptjs";

export const saveShortUrl = async (shortUrlCode, longUrl, userId, password = null, expireAt = null) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrlCode,
      user: userId,
      expireAt: expireAt
    });

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      newUrl.password = hashedPassword;
    }

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

export const comparePassword=async(password)=>{
    return await bcrypt.compare(password,url.password);
}