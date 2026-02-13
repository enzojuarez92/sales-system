<template>
  <div class="d-flex justify-content-between align-items-center mt-3 px-2">
    <small class="text-gray-primary fw-bold fst-italic">
      Total <span>{{ total }}</span> registros listados
    </small>

    <nav>
      <ul class="pagination pagination-sm mb-0 gap-1">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="btn-nav" @click="currentPage > 1 && $emit('changePage', currentPage - 1)">
            <font-awesome-icon icon="fa-solid fa-chevron-left" class="me-1" />
            Anterior
          </button>
        </li>

        <li v-for="page in lastPage" :key="page" class="page-item">
          <button
            class="btn-page"
            :class="{ active: page === currentPage }"
            @click="$emit('changePage', page)"
          >
            {{ page }}
          </button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === lastPage }">
          <button
            class="btn-nav"
            @click="currentPage < lastPage && $emit('changePage', currentPage + 1)"
          >
            Siguiente
            <font-awesome-icon icon="fa-solid fa-chevron-right" class="ms-1" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  lastPage: number
  total: number
}>()

defineEmits(['changePage'])
</script>

<style scoped>
/* Botones de navegación (Anterior/Siguiente) como links */
.btn-nav {
  background: none;
  border: none;
  color: #6c757d;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 5px 10px;
  transition: color 0.2s;
}

.btn-nav:hover:not(:disabled) {
  color: #385669; /* Tu color gray-primary */
}

.disabled .btn-nav {
  color: #dee2e6;
  cursor: not-allowed;
}

/* Botones numéricos redondos */
.btn-page {
  width: 32px;
  height: 32px;
  border-radius: 50%; /* Redondos */
  border: 1px solid #dee2e6;
  background-color: white;
  color: #385669;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-page:hover {
  background-color: #f8f9fa;
  border-color: #385669;
}

.btn-page.active {
  background-color: #385669; /* bg-gray-primary */
  color: white;
  border-color: #385669;
  box-shadow: 0 2px 4px rgba(56, 86, 105, 0.3);
}
</style>
