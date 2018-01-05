<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>{{contacto.name}} </p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'contacto',
  mounted () {
    this.id = this.$route.params.id,
    this.getRestaurantes()
  },
  data () {
    return {
      msg: 'Contactos de la API',
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
         })
         .catch((error) => {console.log(error)});
      }
    }
  }

</script>