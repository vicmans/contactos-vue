<script setup lang="ts">
import { RouterLink } from "vue-router";
let { cols } = defineProps<{
  cols?: any[];
  rows: any[];
}>();

const emit = defineEmits<{
  (e: "delete", data: any): void;
  (e: "edit", value: string): void;
}>();
</script>

<template>
  <table v-if="rows">
    <thead>
      <tr>
        <td v-for="col in cols" :key="col.field">{{ col.label }}</td>
        <td>Acciones</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="row.id">
        <td v-for="col in cols" :key="col.field">{{ rows[i][col.field] }}</td>
        <td class="actions">
          <router-link :to="{ name: 'id', params: { id: rows[i].id } }"
            >Editar</router-link
          >
          <a href="#" @click="emit('delete', row)">Borrar</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.actions a {
  margin: 1rem;
}
table {
  width: 100%;
}
table > tbody > tr:nth-of-type(odd) {
  background-color: var(--color-background-soft);
}
td,
th {
  padding: 0.25rem 1rem;
}
th {
  font-weight: bold;
}
</style>
