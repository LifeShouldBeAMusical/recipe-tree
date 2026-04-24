<script setup lang="ts">
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
				<v-list-item v-for="d in data" :key="d.id" :title="d.title">
					<span v-if="d.recipes">
						(
						<template v-for="(r, i) in d.recipes" :key="r.id">
							<template v-if="i > 0">, </template>
							<a :href="`/recipe/${r.id}`">
								{{ r.title }}
							</a>
						</template>
						)
					</span>
				</v-list-item></v-list
			>
		</v-container>
	</v-container>
</template>
