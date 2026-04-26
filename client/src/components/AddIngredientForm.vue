<script setup lang="ts">
import type { RecipeFragment } from '@/gql/types'
import { useSingleRecipeStore } from '@/stores/single-recipe-store'
import positiveRule from '@/util/positive'
import { ref } from 'vue'

defineProps<{ recipe: RecipeFragment }>()

const store = useSingleRecipeStore()

const ingredient = ref<string | null>(null)
const quantity = ref<number | null>(null)
const unit = ref<string | null>(null)
</script>

<template>
	<v-expansion-panels>
		<v-expansion-panel>
			<v-expansion-panel-title>Add Ingredient</v-expansion-panel-title>
			<v-expansion-panel-text>
				<v-form @submit.prevent>
					<v-text-field v-model="ingredient" label="Ingredient" required />
					<v-number-input v-model="quantity" label="Quantity" :rules="[positiveRule]" />
					<v-text-field v-model="unit" label="Units" />
					<v-btn
						type="submit"
						block
						v-on:click="
							ingredient &&
							store.addIngredient({
								recipeId: Number.parseInt(recipe.id),
								ingredient: {
									title: ingredient,
									quantity:
										quantity != null && unit != null
											? { quantity: quantity, unit: unit }
											: undefined
								}
							})
						"
						>Add</v-btn
					>
				</v-form>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
