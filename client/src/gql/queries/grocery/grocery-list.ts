import gql from 'graphql-tag'
import { groceryFragment } from './grocery-fragment'

export const groceryListQuery = gql`
	query GroceryList {
		groceryList {
			...GroceryItem
		}
	}

	${groceryFragment}
`
