<script setup lang="ts">
import GroceryListItem from '@/components/GroceryListItem.vue'
import type { GroceryItemFragment } from '@/gql/types'
import { useGroceryStore } from '@/stores/grocery-list-store'
import sortByTitle from '@/util/sort-by-title'
import { computed, onBeforeMount } from 'vue'

const store = useGroceryStore()
const categorizedData = computed<Record<string, GroceryItemFragment[]>>(() => {
	let result: Record<string, GroceryItemFragment[]> = {}
	store.groceryList.data.forEach((g) => {
		const category = g.category?.title ?? 'Uncategorized'
		result = {
			...result,
			[category]: [...(result[category] ?? []), g].sort(sortByTitle)
		}
	})
	return result
})
const error = computed(() => store.groceryList.errorState)
const loading = computed(() => store.groceryList.loading)

onBeforeMount(() => store.fetchGroceryList())
</script>

<template>
	<v-container>
		<v-container v-if="error">Error</v-container>
		<v-container v-if="loading">Loading</v-container>
		<v-container v-if="categorizedData">
			<h2>Groceries</h2>
			<template v-for="category in Object.keys(categorizedData).sort()" :key="category">
				<h3>{{ category }}</h3>
				<v-list>
					<grocery-list-item v-for="d in categorizedData[category]" :key="d.id" :grocery-item="d" />
				</v-list>
			</template>
		</v-container>
	</v-container>
</template>
