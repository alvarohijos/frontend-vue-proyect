<template>
    <div>
      <h1>Organizaciones</h1>
  
      <!-- Lista de organizaciones -->
      <div v-if="organizaciones.length">
        <h3>Lista de Organizaciones</h3>
        <ul>
          <li v-for="org in organizaciones" :key="org.id">
            {{ org.nombre }} - {{ org.descripcion }}
            <button @click="editarOrganizacion(org)">Editar</button>
            <button @click="eliminarOrganizacion(org.id)">Eliminar</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No hay organizaciones disponibles.</p>
      </div>
  
      <!-- Formulario de nuevo/actualizar organización -->
      <form @submit.prevent="guardarOrganizacion">
        <h3>{{ organizacion.id ? 'Editar' : 'Crear' }} Organización</h3>
  
        <label for="nombre">Nombre</label>
        <input v-model="organizacion.nombre" type="text" id="nombre" placeholder="Nombre de la organización" required />
  
        <label for="descripcion">Descripción</label>
        <input v-model="organizacion.descripcion" type="text" id="descripcion" placeholder="Descripción de la organización" />
  
        <label for="contacto">Contacto</label>
        <input v-model="organizacion.contacto" type="text" id="contacto" placeholder="Contacto de la organización" />
  
        <label for="direccion">Dirección</label>
        <input v-model="organizacion.direccion" type="text" id="direccion" placeholder="Dirección de la organización" />
  
        <button type="submit">{{ organizacion.id ? 'Actualizar' : 'Crear' }} Organización</button>
      </form>
  
      <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const organizacion = ref({
    id: '',
    nombre: '',
    descripcion: '',
    contacto: '',
    direccion: ''
  });
  const organizaciones = ref([]);
  const mensaje = ref('');
  
  // Cargar organizaciones
  const cargarOrganizaciones = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/organizaciones');
      if (response.ok) {
        organizaciones.value = await response.json();
      }
    } catch (error) {
      mensaje.value = `Error: ${error.message}`;
    }
  };
  
  // Guardar o actualizar organización
  const guardarOrganizacion = async () => {
    const url = organizacion.value.id
      ? `http://localhost:8080/api/organizaciones/${organizacion.value.id}`
      : 'http://localhost:8080/api/organizaciones';
  
    const method = organizacion.value.id ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(organizacion.value),
      });
  
      if (response.ok) {
        mensaje.value = organizacion.value.id ? 'Organización actualizada correctamente.' : 'Organización creada correctamente.';
        organizacion.value = { id: '', nombre: '', descripcion: '', contacto: '', direccion: '' };
        cargarOrganizaciones();
      } else {
        throw new Error('Hubo un problema al guardar la organización.');
      }
    } catch (error) {
      mensaje.value = `Error: ${error.message}`;
    }
  };
  
  // Editar organización
  const editarOrganizacion = (org) => {
    organizacion.value = { ...org };
  };
  
  // Eliminar organización
  const eliminarOrganizacion = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/organizaciones/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        mensaje.value = 'Organización eliminada correctamente.';
        cargarOrganizaciones();
      } else {
        throw new Error('Hubo un problema al eliminar la organización.');
      }
    } catch (error) {
      mensaje.value = `Error: ${error.message}`;
    }
  };
  
  // Cargar organizaciones al iniciar
  onMounted(cargarOrganizaciones);
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  form {
    margin-top: 20px;
  }
  
  input {
    padding: 8px;
    margin: 5px 0;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .mensaje {
    margin-top: 20px;
    color: green;
  }
  </style>
  