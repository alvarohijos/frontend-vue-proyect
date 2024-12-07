<template>
    <MiHeader></MiHeader>
  
    <div class="container">
      <h2>Actualizar Organización</h2>
  
      <!-- Formulario de actualización -->
      <form @submit.prevent="actualizarOrganizacion">
        <div>
          <label for="id">ID de Organización</label>
          <input
            v-model="organizacion.id"
            type="number"
            id="id"
            placeholder="Ingrese el ID de la organización"
            @blur="cargarOrganizacion"
            required
          />
        </div>
  
        <div>
          <label for="nombre">Nombre</label>
          <input
            v-model="organizacion.nombre"
            type="text"
            id="nombre"
            placeholder="Nombre de la organización"
            required
          />
        </div>
  
        <div>
          <label for="descripcion">Descripción</label>
          <input
            v-model="organizacion.descripcion"
            type="text"
            id="descripcion"
            placeholder="Descripción de la organización"
          />
        </div>
  
        <div>
          <label for="contacto">Contacto</label>
          <input
            v-model="organizacion.contacto"
            type="text"
            id="contacto"
            placeholder="Contacto de la organización"
          />
        </div>
  
        <div>
          <label for="direccion">Dirección</label>
          <input
            v-model="organizacion.direccion"
            type="text"
            id="direccion"
            placeholder="Dirección de la organización"
          />
        </div>
  
        <button type="submit">Actualizar</button>
      </form>
  
      <!-- Mensaje de resultado -->
      <div v-if="mensaje" class="mensaje">
        {{ mensaje }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import MiHeader from '@/components/MiHeader.vue';
  
  // Datos reactivos
  const organizacion = ref({
    id: '',
    nombre: '',
    descripcion: '',
    contacto: '',
    direccion: '',
  });
  
  const mensaje = ref(null);
  
  // Cargar organización por ID
  const cargarOrganizacion = async () => {
    if (!organizacion.value.id || isNaN(Number(organizacion.value.id))) {
      mensaje.value = 'Por favor, ingrese un ID válido.';
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/organizaciones/${organizacion.value.id}`);
      if (response.ok) {
        const data = await response.json();
        organizacion.value.nombre = data.nombre;
        organizacion.value.descripcion = data.descripcion;
        organizacion.value.contacto = data.contacto;
        organizacion.value.direccion = data.direccion;
        mensaje.value = null; // Limpia cualquier mensaje previo
      } else if (response.status === 404) {
        throw new Error('No se encontró la organización con el ID proporcionado.');
      } else {
        throw new Error('Error al cargar la organización.');
      }
    } catch (error) {
      mensaje.value = `Error: ${error.message}`;
      // Limpia los campos si no se encuentra la organización
      organizacion.value.nombre = '';
      organizacion.value.descripcion = '';
      organizacion.value.contacto = '';
      organizacion.value.direccion = '';
    }
  };
  
  // Actualizar organización
  const actualizarOrganizacion = async () => {
    if (!organizacion.value.id) {
      mensaje.value = 'Por favor, ingrese un ID válido antes de actualizar.';
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/organizaciones/${organizacion.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: organizacion.value.nombre,
          descripcion: organizacion.value.descripcion,
          contacto: organizacion.value.contacto,
          direccion: organizacion.value.direccion,
        }),
      });
  
      if (response.ok) {
        mensaje.value = 'Organización actualizada correctamente.';
      } else if (response.status === 404) {
        throw new Error('No se encontró la organización con el ID proporcionado.');
      } else {
        throw new Error('Error al actualizar la organización.');
      }
    } catch (error) {
      mensaje.value = `Error: ${error.message}`;
    }
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  input {
    padding: 8px;
    margin: 5px 0;
    font-size: 16px;
  }
  
  button {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .mensaje {
    margin-top: 20px;
    font-size: 18px;
    color: green;
  }
  </style>
  