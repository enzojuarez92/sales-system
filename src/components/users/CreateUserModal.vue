<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header bg-light">
          <h5 class="modal-title fw-bold text-dark">Crear Nuevo Usuario</h5>
          <button type="button" class="btn-close" @click="emit('close')"></button>
        </div>

        <form>
          <div class="modal-body p-4">
            <div class="row mb-3">
              <div class="col-12 col-md-6">
                <label for="name" class="form-label col-form-label-sm fw-bold">Nombre</label>
                <input
                  type="text"
                  id="name"
                  v-model="newUser.name"
                  class="form-control form-control-sm"
                  placeholder="Normbre"
                  required
                />
              </div>
              <div class="col-12 col-md-6">
                <label for="lastname" class="form-label col-form-label-sm fw-bold">Apellido</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="lastname"
                  v-model="newUser.lastname"
                  placeholder="Apellido"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-12 col-md-4">
                <label for="document" class="form-label col-form-label-sm fw-bold">Documento</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="document"
                  v-model="newUser.document"
                  placeholder="Documento de Identidad"
                />
              </div>
              <div class="col-12 col-md-4">
                <label for="gender" class="form-label col-form-label-sm fw-bold">Genero</label>
                <select
                  name="gender"
                  id="gender"
                  class="form-select form-select-sm"
                  v-model="newUser.gender"
                >
                  <option selected>Seleccione un valor</option>
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                </select>
              </div>
              <div class="col-12 col-md-4">
                <label for="dateOfBirth" class="form-label col-form-label-sm fw-bold"
                  >Fecha de Nacimiento</label
                >
                <input
                  type="date"
                  class="form-control form-control-sm"
                  id="dateOfBirth"
                  v-model="newUser.dateOfBirth"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-12 col-md-4">
                <label for="email" class="form-label col-form-label-sm fw-bold"
                  >Correo Electrónico</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="newUser.email"
                  class="form-control form-control-sm"
                  placeholder="juan@ejemplo.com"
                  required
                />
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Usuario</label>
                <input
                  type="text"
                  v-model="newUser.username"
                  class="form-control form-control-sm"
                  required
                />
              </div>
              <div class="col-12 col-md-4">
                <label class="form-label col-form-label-sm fw-bold">Documento</label>
                <input
                  type="text"
                  v-model="newUser.document"
                  class="form-control form-control-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div class="modal-footer bg-light border-top-0">
            <FormActions
              :loading="loading"
              submit-text="Registrar Usuario"
              icon="user-plus"
              @cancel="emit('close')"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import FormActions from '../common/FormActions.vue'

const emit = defineEmits(['close', 'userCreated'])
const userStore = useUserStore()

const loading = ref(false)
const newUser = ref({
  name: '',
  email: '',
  username: '',
  document: '',
  lastname: '', // Si quieres completar el perfil
  dateOfBirth: '',
})

const submitForm = async () => {
  loading.value = true
  try {
    // Usamos el método real de tu Pinia Store que ya definiste
    const created = await userStore.createUser(newUser.value)

    // Notificamos al padre
    emit('userCreated', created)

    // Limpiamos y cerramos
    newUser.value = { name: '', email: '', username: '', document: '' }
    emit('close')
  } catch (error) {
    alert('Error al crear el usuario: ' + error.message)
  } finally {
    loading.value = false
  }
}
</script>
