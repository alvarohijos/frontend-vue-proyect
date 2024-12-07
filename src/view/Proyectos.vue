<template>
    <div>
      <h1>Proyectos</h1>
  
      <!-- Lista de proyectos -->
      <div v-if="proyectos.length">
        <h3>Lista de Proyectos</h3>
        <ul>
          <li v-for="proyecto in proyectos" :key="proyecto.proyecto_id">
            {{ proyecto.nombre }} - {{ proyecto.descripcion }} ({{ proyecto.estado }})
            <button @click="editarProyecto(proyecto)">Editar</button>
            <button @click="eliminarProyecto(proyecto.proyecto_id)">Eliminar</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No hay proyectos disponibles.</p>
      </div>
  
      <!-- Formulario de nuevo/actualizar proyecto -->
      <form @submit.prevent="guardarProyecto">
        <h3>{{ proyecto.proyecto_id ? 'Editar' : 'Crear' }} Proyecto</h3>
  
        <label for="nombre">Nombre</label>
        <input v-model="proyecto.nombre" type="text" id="nombre" placeholder="Nombre del proyecto" required />
  
        <label for="descripcion">Descripción</label>
        <input v-model="proyecto.descripcion" type="text" id="descripcion" placeholder="Descripción del proyecto" />
  
        <label for="estado">Estado</label>
        <input v-model="proyecto.estado" type="text" id="estado" placeholder="Estado del proyecto" />
  
        <label for="fecha_inicio">Fecha de Inicio</label>
        <input v-model="proyecto.fecha_inicio" type="datetime-local" id="fecha_inicio" required />
  
        <label for="fecha_fin">Fecha de Fin</label>
        <input v-model="proyecto.fecha_fin" type="datetime-local" id="fecha_fin" required />
  
        <label for="ubicacion">Ubicación</label>
        <input v-model="proyecto.ubicacion" type="text" id="ubicacion" placeholder="Ubicación del proyecto" />
  
        <label for="organizacion_id">Organización</label>
        <select v-model="proyecto.organizacion_id" id="organizacion_id" required>
          <option v-for="org in organizaciones" :key="org.id" :value="org.id">{{ org.nombre }}</option>
        </select>
  
        <button type="submit">{{ proyecto.proyecto_id ? 'Actualizar' : 'Crear' }} Proyecto</button>
      </form>
  
      <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const proyecto = ref({
    proyecto_id: '',
    nombre: '',
    descripcion: '',
    estado: '',
    fecha_inicio: '',
    fecha_fin: '',
    ubicacion: '',
    organizacion_id: ''
  });
  const proyectos = ref([]);
  const organizaciones = ref([]);
  const mensaje = ref('');
  
  // Cargar proyectos
  const cargarProyectos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/proyectos');
      if (response.ok) {
        proyectos.value = await response.json();
      }
    } catch (error) {
      mensaje.value = `Error: ${error.message}`;
    }
  };
  
  // Cargar organizaciones para el select
  const cargarOrganizaciones = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/organizaciones');
      if (response.ok) {
        organizaciones.value = await response.json();
      }
    } catch (error) {
      mensaje.value = `Error al cargar organizaciones: ${error.message}`;
    }
  };
  
  // Guardar o actualizar proyecto
  const guardarProyecto = async () => {
    const url = proyecto.value.proyecto_id
      ? `http://localhost:8080/api/proyectos/${proyecto.value.proyecto_id}`
      : 'http://localhost:8080/api/proyectos';
  
    const method = proyecto.value.proyecto_id ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proyecto.value),
      });
  
      if (response.ok) {
        mensaje.value = proyecto.value.proyecto_id ? 'Proyecto actualizado correctamente.' : 'Proyecto creado correctamente.';
        proyecto.value = { proyecto_id: '', nombre: '', descripcion: '', estado: '', fecha_inicio: '', fecha_fin: '', ubicacion: '', organizacion_id: '' };
        cargarProyectos();
      } else {
        throw new Error('Hubo un problema al guardar el proyecto.');
      }
    } catch (error) {
      mensaje.value = `Error: ${error.message}`;
    }
  };
  
  // Editar proyecto
  const editarProyecto = (proy) => {
    proyecto.value = { ...proy };
  };
  
  // Eliminar proyecto
  const eliminarProyecto = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/proyectos/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        mensaje.value = 'Proyecto eliminado correctamente.';
        cargarProyectos();
      } else {
        throw new Error('Hubo un problema al eliminar el proyecto.');
      }
    } catch (error) {
      mensaje.value = `Error: ${error.message}`;
    }
  };
  
  // Cargar proyectos y organizaciones al iniciar
  onMounted(() => {
    cargarProyectos();
    cargarOrganizaciones();
  });
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  form {
    margin-top: 20px;
  }
  
  input, select {
    padding: 8px;
    margin: 5px 0;
    width: 100%;
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
  