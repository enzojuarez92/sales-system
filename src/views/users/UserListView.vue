<template>
  <div class="container-fluid">
    <div v-if="flashMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ flashMessage }}
      <button type="button" class="btn-close" @click="flashMessage = ''"></button>
    </div>

    <div
      class="mb-2 bg-light px-3 py-1 border rounded-2 d-flex justify-content-between align-items-center"
    >
      <div class="div">
        <h5 class="fw-bold text-dark">Usuarios</h5>
        <p>Crea y gestiona la información de los usuarios que tendrán acceso a tu sistema.</p>
      </div>
      <router-link
        :to="{ name: 'UserCreate' }"
        class="btn btn-sm btn-gray-primary d-flex align-items-center gap-2"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        <span>Agregar Usuario</span>
      </router-link>
    </div>
    <div class="card shadow-sm border-0">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="table-primary">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Email</th>
                <th scope="col">Documento</th>
                <th scope="col">Fecha Nac.</th>
                <th scope="col">Usuario</th>
                <th scope="col" class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in userStore.users" :key="u.id" class="transition-all">
                <td>{{ u.name }}</td>
                <td>{{ u.lastname }}</td>
                <td>{{ u.email }}</td>
                <td>{{ formatDocument(u.document) }}</td>
                <td>{{ formatDate(u.dateOfBirth) }}</td>
                <td>{{ u.username }}</td>
                <td class="px-4 text-center">
                  <div class="dropdown">
                    <font-awesome-icon
                      icon="fa-solid fa-ellipsis-vertical"
                      class="dropdown-toggle text-gray-info"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <ul class="dropdown-menu">
                      <li>
                        <router-link
                          :to="{ name: 'UserEdit', params: { id: u.id } }"
                          class="text-decoration-none dropdown-item"
                        >
                          <font-awesome-icon icon="fa-regular fa-pen-to-square" class="me-2" />
                          Editar
                        </router-link>
                      </li>
                      <li class="cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          class="text-decoration-none dropdown-item"
                          @click="openDeleteModal(u)"
                        >
                          <font-awesome-icon icon="fa-regular fa-trash-can" class="me-2" />
                          Eliminar
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr v-if="userStore.users.length === 0">
                <td colspan="7" class="text-center py-5 text-muted">
                  No se encontraron usuarios registrados.
                </td>
              </tr>
            </tbody>
          </table>
          <pagination
            :current-page="userStore.pagination.current_page"
            :last-page="userStore.pagination.last_page"
            :total="userStore.pagination.total"
            @change-page="userStore.getUsers"
          />
        </div>
      </div>
    </div>
  </div>

  <confirm-modal
  :show="showConfirmModal"
  title="Eliminar Usuario"
  :message="`¿Estás seguro de eliminar a ${userToDelete?.name}?`"
  confirm-text="Sí, Eliminar"
  :loading="isDeleting"
  @close="showConfirmModal = false"
  @confirm="confirmDelete" 
/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import Pagination from '@/components/common/Pagination.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { useToast } from 'vue-toastification'
import { formatDate, formatDocument } from '@/utils/helpers'

const flashMessage = ref('')
const userStore = useUserStore()

onMounted(() => {
  userStore.getUsers()
})

const showConfirmModal = ref(false)
const userToDelete = ref<any>(null)
const isDeleting = ref(false)
const toast = useToast()

// Función para abrir el modal y setear el usuario
const openDeleteModal = (user: any) => {
  userToDelete.value = user
  showConfirmModal.value = true
}

const confirmDelete = async () => {
  if (!userToDelete.value) return
  isDeleting.value = true
  try {
    await userStore.deleteUser(userToDelete.value.id) // Llamamos al Store
    toast.success('Usuario eliminado correctamente',{
      position: 'bottom-rigth',
      timeout: 3000,
    })
    showConfirmModal.value = false
  } catch (err) {
    toast.error('Ocurrió un error al intentar eliminar')
  } finally {
    isDeleting.value = false
    userToDelete.value = null
  }
}
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Aseguramos que el cuerpo de la card tenga un espacio digno siempre */
.card-body {
  min-height: 400px; /* Ajustá este valor a tu gusto */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Esto empuja la paginación siempre al fondo */
}

.table-responsive {
  flex-grow: 1; /* Hace que la tabla ocupe el espacio disponible */
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
