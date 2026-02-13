import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    total: 1,
  })

  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getUserById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${apiUrl}/users/${id}`, {
        headers: { Accept: 'application/json' },
      })

      if (!res.ok) throw new Error('Error al obtener el usuario')

      const data: User = await res.json()
      currentUser.value = data
      return data
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const getUsers = async (page = 1) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${apiUrl}/users?page=${page}`)
      //console.log(apiUrl + '/users')
      if (!res.ok) throw new Error('Error HTTP ' + res.status)
      const data = await res.json()
      users.value = data.data
      pagination.value = {
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createUser = async (newUser: Partial<User>) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (!res.ok) {
        const errData = await res.json()
        const customError: any = new Error('Validation Error')
        customError.status = res.status
        customError.serverErrors = errData.errors
        throw customError
      }

      const created = await res.json()
      users.value.push(created)
      return created
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id: string, userData: Partial<User>) => {
    loading.value = true
    try {
      const res = await fetch(`${apiUrl}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!res.ok) {
        const errData = await res.json()
        const customError: any = new Error('Validation Error')
        customError.status = res.status
        customError.serverErrors = errData.errors
        throw customError
      }

      const updated = await res.json()
      currentUser.value = updated
      return updated
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: string) => {
  loading.value = true
  try {
    const res = await fetch(`${apiUrl}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (!res.ok) throw new Error('Error HTTP ' + res.status)

    await getUsers(pagination.value.current_page)

  } catch (error) {
    console.error("Error al eliminar:", error)
    throw error 
  } finally {
    loading.value = false
  }
}

  return {
    users,
    currentUser,
    loading,
    error,
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    pagination,
  }
})
