<template>
  <div>
    <h1>{{ msg }} {{$route.params.buscar}}</h1>
    <ul>
      <li><router-link :to="{name:'agregar'}">Agregar</router-link></li>
    </ul>
    <ul v-if="contactos != null" id="contact-list">
      <li v-for="contacto in contactos">
        {{contacto.id}} - {{contacto.name}}
        <br>
        <router-link :to="{name: 'ver', params:{id: contacto.id}}"><button>Ver</button></router-link>
        <router-link :to="{name: 'editar', params:{id: contacto.id}}"><button>Editar</button></router-link>
        <button @click="borrar(contacto.id)">Borrar</button>
      </li>
    </ul>
    <div v-else class="preloader-wrapper small active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'contacto-c',
  props: ['b'],
  mounted () {
    this.cambiar(this.b);
    
  },
  data () {
    return {
      msg: 'Buscar Contactos de la API',
      contactos: null,
      busca: ''
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
                    'Authorization': 'Basic dnNhbmNoZXpsOTRAZ21haWwuY29tOmU2OGI0YjcwY2RkYjhlYThiMTNh',},
          method: 'delete'
        })
         .then((respuesta) => {
            alert(respuesta.data.message);
            this.buscar(this.busca);
         })
         .catch((error) => {console.log(error)})
      }
    },
    buscar(query,type='query'){
      axios.request({
          url: 'https://app.alegra.com/api/v1/contacts/'+type+'/'+query,
          headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic dnNhbmNoZXpsOTRAZ21haWwuY29tOmU2OGI0YjcwY2RkYjhlYThiMTNh',},
          method: 'get'
        })
         .then((respuesta) => {
          this.contactos = respuesta.data;
         })
         .catch((error) => {console.log(error)})
      },
      cambiar(busca){
        this.msg = busca;
        if ('clientes' == busca || busca == 'proveedores') {
          if ('clientes' == busca) {busca = 'client'}
          if ('proveedores' == busca) {busca = 'provider'}
          this.buscar(busca,'type');
          this.msg = busca
        }else{
          this.buscar(busca)
        }
      },
      beforeRouteUpdate (to, from, next) {
        this.contactos = [];
        this.msg = to.params.buscar;
        console.log("la ruta: "+this.$route.params.buscar)
        this.cambiar(this.$route.params.buscar);
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