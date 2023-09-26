import ordersJSON from '@/orders.json'
import axios from 'axios'

const API_URL = '/api/'

axios.defaults.withCredentials = true

export const getOrders = async () => {
  try {
    const res = await axios.get(API_URL)
    if (!res.data.success) {
      throw 'Failed to fetch orders'
    }
    return ordersJSON
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteOrder = async (orderId) => {
  try {
    const res = await axios.delete(`${API_URL}/${orderId}`)
    if (!res.data.success) {
      throw `Failed to delete order ${orderId}`
    }
    return true
  } catch (error) {
    throw new Error(error)
  }
}

export const createOrder = async (newOrder) => {
  try {
    const res = await axios.post(API_URL, newOrder)
    if (!res.data.success) {
      throw `Failed to create order`
    }
    return {
      order_ID: crypto.randomUUID().toUpperCase(),
      created_at: new Date().toLocaleDateString(),
      line_items: [],
      ...newOrder
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const editOrder = async (updatedOrder) => {
  try {
    const res = await axios.put(`${API_URL}/${updatedOrder.order_ID}`, updatedOrder)
    if (!res.data.success) {
      throw `Failed to update order ${updatedOrder.order_ID}`
    }
    return updatedOrder
  } catch (error) {
    throw new Error(error)
  }
}

export const orderService = {
  getOrders,
  deleteOrder: deleteOrder,
  createOrder,
  editOrder
}
