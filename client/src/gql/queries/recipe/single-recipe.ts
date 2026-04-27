import gql from 'graphql-tag'

const singleRecipeFragmentQuery = gql`
	fragment SingleRecipe on Recipe {
		id
		title
		components {
			id
			quantity {
				quantity
				unit
			}
			ingredient {
				... on Ingredient {
					id
					title
				}
				... on Recipe {
					id
					title
				}
			}
		}
		uses {
			id
			title
		}
	}
`
export const singleRecipeQuery = gql`
	query SingleRecipe($recipeId: Int!) {
		recipe(recipeId: $recipeId) {
			...SingleRecipe
		}
	}

	${singleRecipeFragmentQuery}
`
