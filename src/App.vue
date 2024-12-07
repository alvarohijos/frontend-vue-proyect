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
}

#content {
  margin-left: 220px; /* Espacio para el menú lateral */
  padding: 20px;
  width: 100%;
}
</style>


