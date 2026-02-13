<template>
  <nav aria-label="breadcrumb" class="my-1">
    <ol
      class="breadcrumb bg-white px-3 py-2 rounded-3 shadow-sm border-start border-4 custom-border-primary"
    >
      <li class="breadcrumb-item d-flex align-items-center">
        <router-link to="/" class="text-decoration-none fw-bold custom-text-primary">
          <font-awesome-icon icon="fa-solid fa-house" class="me-2 small" />
          Inicio
        </router-link>
      </li>

      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item d-flex align-items-center"
        :class="{ active: index === breadcrumbs.length - 1 }"
        :aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
      >
        <router-link
          v-if="index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="text-decoration-none fw-semibold custom-text-primary hover-gold"
        >
          {{ crumb.name }}
        </router-link>

        <span v-else class="text-muted fw-medium italic-item">
          {{ crumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched.filter((r) => r.meta && r.meta.breadcrumb)
  return matchedRoutes.map((r) => ({
    name: r.meta.breadcrumb,
    path: r.path || '/',
  }))
})
</script>

<style scoped>
/* Tu color gray-primary definido manualmente para el CSS */
.custom-text-primary {
  color: #385669;
}

.custom-border-primary {
  border-left-color: #385669 !important;
}

/* Efecto dorado al pasar el mouse (gray-secondary) */
.hover-gold:hover {
  color: #d1a15e;
  transition: color 0.2s ease-in-out;
}

/* Estilo para el texto de la página actual */
.italic-item {
  font-style: italic;
  font-size: 0.95rem;
}

/* Personalización del separador ">" */
.breadcrumb-item + .breadcrumb-item::before {
  content: '>';
  color: #ced4da; /* Un gris suave para el separador */
  font-weight: bold;
  padding-right: 0.5rem;
}

/* Fuente y alineación global */
.breadcrumb {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  display: inline-flex;
  align-items: center;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}
</style>
