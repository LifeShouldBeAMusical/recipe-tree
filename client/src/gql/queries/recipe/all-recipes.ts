import gql from 'graphql-tag'

const recipeFragmentQuery = gql`
	fragment Recipe on Recipe {
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
						}
					}
				}
			}
		}
	}
`

export const allRecipesQuery = gql`
	query AllRecipes {
		recipes {
			...Recipe
		}
	}

	${recipeFragmentQuery}
`
