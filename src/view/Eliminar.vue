<template>
    <MiHeader></MiHeader>
    <div>
      <!-- Campo para ingresar el ID de la organización y un botón para eliminarla -->
      <input v-model="organizacion_id" type="text" placeholder="Ingrese ID de organización para eliminar">
      <button @click="eliminarOrganizacion">Eliminar Organización</button>
  
      <!-- Mostrar mensaje de acción -->
      <div v-if="mensaje">{{ mensaje }}</div>
    </div>
  </template>
  
  <script setup>
  import MiHeader from '@/components/MiHeader.vue';
  import { ref } from 'vue';
  
  // Variables reactivas
  const organizacion_id = ref("");
  const mensaje = ref(null);
  
  // Función para eliminar la organización
  const eliminarOrganizacion = async () => {
    try {
      // Realizamos la solicitud de eliminación al backend
      const respuesta = await fetch(`http://localhost:8080/organizaciones/${organizacion_id.value}`, {
        method: 'DELETE',  // Método DELETE para eliminar
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Verificamos si la respuesta es exitosa
      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar la organización");
      }
  
      // Si es exitosa, mostramos mensaje de éxito
      mensaje.value = "Organización eliminada exitosamente";
      organizacion_id.value = "";  // Limpiamos el campo de ID de organización
  
    } catch (error) {
      // Si ocurre un error, mostramos el mensaje de error
      mensaje.value = `Error: ${error.message}`;
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para la interfaz */
  div {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  input {
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #FF0000;  /* Color rojo para eliminar */
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c40000;
  }
  
  div[v-if] {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #004aad;
  }
  </style>
  