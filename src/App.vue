<template>
  <div id="app">
   
    <ul>
      <li><img width="20" src="./assets/logo.png"></li>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/contactos">Contactos</router-link></li>
      <li><router-link to="/contactos/clientes" @click="busca">Clientes</router-link></li>
      <li><router-link to="/contactos/proveedores" @click="busca">Proveedores</router-link></li><li>
      <div class="row">
        <div class="col s6">
        <el-input placeholder="Buscar" v-model="buscar" @keyup.enter="busca"></el-input>
        </div>
        <el-button @click="busca">Buscar</el-button>
        </div>
      </li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <!-- lo que cargo -->
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
var APIKEY;
export default {
  name: 'app',
  mounted(){
    axios.get('/dist/api.json').then((respuesta) => {
          APIKEY = respuesta.data.apikey});
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      buscar: ''
    }
  },
  methods:{
    busca(){
      var router = this.$router;
      router.push('/contactos/buscar/'+this.buscar);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  width: 20px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
