<template>
  <div v-if="show" class="modal fade show d-block" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title fw-bold text-dark">{{ title }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body py-3">
          <div class="d-flex align-items-center gap-3">
            <div class="bg-danger text-light p-2 rounded">
              <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="lg" />
            </div>
            <p class="mb-0 text-secondary">{{ message }}</p>
          </div>
        </div>
        <div class="modal-footer border-0 pt-0">
          <button type="button" class="btn btn-light btn-sm fw-semibold" @click="$emit('close')">
            Cancelar
          </button>
          <button
            type="button"
            class="btn btn-danger btn-sm fw-semibold px-3"
            :disabled="loading"
            @click="$emit('confirm')"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
            {{ loading ? 'Eliminando...' : confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  message: string
  confirmText: string
  loading?: boolean
}>()

defineEmits(['close', 'confirm'])
</script>

<style scoped></style>
