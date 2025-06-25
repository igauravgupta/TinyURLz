import axiosInstance from "../../../services/axiousInstance.js"

export const createShortUrl = async (url, slug, password, expiresIn) => {
  const payload = {
    url,
    slug,
    password,
    expiresIn,
  }
  console.log(payload);
  const { data } = await axiosInstance.post("/api/urls/", payload)
  return data.shortUrl
}

export const deleteShortUrl = async (id) => {
  return await axiosInstance.delete(`/api/urls/delete/${id}`);
}