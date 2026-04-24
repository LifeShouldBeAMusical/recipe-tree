<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue'
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
			<recipe-card v-for="d in data" :key="d.id" :recipe="d" />
		</v-container>
	</v-container>
</template>
