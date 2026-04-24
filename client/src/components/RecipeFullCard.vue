<script setup lang="ts">
import type { RecipeFragment } from '@/gql/types';

defineProps<{ recipe: RecipeFragment }>()
</script>

<template>
	<v-container>
		<h2>
			<a :href="`/recipe/${recipe.id}`">
				{{ recipe.title }}
			</a>
		</h2>
		<v-container>
			<template v-if="recipe.components.length > 0">
				<h4>Contains:</h4>
				<v-list>
					<v-list-item v-for="c in recipe.components" :key="c.id">
						<v-list-item-title>{{ c.ingredient.title }}</v-list-item-title>
						<v-list-item-subtitle v-if="c.quantity"
							>{{ c.quantity.quantity }} {{ c.quantity.unit }}</v-list-item-subtitle
						>
					</v-list-item>
				</v-list>
			</template>
		</v-container>
	</v-container>
</template>
