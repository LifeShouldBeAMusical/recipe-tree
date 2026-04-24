import gql from 'graphql-tag'

export const addIngredientMutation = gql`
	mutation AddIngredient($ingredient: IngredientInput!, $recipeId: Int!) {
		addIngredientToRecipe(ingredient: $ingredient, recipeId: $recipeId)
	}
`
