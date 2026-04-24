import { apolloClient } from '@/client'
import { singleRecipeQuery } from '@/gql/queries/recipe/single-recipe'
import type { RecipeFragment, SingleRecipeQuery, SingleRecipeQueryVariables } from '@/gql/types'
import type { QueryResult } from '@/stores/types/query-result'
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export type RecipeStoreType = RecipeStoreStateType & {
	fetchRecipe: (id: number) => void
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

	return { fetchRecipe, recipe }
})
