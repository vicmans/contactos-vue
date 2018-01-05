<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <ul>
      <li><router-link :to="{name:'agregar'}">Agregar contacto</router-link></li>
    </ul>
<!--     <ul v-if="contactos != null" id="contact-list">
      <li v-for="contacto in contactos">
        {{contacto.id}} - {{contacto.name}}
        <br>
        <router-link :to="{name: 'ver', params:{id: contacto.id}}"><button>Ver</button></router-link>
        <router-link :to="{name: 'editar', params:{id: contacto.id}}"><button>Editar</button></router-link>
        <button @click="borrar(contacto.id)">Borrar</button>

      </li>
    </ul> -->
    <datatable v-if="contactos != null" :columns="cols" :rows="contactos" :title="Contactos" :customButtons="botones"></datatable>
    <div v-else class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DataTable from 'vue-materialize-datatable';
var APIKEY;
export default {
  name: 'contactos',
  components: {
    "datatable": DataTable
  },
  mounted () {
    this.getRestaurantes();
    axios.get('/dist/api.json').then((respuesta) => {
          APIKEY = respuesta.data.apikey});
  },
  data () {
    return {
      msg: 'Contactos de la API',
      contactos: null,

      cols: [{
        label: 'id',
        field: 'id'
      },{
        label: 'nombre',
        field: 'name'
      },{
        label: 'Identificacion',
        field:'identification'
      },{
        label: 'Email',
        field: 'email'
      }],
      botones: [{
        hide: false,    // Whether to hide the button
        icon: 'add', // Materialize icon
        //onclick: aFunc, // Click handler
      }]
    }
  },
  methods: {
    borrar(id){
      var bo = confirm("Esta seguro de borrar");
      if (bo) {
        axios.request({
          url: 'https://app.alegra.com/api/v1/contacts/'+id,
          headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+APIKEY,},
          method: 'delete'
        })
         .then((respuesta) => {
            alert(respuesta.data.message);
            this.getRestaurantes();
         })
         .catch((error) => {console.log(error)})
      }
    },
    getRestaurantes(){
      axios.request({
          url: 'https://app.alegra.com/api/v1/contacts',
          headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+APIKEY,},
          method: 'get'
        })
         .then((respuesta) => {
          this.contactos = respuesta.data;
         })
         .catch((error) => {console.log(error)})
      }
    }
  }

</script>

<style>
  #contact-list{
    padding: 5px;
    
  }
  #contact-list li{
      margin-top: 10px;
      width: 30%;
      height: 120px;
      border: 1px solid #ddd;
      background: #eee;
      padding: 20px;
      overflow:hidden;
    }
</style>