<script setup lang="ts">
import { contactService } from "@/services/contact.service";
import type { Contact } from "@/types/Contact";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import Loader from "../components/Loader.vue";

const contact = ref<Contact | any>(null);
const loading = ref(false);

async function save() {
  if (contact.value.id) {
    const { data } = await contactService.update(
      contact.value.id,
      contact.value
    );
    console.log("Update", data);
    return;
  }
  console.log("Saved", contact.value);
  const { data } = await contactService.create(contact.value);
  contact.value.id = data.id;
}

const route = useRoute();

onMounted(async () => {
  if (route.params.id) {
    loading.value = true;
    const { data } = await contactService.find(String(route.params.id));
    if (data) {
      contact.value = data;
    }
    loading.value = false;
  } else {
    contact.value = {
      name: "",
      identification: "",
    };
  }
});

// same as beforeRouteUpdate option with no access to `this`
onBeforeRouteUpdate(async (to, from) => {
  // only fetch the user if the id changed as maybe only the query or the hash changed
  if (to.params.id !== from.params.id) {
    console.log("onBeforeRouteUpdate", to.params.id);
  }
});
</script>

<template>
  el formulario
  <form v-on:submit.prevent="save" v-if="contact">
    <div class="mb">
      <label>Nombre</label>
      <br />
      <input type="text" v-model="contact.name" />
    </div>
    <div class="mb">
      <label>Identificacion</label>
      <br />
      <input type="text" v-model="contact.identification" />
    </div>
    <div class="mb">
      <label>Email</label>
      <br />
      <input type="text" v-model="contact.email" />
    </div>
    <div class="mb">
      <label>Type</label>
      <br />
      <select>
        <option value="client">Client</option>
        <option value="provider">Provider</option>
      </select>
    </div>
    <button type="submit">Guardar</button>
  </form>
  <loader v-if="loading"></loader>
</template>
