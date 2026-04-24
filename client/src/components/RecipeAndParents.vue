<script setup lang="ts">
import type { RecipeTree } from '@/gql/types'

defineProps<{
	recipe: Partial<RecipeTree> | { id: string; recipes: Partial<RecipeTree>[]; title: string }
}>()
</script>

<template>
	<template v-if="recipe.id && recipe.title">
		<a :href="`/recipe/${recipe.id}`">
			{{ recipe.title }}
		</a>
		<template v-if="recipe.recipes?.length">
			(
			<template v-for="(r, i) in recipe.recipes" :key="r.id">
				<template v-if="i > 0">, </template>
				<RecipeAndParents :recipe="r" />
			</template>
			)
		</template>
	</template>
</template>
