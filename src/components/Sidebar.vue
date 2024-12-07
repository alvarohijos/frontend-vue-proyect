<!-- Sidebar.vue -->
<template>
    <div class="sidebar">
      <ul>
        <li><router-link to="/organizaciones">Organizaciones</router-link></li>
        <li><router-link to="/proyectos">Proyectos</router-link></li>
        <li><router-link to="/impactos">Impactos</router-link></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 20px;
    position: fixed;
    height: 100%;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
  }
  
  a {
    text-decoration: none;
    color: #333;
  }
  a:hover {
    color: #007bff;
  }
  </style>
  