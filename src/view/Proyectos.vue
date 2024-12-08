<template>
  <div>
    <h1>Proyectos</h1>

    <!-- Tabla de proyectos -->
    <div v-if="proyectos.length">
      <h3>Lista de Proyectos</h3>
      <table>
        <thead>
          <tr>
            <th>Proyecto ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Ubicación</th>
            <th>Organización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proyecto in proyectos" :key="proyecto.proyectoId">
            <td>{{ proyecto.proyectoId }}</td>
            <td>{{ proyecto.nombre }}</td>
            <td>{{ proyecto.descripcion }}</td>
            <td>{{ proyecto.estado }}</td>
            <td>{{ formatFecha(proyecto.fechaInicio) }}</td>
            <td>{{ formatFecha(proyecto.fechaFin) }}</td>
            <td>{{ proyecto.ubicacion }}</td>
            <td>{{ proyecto.organizacion?.nombre || 'N/A' }}</td>
            <td>
              <div class="action-buttons">
                <button @click="editarProyecto(proyecto)" class="btn btn-edit">Editar</button>
                <button @click="eliminarProyecto(proyecto.proyectoId)" class="btn btn-delete">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No hay proyectos disponibles.</p>
    </div>

    <!-- Formulario de nuevo/actualizar proyecto -->
    <form @submit.prevent="guardarProyecto">
      <h3>{{ proyecto.proyectoId ? 'Editar' : 'Crear' }} Proyecto</h3>

      <label for="nombre">Nombre</label>
      <input v-model="proyecto.nombre" type="text" id="nombre" placeholder="Nombre del proyecto" required />

      <label for="descripcion">Descripción</label>
      <input v-model="proyecto.descripcion" type="text" id="descripcion" placeholder="Descripción del proyecto" />

      <label for="estado">Estado</label>
      <input v-model="proyecto.estado" type="text" id="estado" placeholder="Estado del proyecto" />

      <label for="fecha_inicio">Fecha de Inicio</label>
      <input
        v-model="proyecto.fechaInicio"
        type="datetime-local"
        id="fecha_inicio"
        required
      />

      <label for="fecha_fin">Fecha de Fin</label>
      <input
        v-model="proyecto.fechaFin"
        type="datetime-local"
        id="fecha_fin"
        required
      />

      <label for="ubicacion">Ubicación</label>
      <input v-model="proyecto.ubicacion" type="text" id="ubicacion" placeholder="Ubicación del proyecto" />

      <label for="organizacion_id">Organización</label>
      <select v-model="proyecto.organizacionId" id="organizacion_id" required>
        <option v-for="org in organizaciones" :key="org.organizacionId" :value="org.organizacionId">
          {{ org.nombre }}
        </option>
      </select>

      <button type="submit">{{ proyecto.proyectoId ? 'Actualizar' : 'Crear' }} Proyecto</button>
    </form>

    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const proyecto = ref({
  proyectoId: '',
  nombre: '',
  descripcion: '',
  estado: '',
  fechaInicio: '',
  fechaFin: '',
  ubicacion: '',
  organizacionId: ''
});
const proyectos = ref([]);
const organizaciones = ref([]);
const mensaje = ref('');

// Formatear fechas para mostrar en la tabla
const formatFecha = (fecha) => {
  if (!fecha) return 'N/A';
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES');
};

// Cargar proyectos
const cargarProyectos = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/proyectos');
    if (response.ok) {
      const data = await response.json();
      proyectos.value = data.map(proyecto => ({
        ...proyecto,
        fechaInicio: new Date(proyecto.fechaInicio).toISOString().slice(0, 16),
        fechaFin: new Date(proyecto.fechaFin).toISOString().slice(0, 16)
      }));
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
  const url = proyecto.value.proyectoId
    ? `http://localhost:8080/api/proyectos/${proyecto.value.proyectoId}`
    : 'http://localhost:8080/api/proyectos';

  const method = proyecto.value.proyectoId ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proyecto.value),
    });

    if (response.ok) {
      mensaje.value = proyecto.value.proyectoId
        ? 'Proyecto actualizado correctamente.'
        : 'Proyecto creado correctamente.';
      proyecto.value = {
        proyectoId: '',
        nombre: '',
        descripcion: '',
        estado: '',
        fechaInicio: '',
        fechaFin: '',
        ubicacion: '',
        organizacionId: ''
      };
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
  proyecto.value = { ...proy, organizacionId: proy.organizacionId }; // Solo el ID de organización
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead th {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 10px;
}

tbody td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.btn {
  padding: 8px 12px;
  border: none;
  color: white;
  cursor: pointer;
}

.btn-edit {
  background-color: #28a745;
}

.btn-edit:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.mensaje {
  margin-top: 20px;
  color: green;
}
</style>
