<script setup lang="ts">
import AddRecipeForm from '@/components/AddRecipeForm.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { useAllRecipeStore } from '@/stores/all-recipe-store'
import { computed, onBeforeMount } from 'vue'

const store = useAllRecipeStore()
const data = computed(() =>
	store.recipeList.data
		.map((r) => r)
		.sort((a, b) =>
			a.title.toLowerCase() > b.title.toLowerCase()
				? 1
				: a.title.toLowerCase() < b.title.toLowerCase()
					? -1
					: 0
		)
)
const error = computed(() => store.recipeList.errorState)
const loading = computed(() => store.recipeList.loading)

onBeforeMount(() => store.fetchRecipeList())
</script>

<template>
	<v-container>
		<v-container v-if="error">Error</v-container>
		<v-container v-if="loading">Loading</v-container>
		<v-container v-if="data">
			<recipe-card v-for="d in data" :key="d.id" :recipe="d" />
			<add-recipe-form />
		</v-container>
	</v-container>
</template>
