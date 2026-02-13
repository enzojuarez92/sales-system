<template>
  <header class="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
    <h1 class="h5 mb-0 fw-bold text-dark"></h1>

    <div class="dropdown">
      <a
        href="#"
        class="text-gray-secondary"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <font-awesome-icon
          :icon="['far', 'circle-user']"
          class="fa-2xl cursor-pointer hover-primary"
        />
      </a>

      <ul class="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userDropdown">
        <li class="px-3 py-2 border-bottom">
          <p class="mb-0 small fw-bold">Administrador</p>
          <p class="mb-0 x-small text-muted">admin@sistema.com</p>
        </li>
        <li>
          <a class="dropdown-item mt-2" href="#"
            ><font-awesome-icon icon="fa-solid fa-user" class="me-2" /> Perfil</a
          >
        </li>
        <li>
          <a class="dropdown-item" href="#"
            ><font-awesome-icon icon="fa-solid fa-gear" class="me-2" /> Configuración</a
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a class="dropdown-item text-danger" href="#"
            ><font-awesome-icon icon="fa-solid fa-right-from-bracket" class="me-2" /> Cerrar
            Sesión</a
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.hover-primary:hover {
  color: #385669; /* Tu gray-primary */
  transition: color 0.2s ease;
}

.x-small {
  font-size: 0.75rem;
}
</style>
