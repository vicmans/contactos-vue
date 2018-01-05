<template>
  <div>
    <h1>{{ msg }}</h1>

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
  name: 'contacto-add',

  data () {
    return {
      msg: 'Agregar nuevo contacto',
      contacto: {
        name: '',
        identification: ''
      }
    }
  },
  methods: {
    guardarRestaurante(){
        var router = this.$router;

        var params = JSON.stringify(this.contacto);
        axios.post('https://app.alegra.com/api/v1/contacts', params,{headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic dnNhbmNoZXpsOTRAZ21haWwuY29tOmU2OGI0YjcwY2RkYjhlYThiMTNh',}
        })
             .then((respuesta)=>{
              console.log(respuesta);
              if(respuesta.data.name == this.contacto.name){
                // redirigir
                router.push('/contactos/'+respuesta.data.id);
              }

             })
             .catch((error)=>{
              console.log(error);
             });
          
      }
    }
  }

</script>