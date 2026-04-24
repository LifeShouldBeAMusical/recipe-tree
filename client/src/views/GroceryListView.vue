<script setup lang="ts">
import GroceryListItem from '@/components/GroceryListItem.vue'
import { useGroceryStore } from '@/stores/grocery-list-store'
import { computed, onBeforeMount } from 'vue'

const store = useGroceryStore()
const data = computed(() => store.groceryList.data)
const error = computed(() => store.groceryList.errorState)
const loading = computed(() => store.groceryList.loading)

onBeforeMount(() => store.fetchGroceryList())
</script>

<template>
	<v-container>
		<v-container v-if="error">Error</v-container>
		<v-container v-if="loading">Loading</v-container>
		<v-container v-if="data">
			<v-list>
				<grocery-list-item v-for="d in data" :key="d.id" :grocery-item="d" />
			</v-list>
		</v-container>
	</v-container>
</template>
