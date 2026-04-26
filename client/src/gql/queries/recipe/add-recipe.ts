import gql from 'graphql-tag'

export const addRecipeMutation = gql`
	mutation AddRecipe($recipe: RecipeInput!) {
		addRecipe(recipe: $recipe) {
			id
		}
	}
`
