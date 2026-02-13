<template>
  <div class="d-flex">
    <button
      type="button"
      class="btn btn-sm btn-light border fw-semibold me-2"
      @click="emit('cancel')"
      :disabled="loading"
    >
      {{ cancelText }}
    </button>
    <button
      type="submit"
      class="btn btn-sm btn-gray-primary px-4 fw-semibold shadow-sm d-flex align-items-center"
      :disabled="loading"
    >
      <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
      <font-awesome-icon v-if="!loading" :icon="['fas', icon]" class="me-2" />
      {{ loading ? loadingText : submitText }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean,
  submitText: { type: String, default: 'Guardar' },
  loadingText: { type: String, default: 'Guardando...' },
  cancelText: { type: String, default: 'Cancelar' },
  icon: { type: String, default: 'floppy-disk' }, // Solo el nombre sin fa-
})

const emit = defineEmits(['cancel'])
</script>
