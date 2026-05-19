import axios from 'axios'

const configuredBaseUrl = import.meta.env.VITE_API_URL as string | undefined

const api = axios.create({
  baseURL: configuredBaseUrl ? `${configuredBaseUrl.replace(/\/$/, '')}/api` : '/api',
})

export async function login(email, password) {
  const response = await api.post('/auth/login', { email, password })
  return response.data.data
}

export async function fetchProducts() {
  const response = await api.get('/products')
  return response.data.data
}

export async function fetchCart() {
  const response = await api.get('/cart')
  return response.data.data
}

export async function fetchOrders() {
  const response = await api.get('/orders')
  return response.data.data
}
