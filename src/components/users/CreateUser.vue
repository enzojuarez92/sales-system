<template>
  <div v-if="flashMessage" class="alert alert-success alert-dismissible fade show" role="alert">
    {{ flashMessage }}
    <button type="button" class="btn-close" @click="flashMessage = ''"></button>
  </div>

  <div
    class="mb-2 bg-light px-3 py-1 border rounded-2 d-flex justify-content-between align-items-center"
  >
    <div>
      <router-link
        :to="{ name: 'UserList' }"
        class="h5 text-decoration-none text-gray-primary fw-semibold fst-italic"
      >
        <font-awesome-icon icon="fa-regular fa-circle-left" class="me-1" />
        Usuarios
      </router-link>
      <h5 class="fw-bold text-dark mt-3">
        {{ route.params.id ? 'Editar Usuario' : 'Nuevo Usuario' }}
      </h5>
    </div>
  </div>

  <Form @submit="handleSubmit" v-slot="{ setErrors }">
    <div class="row">
      <div class="col-12 col-md-8 mb-3 mb-md-0">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label col-form-label-sm fw-bold">Nombre</label>
                <Field
                  name="name"
                  v-model="newUser.name"
                  :rules="rules.name"
                  v-slot="{ field, errors }"
                >
                  <input
                    v-bind="field"
                    type="text"
                    class="form-control form-control-sm"
                    :class="errors.length ? 'is-invalid' : field.value ? 'is-valid' : ''"
                    placeholder="Nombre"
                  />
                  <div class="invalid-feedback d-block" v-if="errors.length">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label col-form-label-sm fw-bold">Apellido</label>
                <Field
                  name="lastname"
                  v-model="newUser.lastname"
                  :rules="rules.lastname"
                  v-slot="{ field, errors }"
                >
                  <input
                    v-bind="field"
                    type="text"
                    class="form-control form-control-sm"
                    :class="errors.length ? 'is-invalid' : field.value ? 'is-valid' : ''"
                    placeholder="Apellido"
                  />
                  <div class="invalid-feedback d-block" v-if="errors.length">{{ errors[0] }}</div>
                </Field>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Documento</label>
                <Field
                  name="document"
                  v-model="newUser.document"
                  :rules="rules.document"
                  v-slot="{ field, errors }"
                >
                  <input
                    v-bind="field"
                    type="text"
                    class="form-control form-control-sm"
                    :class="errors.length ? 'is-invalid' : field.value ? 'is-valid' : ''"
                    placeholder="Documento"
                  />
                  <div class="invalid-feedback d-block" v-if="errors.length">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Género</label>
                <Field
                  name="gender"
                  v-model="newUser.gender"
                  :rules="rules.gender"
                  v-slot="{ field, errors }"
                >
                  <select
                    v-bind="field"
                    class="form-select form-select-sm"
                    :class="errors.length ? 'is-invalid' : field.value ? 'is-valid' : ''"
                  >
                    <option value="" disabled>Seleccione un valor</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                  <div class="invalid-feedback d-block" v-if="errors.length">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Fecha de Nacimiento</label>
                <Field
                  name="dateOfBirth"
                  v-model="newUser.dateOfBirth"
                  :rules="rules.date"
                  v-slot="{ field, errors }"
                >
                  <input
                    v-bind="field"
                    type="date"
                    class="form-control form-control-sm"
                    :class="errors.length ? 'is-invalid' : field.value ? 'is-valid' : ''"
                  />
                  <div class="invalid-feedback d-block" v-if="errors.length">{{ errors[0] }}</div>
                </Field>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Correo Electrónico</label>
                <Field
                  name="email"
                  v-model="newUser.email"
                  :rules="rules.email"
                  v-slot="{ field, errors }"
                >
                  <input
                    v-bind="field"
                    type="email"
                    class="form-control form-control-sm"
                    :class="errors.length ? 'is-invalid' : field.value ? 'is-valid' : ''"
                    placeholder="juan@ejemplo.com"
                  />
                  <div class="invalid-feedback d-block" v-if="errors.length">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Usuario</label>
                <Field
                  name="username"
                  v-model="newUser.username"
                  :rules="rules.username"
                  v-slot="{ field, errors }"
                >
                  <input
                    v-bind="field"
                    type="text"
                    class="form-control form-control-sm"
                    :class="errors.length ? 'is-invalid' : field.value ? 'is-valid' : ''"
                  />
                  <div class="invalid-feedback d-block" v-if="errors.length">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-4" v-if="!route.params.id">
                <label class="form-label col-form-label-sm fw-bold">Contraseña</label>
                <input
                  type="password"
                  :value="newUser.document"
                  class="form-control form-control-sm bg-light"
                  disabled
                />
                <small class="text-muted">Se usará el documento como clave</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card border-0 shadow-sm text-center p-3">
          <div class="d-flex justify-content-center">
            <img
              src="../../assets/img/user-perfil.png"
              class="rounded-circle img-thumbnail"
              alt="Perfil"
              style="width: 120px; height: 120px; object-fit: cover"
            />
          </div>
          <div class="card-body">
            <h6 class="fw-bold mb-0">
              {{ (newUser.name || '') + ' ' + (newUser.lastname || '') || 'Nuevo Usuario' }}
            </h6>
            <small class="text-muted">{{ newUser.email || 'usuario@correo.com' }}</small>
            <hr />
            <p class="small text-secondary">Previsualización del perfil del nuevo usuario.</p>
            <div class="bg-light border-top-0 d-flex justify-content-center">
              <form-actions
                :loading="userStore.loading"
                :submit-text="route.params.id ? 'Guardar Cambios' : 'Registrar Usuario'"
                :icon="route.params.id ? 'save' : 'user-plus'"
                @cancel="router.push({ name: 'UserList' })"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { Form, Field } from 'vee-validate'
