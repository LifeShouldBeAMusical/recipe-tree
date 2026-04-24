import gql from 'graphql-tag'
import { recipeFragmentQuery } from './recipe-fragment'

export const singleRecipeQuery = gql`
	query SingleRecipe($recipeId: Int!) {
		recipe(recipeId: $recipeId) {
			...Recipe
		}
	}

	${recipeFragmentQuery}
`
