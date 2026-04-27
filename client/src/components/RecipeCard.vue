<script setup lang="ts">
import type { RecipeFragment } from '@/gql/types'

defineProps<{ recipe: RecipeFragment }>()
</script>

<template>
	<v-card>
		<v-card-title>
			<a :href="`/recipe/${recipe.id}`">
				{{ recipe.title }}
			</a>
		</v-card-title>
		<v-card-text>
			<template v-if="recipe.components && recipe.components.length > 0">
				<h4>Contains:</h4>
				<p>{{ recipe.components.map((c) => c.ingredient.title).join(', ') }}</p>
			</template>
		</v-card-text>
	</v-card>
</template>