import FormActions from '../common/FormActions.vue'
import type { User } from '@/types/user'
import { useToast } from 'vue-toastification'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const flashMessage = ref('')
const toast = useToast()

const newUser = ref<Partial<User>>({
  name: '',
  lastname: '',
  gender: '',
  document: '',
  dateOfBirth: undefined,
  email: '',
  username: '',
})

// REGLAS DE VALIDACIÓN
const rules = {
  name: (val: string) => {
    if (!val) return 'El nombre es requerido'
    if (val.length > 30) return 'Máximo 30 caracteres'
    return true
  },
  lastname: (val: string) => {
    if (!val) return 'El apellido es requerido'
    if (val.length > 30) return 'Máximo 30 caracteres'
    return true
  },
  gender: (val: string) => (val ? true : 'Seleccione un género'),
  document: (val: string) => {
    if (!val) return 'El documento es requerido'
    if (!/^\d+$/.test(val)) return 'Solo números'
    if (val.length < 5 || val.length > 10) return 'Entre 5 y 10 dígitos'
    return true
  },
  date: (val: string) => (val ? true : 'La fecha es requerida'),
  email: (val: string) => {
    if (!val) return 'El email es requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Email inválido'
    return true
  },
  username: (val: string) => {
    if (!val) return 'El usuario es requerido'
    if (val.length < 5 || val.length > 30) return 'Entre 5 y 30 caracteres'
    return true
  },
}

/**
 * Carga los datos si existe un ID en la URL
 */
const loadUser = async () => {
  const id = route.params.id
  if (id) {
    try {
      const user = await userStore.getUserById(id as string)
      newUser.value = { ...user }
    } catch (err) {
      toast.error('No se pudo cargar los datos del usuario')
    }
  } else {
    newUser.value = {
      name: '',
      lastname: '',
      gender: '',
      document: '',
      dateOfBirth: undefined,
      email: '',
      username: '',
    }
  }
}

// Escuchamos cambios en la URL (por si el usuario pasa de editar uno a crear otro)
watch(
  () => route.params.id,
  () => {
    loadUser()
  },
)

onMounted(() => {
  loadUser()
})

const handleSubmit = async (values: any, { setErrors }: any) => {
  try {
    const payload = { ...newUser.value, ...values }

    if (route.params.id) {
      await userStore.updateUser(route.params.id as string, payload)
      toast.success('¡Usuario actualizado con éxito!')
    } else {
      const createdUser = await userStore.createUser(payload)
      toast.success('¡Usuario creado con éxito!')
      router.push({ name: 'UserEdit', params: { id: createdUser.id } })
    }
  } catch (err: any) {
    console.error('Error capturado en handleSubmit:', err) // <--- ESTO ES CLAVE

    if (err.status === 422 && err.serverErrors) {
      setErrors(err.serverErrors)
      toast.warning('Por favor, revisa los errores en el formulario')
    } else {
      toast.error(err.message || 'Error al procesar la solicitud')
    }
  }
}
</script>
