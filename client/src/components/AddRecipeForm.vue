<script setup lang="ts">
import type { IngredientInput } from '@/gql/types'
import { useAllRecipeStore } from '@/stores/all-recipe-store'
import positiveRule from '@/util/positive'
import { ref } from 'vue'

const store = useAllRecipeStore()

const title = ref<string | null>(null)
const ingredients = ref<
	{ quantity: number | null; unit: string | null; ingredient: string | null }[]
>([])
</script>

<template>
	<v-card>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-title>Add Recipe</v-expansion-panel-title>
				<v-expansion-panel-text>
					<v-form @submit.prevent>
						<v-text-field v-model="title" label="Title" required />
						<v-container v-for="(ingredient, idx) in ingredients" :key="idx">
							<v-text-field v-model="ingredient.ingredient" label="Ingredient" required />
							<v-number-input
								v-model="ingredient.quantity"
								label="Quantity"
								:rules="[positiveRule]"
							/>
							<v-text-field v-model="ingredient.unit" label="Units" />
						</v-container>
						<v-btn
							block
							v-on:click="() => ingredients.push({ ingredient: null, quantity: null, unit: null })"
						>
							Add Ingredient
						</v-btn>
						<v-btn
							type="submit"
							block
							v-on:click="
								title &&
								store.addRecipe({
									recipe: {
										title,
										ingredients: ingredients
											.map((i): IngredientInput | undefined =>
												i.ingredient
													? {
															title: i.ingredient,
															quantity:
																i.quantity != null && i.unit != null
																	? { quantity: i.quantity, unit: i.unit }
																	: undefined
														}
													: undefined
											)
											.filter((i) => i != undefined)
									}
								})
							"
						>
							Add
						</v-btn>
					</v-form>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-card>
</template>
