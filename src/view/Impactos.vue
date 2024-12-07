<template>
  <div>
    <h1>Impactos</h1>

    <!-- Lista de impactos -->
    <div v-if="impactos.length">
      <h3>Lista de Impactos</h3>
      <table>
        <thead>
          <tr>
            <th>Impacto ID</th>
            <th>Proyecto ID</th>
            <th>Beneficiarios</th>
            <th>Satisfacción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="impacto in impactos" :key="impacto.impacto_id">
            <td>{{ impacto.impacto_id }}</td>
            <td>{{ impacto.proyecto_id }}</td>
            <td>{{ impacto.beneficiarios }}</td>
            <td>{{ impacto.satisfaccion }}</td>
            <td>
              <button @click="editarImpacto(impacto)" class="editar-btn">Editar</button>
              <button @click="eliminarImpacto(impacto.impacto_id)" class="eliminar-btn">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No hay impactos disponibles.</p>
    </div>

    <!-- Formulario de nuevo/actualizar impacto -->
    <form @submit.prevent="guardarImpacto">
      <h3>{{ impacto.impacto_id ? 'Editar' : 'Crear' }} Impacto</h3>

      <label for="proyecto_id">Proyecto ID</label>
      <input v-model="impacto.proyecto_id" type="number" id="proyecto_id" placeholder="ID del Proyecto" required />

      <label for="beneficiarios">Beneficiarios</label>
      <input v-model="impacto.beneficiarios" type="number" id="beneficiarios" placeholder="Número de beneficiarios" required />

      <label for="satisfaccion">Satisfacción</label>
      <input v-model="impacto.satisfaccion" type="number" step="0.1" id="satisfaccion" placeholder="Satisfacción (0-10)" required />

      <button type="submit">{{ impacto.impacto_id ? 'Actualizar' : 'Crear' }} Impacto</button>
    </form>

    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const impacto = ref({
  impacto_id: '',
  proyecto_id: '',
  beneficiarios: '',
  satisfaccion: ''
});
const impactos = ref([]);
const mensaje = ref('');

// Cargar impactos
const cargarImpactos = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/impactos');
    if (response.ok) {
      const data = await response.json();
      impactos.value = data;
    }
  } catch (error) {
    mensaje.value = `Error: ${error.message}`;
  }
};

// Guardar o actualizar impacto
const guardarImpacto = async () => {
  const url = impacto.value.impacto_id
    ? `http://localhost:8080/api/impactos/${impacto.value.impacto_id}`
    : 'http://localhost:8080/api/impactos';

  const method = impacto.value.impacto_id ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(impacto.value),
    });

    if (response.ok) {
      mensaje.value = impacto.value.impacto_id ? 'Impacto actualizado correctamente.' : 'Impacto creado correctamente.';
      impacto.value = { impacto_id: '', proyecto_id: '', beneficiarios: '', satisfaccion: '' };
      cargarImpactos();
    } else {
      throw new Error('Hubo un problema al guardar el impacto.');
    }
  } catch (error) {
    mensaje.value = `Error: ${error.message}`;
  }
};

// Editar impacto
const editarImpacto = (imp) => {
  impacto.value = { ...imp };
};

// Eliminar impacto
const eliminarImpacto = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/impactos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      mensaje.value = 'Impacto eliminado correctamente.';
      cargarImpactos();
    } else {
      throw new Error('Hubo un problema al eliminar el impacto.');
    }
  } catch (error) {
    mensaje.value = `Error: ${error.message}`;
  }
};

// Cargar impactos al iniciar
onMounted(() => {
  cargarImpactos();
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

input {
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

/* Colores personalizados para botones */
.editar-btn {
  background-color: #4caf50;
  color: white;
}

.eliminar-btn {
  background-color: #f44336;
  color: white;
}

.editar-btn:hover {
  background-color: #45a049;
}

.eliminar-btn:hover {
  background-color: #e53935;
}

/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>
