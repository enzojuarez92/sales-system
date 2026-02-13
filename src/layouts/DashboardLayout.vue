<template>
  <div class="d-flex">
    <TheSidebar :is-open="isSidebarOpen" @toggle="isSidebarOpen = !isSidebarOpen" />

    <main :class="contentClasses" class="min-vh-100 bg-secondary bg-opacity-25 w-100">
      <TheNavBar />
      <section class="py-4 px-1">
        <div class="container-fluid">
          <!-- <AppBreadcrumbs /> -->
          <router-view />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TheSidebar from '@/components/shared/TheSidebar.vue'
import TheNavBar from '@/components/shared/TheNavBar.vue'
import AppBreadcrumbs from '@/components/shared/AppBreadcrumbs.vue'

const isSidebarOpen = ref(true)

const contentClasses = computed(() => [
  'flex-grow-1',
  'transition-margin', // Nuestra clase para el efecto suave
  isSidebarOpen.value ? 'ms-sidebar-open' : 'ms-sidebar-collapsed',
])
</script>

<style scoped>
.transition-margin {
  transition: margin-left 0.3s ease-in-out;
}

.ms-sidebar-open {
  margin-left: 16rem;
}

.ms-sidebar-collapsed {
  margin-left: 5rem;
}

@media (max-width: 768px) {
  .ms-sidebar-open,
  .ms-sidebar-collapsed {
    margin-left: 0;
  }
}
</style>
