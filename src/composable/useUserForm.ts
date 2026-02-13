import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import type { User } from '@/types/user'

export function useUserForm() {
  const userStore = useUserStore()
  const toast = useToast()
  const router = useRouter()

  const newUser = ref<Partial<User>>({
    name: '',
    lastname: '',
    gender: '',
    document: '',
    dateOfBirth: undefined,
    email: '',
    username: '',
  })

  const loadUser = async (id?: string) => {
    if (id) {
      try {
        const user = await userStore.getUserById(id)
        newUser.value = { ...user }
      } catch (err) {
        toast.error('No se pudo cargar los datos del usuario')
      }
    } else {
      resetForm()
    }
  }

  const resetForm = () => {
    newUser.value = { name: '', lastname: '', gender: '', document: '', dateOfBirth: undefined, email: '', username: '' }
  }

  const submitForm = async (id: string | null, values: any) => {
    const payload = { ...newUser.value, ...values }
    
    // Limpieza de puntos del documento antes de enviar
    if (payload.document) {
      payload.document = payload.document.replace(/\./g, '')
    }

    if (id) {
      await userStore.updateUser(id, payload)
      toast.success('¡Usuario actualizado con éxito!', { position: 'bottom-right' })
    } else {
      const createdUser = await userStore.createUser(payload)
      toast.success('¡Usuario creado con éxito!')
      router.push({ name: 'UserEdit', params: { id: createdUser.id } })
    }
  }

  return {
    newUser,
    loadUser,
    submitForm,
    loading: userStore.loading
  }
}