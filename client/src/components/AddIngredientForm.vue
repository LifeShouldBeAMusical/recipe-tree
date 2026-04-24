<script setup lang="ts">
import { addIngredientMutation } from '@/gql/queries/recipe/add-ingredient'
import type {
	AddIngredientMutation,
	AddIngredientMutationVariables,
	RecipeFragment
} from '@/gql/types'
import positiveRule from '@/util/positive'
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'

defineProps<{ recipe: RecipeFragment }>()

const ingredient = ref<string | null>(null)
const quantity = ref<number | null>(null)
const unit = ref<string | null>(null)

const { mutate: addIngredient } = useMutation<
	AddIngredientMutation,
	AddIngredientMutationVariables
>(addIngredientMutation)
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
							addIngredient({
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
