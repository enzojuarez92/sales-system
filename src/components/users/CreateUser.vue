<template>
  <div v-if="flashMessage" class="alert alert-success alert-dismissible fade show" role="alert">
    {{ flashMessage }}
    <button type="button" class="btn-close" @click="flashMessage = ''"></button>
  </div>

  <div class="mb-2 bg-light px-3 py-1 border rounded-2 d-flex justify-content-between align-items-center">
    <div>
      <router-link :to="{ name: 'UserList' }" class="h5 text-decoration-none text-gray-primary fw-semibold fst-italic">
        <font-awesome-icon icon="fa-regular fa-circle-left" class="me-1" />
        Usuarios
      </router-link>
      <h5 class="fw-bold text-dark mt-3">
        {{ route.params.id ? 'Editar Usuario' : 'Nuevo Usuario' }}
      </h5>
    </div>
  </div>

  <Form :validation-schema="userSchema" @submit="handleSubmit" v-slot="{ setErrors, errors }">
    <div class="row">
      <div class="col-12 col-md-8 mb-3 mb-md-0">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label col-form-label-sm fw-bold">Nombre</label>
                <Field name="name" v-model="newUser.name" v-slot="{ field, errors }">
                  <input v-bind="field" type="text" class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.length, 'is-valid': field.value && !errors.length }" placeholder="Nombre" />
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label col-form-label-sm fw-bold">Apellido</label>
                <Field name="lastname" v-model="newUser.lastname" v-slot="{ field, errors }">
                  <input v-bind="field" type="text" class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.length, 'is-valid': field.value && !errors.length }" placeholder="Apellido" />
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </Field>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Documento</label>
                <Field name="document" v-model="newUser.document" v-slot="{ field, errors }">
                  <input v-bind="field" v-maska data-maska="##.###.###" type="text" class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.length, 'is-valid': field.value && !errors.length }" placeholder="11.222.333" />
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Género</label>
                <Field name="gender" v-model="newUser.gender" v-slot="{ field, errors }">
                  <select v-bind="field" class="form-select form-select-sm"
                    :class="{ 'is-invalid': errors.length, 'is-valid': field.value && !errors.length }">
                    <option value="" disabled>Seleccione un valor</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Fecha de Nacimiento</label>
                <Field name="dateOfBirth" v-model="newUser.dateOfBirth" v-slot="{ field, errors }">
                  <input v-bind="field" type="date" class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.length, 'is-valid': field.value && !errors.length }" />
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </Field>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Correo Electrónico</label>
                <Field name="email" v-model="newUser.email" v-slot="{ field, errors }">
                  <input v-bind="field" type="email" class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.length, 'is-valid': field.value && !errors.length }" placeholder="juan@ejemplo.com" />
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Usuario</label>
                <Field name="username" v-model="newUser.username" v-slot="{ field, errors }">
                  <input v-bind="field" type="text" class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.length, 'is-valid': field.value && !errors.length }" />
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </Field>
              </div>

              <div class="col-12 col-md-4" v-if="!route.params.id">
                <label class="form-label col-form-label-sm fw-bold">Contraseña</label>
                <input type="password" :value="newUser.document" class="form-control form-control-sm bg-light" disabled />
                <small class="text-muted">Se usará el documento como clave</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card border-0 shadow-sm text-center p-3">
          <div class="d-flex justify-content-center">
            <img src="../../assets/img/user-perfil.png" class="rounded-circle img-thumbnail" alt="Perfil"
              style="width: 120px; height: 120px; object-fit: cover" />
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
              :loading="loading" 
              :submit-text="route.params.id ? 'Guardar Cambios' : 'Registrar Usuario'"
              :icon="route.params.id ? 'save' : 'user-plus'" 
              :cancelText="route.params.id ? 'Volver' : 'Cancelar'"
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
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router' 
import { Form, Field } from 'vee-validate'
import { vMaska } from "maska/vue"
import { userSchema } from '@/schemas/UserSchema'
import { useUserForm } from '@/composable/useUserForm' 
import FormActions from '../common/FormActions.vue'

const route = useRoute()
const router = useRouter() 

const { newUser, loadUser, submitForm, loading } = useUserForm()

const handleSubmit = async (values: any) => {
  try {
    const id = (route.params.id as string) || null
    await submitForm(id, values)
  } catch (err: any) {
    // Aquí podrías usar setErrors si el composable te devuelve los errores del servidor
    console.error("Error en el formulario:", err)
  }
}

watch(() => route.params.id, (newId) => loadUser(newId as string))
onMounted(() => loadUser(route.params.id as string))
</script>