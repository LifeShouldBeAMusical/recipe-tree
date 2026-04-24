import { apolloClient } from '@/client'
import { groceryListQuery } from '@/gql/queries/grocery/grocery-list'
import type { GroceryItemFragment, GroceryListQuery, GroceryListQueryVariables } from '@/gql/types'
import type { QueryResult } from '@/stores/types/query-result'
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export type GroceryListStoreType = GroceryListStoreStateType & {
	fetchGroceryList: () => void
	// setPageNumber: (i: number) => void
	// setPageSize: (i: number | null) => void
}

type GroceryListStoreStateType = {
	groceryList: QueryResult<GroceryItemFragment[]> | Ref<QueryResult<GroceryItemFragment[]>>
	// pageNumber: number | Ref<number>
	// pageSize: number | Ref<number>
	// totalCount: number | undefined | Ref<number | undefined>
	// totalPages: number | undefined | Ref<number | undefined>
}

provideApolloClient(apolloClient)

const {
	load: loadGroceryData,
	onResult: onGroceryResult,
	loading: groceryLoading,
	error: groceryError
} = useLazyQuery<GroceryListQuery, GroceryListQueryVariables>(groceryListQuery)

export const useGroceryStore = defineStore('grocery-list', (): GroceryListStoreType => {
	// const totalCount = ref<number>()
	// const totalPages = ref<number>()

	// const pageSize = ref(10)
	// const setPageSize = (i: number | null) => (pageSize.value = i ?? 10)

	// const pageNumber = ref(1)
	// const setPageNumber = (i: number) => (pageNumber.value = i)
	// watch(pageSize, () => (pageNumber.value = 1))

	const groceryData = ref<GroceryItemFragment[]>([])
	const groceryList = computed<QueryResult<GroceryItemFragment[]>>(() => ({
		data: groceryData.value,
		loading: groceryLoading.value ? true : false,
		errorState: groceryError.value ? true : false
	}))
	onGroceryResult(
		/* istanbul ignore next */
		({ data }) => {
			groceryData.value = data?.groceryList ?? []
			// totalCount.value = data?.glacier.page.meta.totalCount
			// totalPages.value = data?.glacier.page.meta.totalPages
		}
	)
	const fetchGroceryList = () =>
		loadGroceryData(groceryListQuery, {
			// pageNumber: pageNumber.value,
			// pageSize: pageSize.value
		})
	// watch(pageNumber, () => fetchRecipeList())
	// watch(pageSize, () => fetchRecipeList())

	return {
		fetchGroceryList,
		groceryList
		// pageNumber,
		// pageSize,
		// setPageNumber,
		// setPageSize,
		// totalCount,
		// totalPages
	}
})
