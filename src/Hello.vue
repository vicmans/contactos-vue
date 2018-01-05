<template>
  <div>
    <h2 class="hello">Hello {{name}}</h2>
    <img id="hola" src="./assets/logo.png">
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'Bienvenidos a la App!'
    }
  }
}
</script>

<style>
	#hola{
		width: 100px
	}
</style>