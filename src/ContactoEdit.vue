<template>
  <div>
    <h1>{{ msg }}</h1>
    
    <p>{{contacto.name}} </p>
    <form v-on:submit.prevent="guardarRestaurante">
      <label>Nombre</label>
      <input type="text" v-model="contacto.name">

      <label>Identificacion</label>
      <input type="text" v-model="contacto.identification">

      <input type="submit" value="Enviar">
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'contacto-edit',
  mounted () {
    this.id = this.$route.params.id,
    this.getRestaurantes()
  },
  data () {
    return {
      msg: 'Editar un contacto',
      contacto: null,
      id: null
    }
  },
  methods: {
    getRestaurantes(){
      axios.request({
          url: 'https://app.alegra.com/api/v1/contacts/'+this.id,
          headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic dnNhbmNoZXpsOTRAZ21haWwuY29tOmU2OGI0YjcwY2RkYjhlYThiMTNh',},
          method: 'get'
        })
         .then((respuesta) => {
          this.contacto = respuesta.data;
          console.log(this.contacto)
         })
         .catch((error) => {console.log(error)});
      },
      guardarRestaurante(){
        var router = this.$router;

        var params = JSON.stringify(this.contacto);
        axios.put('https://app.alegra.com/api/v1/contacts/'+this.id, params,{headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic dnNhbmNoZXpsOTRAZ21haWwuY29tOmU2OGI0YjcwY2RkYjhlYThiMTNh',}
        })
             .then((respuesta)=>{
              
              if(respuesta.data.id == this.id){
                // redirigir
                router.push('/contactos/'+this.id);
              }

             })
             .catch((error)=>{
              console.log('Error'+error);
             });
          
      }
    }
  }

</script>