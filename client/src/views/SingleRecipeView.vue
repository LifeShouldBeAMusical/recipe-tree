<script setup lang="ts">
import RecipeFullCard from '@/components/RecipeFullCard.vue'
import { useSingleRecipeStore } from '@/stores/single-recipe-store'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const store = useSingleRecipeStore()
const data = computed(() => store.recipe.data)
const error = computed(() => store.recipe.errorState)
const loading = computed(() => store.recipe.loading)

onBeforeMount(() => {
	const route = useRoute()
	const id = Number.parseInt(route.params.id?.toString() as string)
	store.fetchRecipe(id)
})
</script>

<template>
	<v-container>
		<v-container v-if="error">Error</v-container>
		<v-container v-if="loading">Loading</v-container>
		<recipe-full-card v-if="data" :recipe="data" />
	</v-container>
</template>
