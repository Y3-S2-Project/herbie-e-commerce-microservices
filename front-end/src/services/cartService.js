import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: `http://localhost:3005/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const userId = localStorage.getItem('id')

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})
export const getTotalPrice = async () => {
  return (await axiosInstance.get(`/cart/getTotalPrice/${userId}`)).data.totalPrice
}

export const getCartItems = async () => {
  return (await axiosInstance.get(`/cart/${userId}/`)).data
}
