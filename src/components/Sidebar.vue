<!-- Sidebar.vue -->
<template>
  <div class="sidebar">
    <ul>
      <li><router-link to="/organizaciones">Organizaciones</router-link></li>
      <li><router-link to="/proyectos">Proyectos</router-link></li>
      <li><router-link to="/impactos">Impactos</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
.sidebar {
  width: 200px; /* Tamaño del sidebar */
  background-color: #333; /* Fondo oscuro para el sidebar */
  color: white; /* Texto blanco para los enlaces */
  padding: 20px;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000; /* Asegura que el sidebar esté por encima de otros elementos */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 20px 0; /* Espacio entre los elementos del menú */
}

a {
  text-decoration: none;
  color: white; /* Enlaces en color blanco */
  font-size: 18px;
}

a:hover {
  color: #007bff; /* Color cuando se pasa el ratón */
}
</style>
