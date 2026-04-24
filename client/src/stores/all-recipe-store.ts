import { apolloClient } from '@/client'
import { allRecipesQuery } from '@/gql/queries/recipe/all-recipes'
import type { AllRecipesQuery, AllRecipesQueryVariables, RecipeFragment } from '@/gql/types'
import type { QueryResult } from '@/stores/types/query-result'
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export type RecipeListStoreType = RecipeListStoreStateType & {
	fetchRecipeList: () => void
	// setPageNumber: (i: number) => void
	// setPageSize: (i: number | null) => void
}

type RecipeListStoreStateType = {
	recipeList: QueryResult<RecipeFragment[]> | Ref<QueryResult<RecipeFragment[]>>
	// pageNumber: number | Ref<number>
	// pageSize: number | Ref<number>
	// totalCount: number | undefined | Ref<number | undefined>
	// totalPages: number | undefined | Ref<number | undefined>
}

provideApolloClient(apolloClient)

const {
	load: loadRecipeData,
	onResult: onRecipeResult,
	loading: recipeLoading,
	error: recipeError
} = useLazyQuery<AllRecipesQuery, AllRecipesQueryVariables>(allRecipesQuery)

export const useAllRecipeStore = defineStore('all-recipe', (): RecipeListStoreType => {
	// const totalCount = ref<number>()
	// const totalPages = ref<number>()

	// const pageSize = ref(10)
	// const setPageSize = (i: number | null) => (pageSize.value = i ?? 10)

	// const pageNumber = ref(1)
	// const setPageNumber = (i: number) => (pageNumber.value = i)
	// watch(pageSize, () => (pageNumber.value = 1))

	const recipeData = ref<RecipeFragment[]>([])
	const recipeList = computed<QueryResult<RecipeFragment[]>>(() => ({
		data: recipeData.value,
		loading: recipeLoading.value ? true : false,
		errorState: recipeError.value ? true : false
	}))
	onRecipeResult(
		/* istanbul ignore next */
		({ data }) => {
			recipeData.value = data?.recipes ?? []
			// totalCount.value = data?.glacier.page.meta.totalCount
			// totalPages.value = data?.glacier.page.meta.totalPages
		}
	)
	const fetchRecipeList = () =>
		loadRecipeData(allRecipesQuery, {
			// pageNumber: pageNumber.value,
			// pageSize: pageSize.value
		})
	// watch(pageNumber, () => fetchRecipeList())
	// watch(pageSize, () => fetchRecipeList())

	return {
		fetchRecipeList,
		recipeList
		// pageNumber,
		// pageSize,
		// setPageNumber,
		// setPageSize,
		// totalCount,
		// totalPages
	}
})
