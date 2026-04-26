import gql from 'graphql-tag'

export const groceryFragment = gql`
	fragment GroceryItem on GroceryItem {
		id
		title
		category {
			id
			title
		}
		recipes {
			id
			title
			recipes {
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
	}
`
