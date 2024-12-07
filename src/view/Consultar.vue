<template>
  <MiHeader></MiHeader>
  <div v-if="cargarDatos">Cargando datos de Organizaciones...</div>

  <h1>Consultar Organizaciones</h1>

  <!-- Campo para buscar por ID -->
  <div>
    <label for="idBusqueda">Buscar por ID:</label>
    <input type="number" v-model="idBusqueda" id="idBusqueda" placeholder="Ingrese el ID" />
    <button @click="consultarPorId">Buscar</button>
    
    <!-- Botón para mostrar todas las organizaciones -->
    <button @click="consultarTodas" v-if="idBusqueda === ''">Mostrar Todas</button>
  </div>

  <!-- Mensaje de error o estado -->
  <div v-if="mensaje" class="error">
    {{ mensaje }}
  </div>

  <!-- Tabla para mostrar datos -->
  <table v-if="!cargarDatos && data.length > 0">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Contacto</th>
        <th>Dirección</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ item.organizacionId || 'No disponible' }}</td> <!-- Mostrar organizacionId o 'No disponible' -->
        <td>{{ item.nombre }}</td>
        <td>{{ item.descripcion }}</td>
        <td>{{ item.contacto }}</td>
        <td>{{ item.direccion }}</td>
      </tr>
    </tbody>
  </table>

  <!-- Mensaje cuando no hay organizaciones -->
  <div v-else-if="!cargarDatos && data.length === 0">
    <p>No se encontraron organizaciones.</p>
  </div>
</template>

<script setup>
import MiHeader from '@/components/MiHeader.vue';
import { ref, onMounted } from 'vue';

const data = ref([]); // Almacenamos los datos de las organizaciones
const cargarDatos = ref(true); // Controla si se está cargando la información
const mensaje = ref(null); // Mensaje de error o información
const idBusqueda = ref(''); // ID ingresado por el usuario

// Función para cargar todas las organizaciones
const consultarTodas = async () => {
  try {
    cargarDatos.value = true;
    const respuesta = await fetch('http://localhost:8080/api/organizaciones');
    if (!respuesta.ok) {
      throw new Error('Error al consultar las organizaciones.');
    }
    data.value = await respuesta.json();
  } catch (error) {
    mensaje.value = error.message;
  } finally {
    cargarDatos.value = false;
  }
};

// Función para consultar por ID
const consultarPorId = async () => {
  if (!idBusqueda.value) {
    mensaje.value = 'Por favor, ingrese un ID válido.';
    return;
  }

  try {
    cargarDatos.value = true;
    const respuesta = await fetch(`http://localhost:8080/api/organizaciones/${idBusqueda.value}`);
    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        throw new Error(`No se encontró una organización con ID ${idBusqueda.value}.`);
      }
      throw new Error('Error al consultar la organización.');
    }
    const organizacion = await respuesta.json();
    data.value = [organizacion]; // Mostrar solo la organización encontrada
    mensaje.value = null; // Limpiar cualquier mensaje previo
  } catch (error) {
    mensaje.value = error.message;
    data.value = []; // Limpiar la tabla
  } finally {
    cargarDatos.value = false;
  }
};

// Llamar a consultarTodas al cargar el componente
onMounted(() => {
  consultarTodas();
});
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
