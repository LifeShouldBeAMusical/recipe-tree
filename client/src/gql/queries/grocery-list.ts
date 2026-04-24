import gql from 'graphql-tag'

export const groceryListQuery = gql`
	query GroceryList {
		groceryList {
			id
			title
			recipes {
				id
				title
				recipes {
					id
					title
				}
			}
		}
	}
`
