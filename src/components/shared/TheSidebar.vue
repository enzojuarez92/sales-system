<template>
  <div class="bg-gray-primary d-flex flex-column shadow" :class="sidebarClasses">
    <div class="d-flex flex-column flex-grow-1">
      <div class="px-4 py-3 d-flex align-items-center justify-content-between">
        <h3 v-if="isOpen" class="h4 fw-semibold text-light mb-0">
          <span>Sistema Ventas</span>
        </h3>

        <font-awesome-icon
          @click="emit('toggle')"
          :icon="['fas', isOpen ? 'chevron-left' : 'chevron-right']"
          class="text-light cursor-pointer"
          :class="['fa-lg', 'fw-semibold', !isOpen ? 'mx-auto' : '']"
        />
      </div>

      <nav class="mt-4 px-2">
        <div class="nav-item mb-1">
          <router-link
            :to="{ name: 'UserList' }"
            class="d-flex align-items-center px-3 py-2 text-white rounded-3 hover-bg-secondary text-decoration-none mb-2"
            :class="{ 'justify-content-center': !isOpen }"
          >
            <font-awesome-icon
              icon="fa-solid fa-users"
              class="fa-lg flex-shrink-0"
              :class="{ 'me-3': isOpen }"
            />
            <span v-if="isOpen" class="fw-semibold">Usuarios</span>
          </router-link>
          <div class="collapse" id="collapseUsuarios">
            <div
              class="d-flex flex-column gap-1 mt-1"
              :class="{ 'ms-4 ps-2 border-start border-secondary': isOpen }"
            >
              <router-link
                :to="{ name: 'UserList' }"
                class="nav-link text-white-50 py-2 px-3 small hover-text-white"
                >Lista Usuarios</router-link
              >
              <router-link
                to="/usuarios/nuevo"
                class="nav-link text-white-50 py-2 px-3 small hover-text-white"
                >Crear Usuario</router-link
              >
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['toggle'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
})

const sidebarClasses = computed(() => [
  'vh-100',
  'position-fixed',
  'z-3',
  'top-0',
  'start-0',
  'transition-width',
  'duration-300',
  'ease-in-out',
  props.isOpen ? 'w-64' : 'w-20',
])
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.w-64 {
  width: 16rem;
}
.w-20 {
  width: 5rem;
}

.transition-width {
  transition: width 0.3s ease-in-out;
}

.hover-bg-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hover-text-white:hover {
  color: white !important;
}

/* Animación de la flecha cuando se abre el collapse */
[aria-expanded='true'] .arrow-icon {
  transform: rotate(180deg);
}
.arrow-icon {
  transition: transform 0.3s ease;
}

.transition-all {
  transition: all 0.2s ease;
}

/* Estética extra para el borde lateral del submenú */
.border-secondary {
  border-color: rgba(255, 255, 255, 0.2) !important;
}
</style>
