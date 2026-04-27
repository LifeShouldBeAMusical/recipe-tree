<script setup lang="ts">
import type { Recipe } from '@/gql/types'
import AddIngredientForm from './AddIngredientForm.vue'

defineProps<{ recipe: Recipe }>()
</script>

<template>
	<v-container>
		<h2>
			<a :href="`/recipe/${recipe.id}`">
				{{ recipe.title }}
			</a>
		</h2>
		<v-container>
			<template v-if="recipe.components && recipe.components.length > 0">
				<h4>Contains:</h4>
				<v-list>
					<v-list-item v-for="c in recipe.components" :key="c.id">
						<v-list-item-title>
							<a v-if="c.ingredient.__typename == 'Recipe'" :href="`/recipe/${c.ingredient.id}`">
								{{ c.ingredient.title }}
							</a>
							<template v-else>
								{{ c.ingredient.title }}
							</template>
						</v-list-item-title>
						<v-list-item-subtitle v-if="c.quantity"
							>{{ c.quantity.quantity }} {{ c.quantity.unit }}</v-list-item-subtitle
						>
					</v-list-item>
				</v-list>
			</template>
			<add-ingredient-form :recipe="recipe" />
			<template v-if="recipe.uses && recipe.uses.length > 0">
				<h4>Uses:</h4>
				<v-list>
					<v-list-item v-for="c in recipe.uses" :key="c.id">
						<a :href="`/recipe/${c.id}`">
							{{ c.title }}
						</a>
					</v-list-item>
				</v-list>
			</template>
		</v-container>
	</v-container>
</template>
