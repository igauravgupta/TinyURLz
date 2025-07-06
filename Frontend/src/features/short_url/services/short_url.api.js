import axiosInstance from "../../../services/axiousInstance.js"

export const createShortUrl = async (url, slug, expiresIn) => {
  const payload = {
    url,
    slug,
    expiresIn,
  }
  const { data } = await axiosInstance.post("/api/urls/", payload)
  return data.shortUrl
}

export const deleteShortUrl = async (id) => {
  return await axiosInstance.delete(`/api/urls/delete/${id}`);
}