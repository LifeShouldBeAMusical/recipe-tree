<script setup lang="ts">
import { useAllRecipeStore } from '@/stores/all-recipe-store'
import { computed, onBeforeMount } from 'vue'

const store = useAllRecipeStore()
const data = computed(() => store.recipeList.data)
const error = computed(() => store.recipeList.errorState)
const loading = computed(() => store.recipeList.loading)

onBeforeMount(() => store.fetchRecipeList())
</script>

<template>
	<v-container>
		<v-container v-if="error">Error</v-container>
		<v-container v-if="loading">Loading</v-container>
		<v-container v-if="data">
			<v-card v-for="d in data" :key="d.id">
				<v-card-title>{{ d.title }}</v-card-title>
				<v-card-text>
					<v-list v-if="d.components.length > 0">
						<v-list-item v-for="c in d.components" :key="c.id">
							<span v-if="c.quantity">{{ c.quantity.quantity }} {{ c.quantity.unit }}</span>
							<span>{{ c.ingredient.title }}</span>
						</v-list-item>
					</v-list>
				</v-card-text>
			</v-card>
		</v-container>
	</v-container>
</template>
