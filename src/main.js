import Vue from 'vue'
import DataTable from 'vue-materialize-datatable';
import App from './App.vue'
import VueRouter from 'vue-router'
import Contactos from './Contactos.vue'
import Contacto from './Contacto.vue'
import ContactoNew from './ContactoNew.vue'
import ContactoEdit from './ContactoEdit.vue'
import ContactoBuscar from './ContactoBuscar.vue'
import ContactoC from './ContactoC.vue'
import ContactoCP from './ContactoCP.vue'
import Hello from './Hello.vue'

import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.component('DataTable',DataTable);
Vue.use(VueRouter);

var APIKEY;

const router = new VueRouter({
  routes: [
    // los segmentos dinámicos comienzan con dos puntos
    { path: '/contactos/:id(\\d+)', name: 'ver', component: Contacto },
    { path: '/contactos/buscar/:b', name: 'cp', component: ContactoBuscar, props: true },
    { path: '/contactos/clientes', name: 'c', component: ContactoC, props: {b: 'clientes'} },
    { path: '/contactos/proveedores', name: 'p', component: ContactoCP, props: {b: 'proveedores'} },
    { path: '/contactos/add', name: 'agregar', component: ContactoNew },
    { path: '/contactos/edit/:id', name: 'editar', component: ContactoEdit },
    { path: '/', name: 'todos', component: Hello },
    { path: '/contactos', name: 'contactos', component: Contactos }
  ],
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
