<script setup lang="ts">
import TheTable from "@/components/TheTable.vue";
import { columns } from "@/composables/cols";
import { contactService } from "@/services/contact.service";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, RouterLink, useRoute } from "vue-router";
import Loader from "../components/Loader.vue";
import type { Contact } from "@/types/Contact";

const route = useRoute();
const data = ref<Contact[] | []>([]);
const loading = ref(false);
const cols = columns;

let params: any = {};
if (route.params.type) {
  params.type = route.params.type;
}

onMounted(() => {
  console.log("is mounted");
  getAll(params);
});

const getAll = (params?: any) => {
  loading.value = true;
  contactService
    .findAll(params)
    .then((resp) => {
      data.value = resp.data;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

const onDelete = (data: any) => {
  contactService.delete(data.id).then((resp) => {
    console.log("deteleted data", resp);
    getAll(params);
  });
};

onBeforeRouteUpdate(async (to, from) => {
  // only fetch the user if the id changed as maybe only the query or the hash changed
  if (to.params.type !== from.params.type) {
    params.type = to.params.type;
    getAll(params);
  }
});
</script>

<template>
  <div class="container">
    <div class="mb text-center">
      <RouterLink to="/contactos/add">Agregar</RouterLink>
      <br />
      <Loader v-if="loading"></Loader>
    </div>
    <TheTable
      v-if="!loading"
      :cols="cols"
      :rows="data"
      @delete="onDelete"
    ></TheTable>
  </div>
</template>

<style>
#contact-list {
  padding: 5px;
}
#contact-list li {
  margin-top: 10px;
  width: 30%;
  height: 120px;
  border: 1px solid #ddd;
  background: #eee;
  padding: 20px;
  overflow: hidden;
}
</style>
