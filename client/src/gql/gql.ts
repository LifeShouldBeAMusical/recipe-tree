/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
	'\n\tfragment GroceryItem on GroceryItem {\n\t\tid\n\t\ttitle\n\t\trecipes {\n\t\t\tid\n\t\t\ttitle\n\t\t\trecipes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t}\n\t\t}\n\t}\n': typeof types.GroceryItemFragmentDoc
	'\n\tquery GroceryList {\n\t\tgroceryList {\n\t\t\t...GroceryItem\n\t\t}\n\t}\n\n\t\n': typeof types.GroceryListDocument
	'\n\tquery AllRecipes {\n\t\trecipes {\n\t\t\t...Recipe\n\t\t}\n\t}\n\n\t\n': typeof types.AllRecipesDocument
	'\n\tfragment Recipe on Recipe {\n\t\tid\n\t\ttitle\n\t\tcomponents {\n\t\t\tid\n\t\t\tquantity {\n\t\t\t\tquantity\n\t\t\t\tunit\n\t\t\t}\n\t\t\tingredient {\n\t\t\t\t... on Ingredient {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t\t... on Recipe {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tcomponents {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tquantity {\n\t\t\t\t\t\t\tquantity\n\t\t\t\t\t\t\tunit\n\t\t\t\t\t\t}\n\t\t\t\t\t\tingredient {\n\t\t\t\t\t\t\t... on Ingredient {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n': typeof types.RecipeFragmentDoc
	'\n\tquery SingleRecipe($recipeId: Int!) {\n\t\trecipe(recipeId: $recipeId) {\n\t\t\t...Recipe\n\t\t}\n\t}\n\n\t\n': typeof types.SingleRecipeDocument
}
const documents: Documents = {
	'\n\tfragment GroceryItem on GroceryItem {\n\t\tid\n\t\ttitle\n\t\trecipes {\n\t\t\tid\n\t\t\ttitle\n\t\t\trecipes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t}\n\t\t}\n\t}\n':
		types.GroceryItemFragmentDoc,
	'\n\tquery GroceryList {\n\t\tgroceryList {\n\t\t\t...GroceryItem\n\t\t}\n\t}\n\n\t\n':
		types.GroceryListDocument,
	'\n\tquery AllRecipes {\n\t\trecipes {\n\t\t\t...Recipe\n\t\t}\n\t}\n\n\t\n':
		types.AllRecipesDocument,
	'\n\tfragment Recipe on Recipe {\n\t\tid\n\t\ttitle\n\t\tcomponents {\n\t\t\tid\n\t\t\tquantity {\n\t\t\t\tquantity\n\t\t\t\tunit\n\t\t\t}\n\t\t\tingredient {\n\t\t\t\t... on Ingredient {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t\t... on Recipe {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tcomponents {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tquantity {\n\t\t\t\t\t\t\tquantity\n\t\t\t\t\t\t\tunit\n\t\t\t\t\t\t}\n\t\t\t\t\t\tingredient {\n\t\t\t\t\t\t\t... on Ingredient {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n':
		types.RecipeFragmentDoc,
	'\n\tquery SingleRecipe($recipeId: Int!) {\n\t\trecipe(recipeId: $recipeId) {\n\t\t\t...Recipe\n\t\t}\n\t}\n\n\t\n':
		types.SingleRecipeDocument
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment GroceryItem on GroceryItem {\n\t\tid\n\t\ttitle\n\t\trecipes {\n\t\t\tid\n\t\t\ttitle\n\t\t\trecipes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tfragment GroceryItem on GroceryItem {\n\t\tid\n\t\ttitle\n\t\trecipes {\n\t\t\tid\n\t\t\ttitle\n\t\t\trecipes {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t}\n\t\t}\n\t}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery GroceryList {\n\t\tgroceryList {\n\t\t\t...GroceryItem\n\t\t}\n\t}\n\n\t\n'
): (typeof documents)['\n\tquery GroceryList {\n\t\tgroceryList {\n\t\t\t...GroceryItem\n\t\t}\n\t}\n\n\t\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery AllRecipes {\n\t\trecipes {\n\t\t\t...Recipe\n\t\t}\n\t}\n\n\t\n'
): (typeof documents)['\n\tquery AllRecipes {\n\t\trecipes {\n\t\t\t...Recipe\n\t\t}\n\t}\n\n\t\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment Recipe on Recipe {\n\t\tid\n\t\ttitle\n\t\tcomponents {\n\t\t\tid\n\t\t\tquantity {\n\t\t\t\tquantity\n\t\t\t\tunit\n\t\t\t}\n\t\t\tingredient {\n\t\t\t\t... on Ingredient {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t\t... on Recipe {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tcomponents {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tquantity {\n\t\t\t\t\t\t\tquantity\n\t\t\t\t\t\t\tunit\n\t\t\t\t\t\t}\n\t\t\t\t\t\tingredient {\n\t\t\t\t\t\t\t... on Ingredient {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tfragment Recipe on Recipe {\n\t\tid\n\t\ttitle\n\t\tcomponents {\n\t\t\tid\n\t\t\tquantity {\n\t\t\t\tquantity\n\t\t\t\tunit\n\t\t\t}\n\t\t\tingredient {\n\t\t\t\t... on Ingredient {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t\t... on Recipe {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tcomponents {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tquantity {\n\t\t\t\t\t\t\tquantity\n\t\t\t\t\t\t\tunit\n\t\t\t\t\t\t}\n\t\t\t\t\t\tingredient {\n\t\t\t\t\t\t\t... on Ingredient {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery SingleRecipe($recipeId: Int!) {\n\t\trecipe(recipeId: $recipeId) {\n\t\t\t...Recipe\n\t\t}\n\t}\n\n\t\n'
): (typeof documents)['\n\tquery SingleRecipe($recipeId: Int!) {\n\t\trecipe(recipeId: $recipeId) {\n\t\t\t...Recipe\n\t\t}\n\t}\n\n\t\n']

export function gql(source: string) {
	return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
