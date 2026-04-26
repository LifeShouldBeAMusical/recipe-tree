import { apolloClient } from '@/client'
import { addIngredientMutation } from '@/gql/queries/recipe/add-ingredient'
import { singleRecipeQuery } from '@/gql/queries/recipe/single-recipe'
import type {
	AddIngredientMutation,
	AddIngredientMutationVariables,
	RecipeFragment,
	SingleRecipeQuery,
	SingleRecipeQueryVariables
} from '@/gql/types'
import type { QueryResult } from '@/stores/types/query-result'
import {
	provideApolloClient,
	useLazyQuery,
	useMutation,
	type MutateFunction
} from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export type RecipeStoreType = RecipeStoreStateType & {
	fetchRecipe: (id: number) => void
	addIngredient: MutateFunction<AddIngredientMutation, AddIngredientMutationVariables>
}

type RecipeStoreStateType = {
	recipe: QueryResult<RecipeFragment | null> | Ref<QueryResult<RecipeFragment | null>>
}

provideApolloClient(apolloClient)

const {
	load: loadRecipeData,
	onResult: onRecipeResult,
	loading: recipeLoading,
	error: recipeError
} = useLazyQuery<SingleRecipeQuery, SingleRecipeQueryVariables>(singleRecipeQuery)
const { mutate: addIngredient } = useMutation<
	AddIngredientMutation,
	AddIngredientMutationVariables
>(addIngredientMutation)

export const useSingleRecipeStore = defineStore('single-recipe', (): RecipeStoreType => {
	const recipeData = ref<RecipeFragment | null>(null)
	const recipe = computed<QueryResult<RecipeFragment | null>>(() => ({
		data: recipeData.value,
		loading: recipeLoading.value ? true : false,
		errorState: recipeError.value ? true : false
	}))
	onRecipeResult(
		/* istanbul ignore next */
		({ data }) => {
			recipeData.value = data?.recipe
		}
	)
	const fetchRecipe = (id: number) => loadRecipeData(singleRecipeQuery, { recipeId: id })

	return { fetchRecipe, recipe, addIngredient }
})
