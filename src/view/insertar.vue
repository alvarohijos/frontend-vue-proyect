<template>
  <MiHeader></MiHeader>

  <fieldset>
    <legend>Registro de Organización</legend>
    <form @submit.prevent="insertarOrganizacion">
      <div>
        <label for="nombre">Nombre de la Organización</label>
        <input type="text" id="nombre" v-model="frm.nombre" required />
      </div>
      <div>
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" v-model="frm.descripcion" required></textarea>
      </div>
      <div>
        <label for="contacto">Contacto</label>
        <input type="text" id="contacto" v-model="frm.contacto" required />
      </div>
      <div>
        <label for="direccion">Dirección</label>
        <input type="text" id="direccion" v-model="frm.direccion" required />
      </div>
      <div>
        <button type="submit">Registrar Organización</button>
      </div>
      <div v-if="mensaje">
        {{ mensaje }}
      </div>
    </form>
  </fieldset>
</template>

<script setup>
import Swal from 'sweetalert2';
import MiHeader from '@/components/MiHeader.vue';
import { ref } from 'vue';

const frm = ref({
  nombre: "",
  descripcion: "",
  contacto: "",
  direccion: ""
});

const mensaje = ref("");

const insertarOrganizacion = async () => {
  try {
    // Verificar que los campos están completos
    if (!frm.value.nombre || !frm.value.descripcion || !frm.value.contacto || !frm.value.direccion) {
      mensaje.value = 'Por favor, complete todos los campos.';
      return;
    }

    // Enviar los datos al backend
    const respuesta = await fetch("http://localhost:8080/api/organizaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frm.value),
    });

    if (!respuesta.ok) {
      throw new Error("No se registraron los datos");
    }

    mensaje.value = "Registro exitoso";
    frm.value = { nombre: "", descripcion: "", contacto: "", direccion: "" }; // Limpiar formulario

    // Mostrar alerta de éxito
    Swal.fire('¡Éxito!', 'La organización ha sido registrada correctamente.', 'success');
  } catch (error) {
    mensaje.value = error.message || "Ocurrió un error";
    // Mostrar alerta de error
    Swal.fire('¡Error!', mensaje.value, 'error');
  }
};
</script>

<style scoped>
fieldset {
  border: 0;
  margin-top: 50px;
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
  margin: auto;
  background-color: #f0f8ff;
  width: 70%;
  padding: 30px;
  height: 400px;
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.5), 
              0 10px 30px rgba(0, 0, 0, 0.3), 
              0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

legend {
  color: #070130;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 0 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

div {
  display: flex;
  flex-direction: column;
}

label {
  color: #004aad;
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea {
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 1rem;
  margin-bottom: 20px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus, textarea:focus {
  border-color: #004aad;
}

button {
  background-color: #00002c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  margin-top: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0be6f6;
}

div[v-if] {
  margin-top: 10px;
  color: #004aad;
  font-weight: bold;
  text-align: center;
}
</style>
