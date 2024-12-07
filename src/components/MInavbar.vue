<<script setup lang="ts">
import router from '@/router';
</script>

<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/insertar">Insertar</router-link></li>
      <li><router-link to="/consultar">Consultar</router-link></li>
      <li><router-link to="/actualizar">Actualizar</router-link></li>
      <li><router-link to="/eliminar">Eliminar</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: flex-start; /* Alinea el menú a la izquierda */
  background-color: #333;
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
}

nav ul {
  display: flex;
  gap: 20px; /* Aumentamos el espacio entre los botones */
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin: 0;
}

nav ul li a {
  text-decoration: none;
  color: rgb(253, 253, 255);
  padding: 5px 15px; /* Aumentamos el tamaño del botón */
  border-radius: 4px;
}

nav ul li a:hover {
  text-decoration: underline;
  background-color: rgb(4, 196, 255);
}
</style>
