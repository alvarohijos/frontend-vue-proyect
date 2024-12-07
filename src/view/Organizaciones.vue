<template>
  <div>
    <h1>Organizaciones</h1>

    <!-- Lista de organizaciones -->
    <div v-if="organizaciones.length">
      <h3>Lista de Organizaciones</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Contacto</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="org in organizaciones" :key="org.organizacionId">
            <td>{{ org.organizacionId }}</td>
            <td>{{ org.nombre }}</td>
            <td>{{ org.descripcion }}</td>
            <td>{{ org.contacto }}</td>
            <td>{{ org.direccion }}</td>
            <td>
              <button @click="editarOrganizacion(org)" class="btn btn-editar">Editar</button>
              <button @click="eliminarOrganizacion(org.organizacionId)" class="btn btn-eliminar">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No hay organizaciones disponibles.</p>
    </div>

    <!-- Formulario de nuevo/actualizar organización -->
    <form @submit.prevent="guardarOrganizacion">
      <h3>{{ organizacion.organizacionId ? 'Editar' : 'Crear' }} Organización</h3>

      <label for="nombre">Nombre</label>
      <input v-model="organizacion.nombre" type="text" id="nombre" placeholder="Nombre de la organización" required />

      <label for="descripcion">Descripción</label>
      <input v-model="organizacion.descripcion" type="text" id="descripcion" placeholder="Descripción de la organización" />

      <label for="contacto">Contacto</label>
      <input v-model="organizacion.contacto" type="text" id="contacto" placeholder="Contacto de la organización" />

      <label for="direccion">Dirección</label>
      <input v-model="organizacion.direccion" type="text" id="direccion" placeholder="Dirección de la organización" />

      <button type="submit">{{ organizacion.organizacionId ? 'Actualizar' : 'Crear' }} Organización</button>
    </form>

    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const organizacion = ref({
  organizacionId: '',
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
  const url = organizacion.value.organizacionId
    ? `http://localhost:8080/api/organizaciones/${organizacion.value.organizacionId}`
    : 'http://localhost:8080/api/organizaciones';

  const method = organizacion.value.organizacionId ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organizacion.value),
    });

    if (response.ok) {
      mensaje.value = organizacion.value.organizacionId
        ? 'Organización actualizada correctamente.'
        : 'Organización creada correctamente.';
      organizacion.value = { organizacionId: '', nombre: '', descripcion: '', contacto: '', direccion: '' };
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
  border: none;
  cursor: pointer;
}

.btn {
  margin-right: 5px;
}

.btn-editar {
  background-color: #007bff;
  color: white;
}

.btn-editar:hover {
  background-color: #0056b3;
}

.btn-eliminar {
  background-color: #dc3545;
  color: white;
}

.btn-eliminar:hover {
  background-color: #a71d2a;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #f8f9fa;
}

th, td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: left;
}

.mensaje {
  margin-top: 20px;
  color: green;
}
</style>
