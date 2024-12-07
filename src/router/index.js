import { createRouter, createWebHistory } from 'vue-router';
import Organizaciones from '../view/Organizaciones.vue'; // Vista para la entidad Organización
import Proyectos from '../view/Proyectos.vue'; // Vista para la entidad Proyecto
import Impactos from '../view/Impactos.vue'; // Vista para la entidad Impacto

const routes = [
  {
    path: '/organizaciones',
    name: 'Organizaciones',
    component: Organizaciones
  },
  {
    path: '/proyectos',
    name: 'Proyectos',
    component: Proyectos
  },
  {
    path: '/impactos',
    name: 'Impactos',
    component: Impactos
  },
  {
    path: '/',
    redirect: '/organizaciones' // Redirige por defecto a la vista de organizaciones
  }
];

const router = createRouter({
  // Cambia process.env.BASE_URL por una cadena vacía o el valor deseado
  history: createWebHistory('/'),  // O usa '/' si estás en la raíz
  routes
});

export default router;
// alvaroalvaroez 