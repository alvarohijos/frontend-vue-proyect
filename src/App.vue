<template>
  <div id="app">
    <Sidebar />
    <div id="content">
      <router-view></router-view> <!-- El contenido de las vistas se carga aquí -->
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';  // Importa el componente Sidebar

export default {
  name: 'App',
  components: {
    Sidebar,  // Agrega el componente Sidebar
  },
};
</script>

<style>
#app {
  display: flex;
  height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
}

#content {
  margin-left: 240px; /* Aumentado el margen izquierdo para mayor separación */
  padding: 20px;
  flex-grow: 1; /* Hace que el contenido ocupe el espacio restante */
  background-color: #f9f9f9; /* Color de fondo claro para el contenido */
  overflow-y: auto; /* Permite desplazamiento si el contenido es muy largo */
}
</style>
