export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never
}
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string }
	String: { input: string; output: string }
	Boolean: { input: boolean; output: boolean }
	Int: { input: number; output: number }
	Float: { input: number; output: number }
}

export type Component = {
	__typename?: 'Component'
	id: Scalars['ID']['output']
	ingredient: IngredientRecipe
	quantity?: Maybe<Quantity>
}

export type GroceryItem = {
	__typename?: 'GroceryItem'
	id: Scalars['ID']['output']
	recipes: Array<RecipeTree>
	title: Scalars['String']['output']
}

export type Ingredient = {
	__typename?: 'Ingredient'
	id: Scalars['ID']['output']
	title: Scalars['String']['output']
}

export type IngredientInput = {
	quantity?: InputMaybe<QuantityInput>
	title: Scalars['String']['input']
}

export type IngredientRecipe = Ingredient | Recipe

export type Mutation = {
	__typename?: 'Mutation'
	addIngredientToRecipe: Scalars['Int']['output']
	addRecipe: Recipe
	renameIngredient: GroceryItem
}

export type MutationAddIngredientToRecipeArgs = {
	ingredient: IngredientInput
	recipeId: Scalars['Int']['input']
}

export type MutationAddRecipeArgs = {
	recipe: RecipeInput
}

export type MutationRenameIngredientArgs = {
	ingredientId: Scalars['Int']['input']
	title: Scalars['String']['input']
}

export type Quantity = {
	__typename?: 'Quantity'
	quantity: Scalars['Int']['output']
	unit: Scalars['String']['output']
}

export type QuantityInput = {
	quantity: Scalars['Int']['input']
	unit: Scalars['String']['input']
}

export type Query = {
	__typename?: 'Query'
	groceryList: Array<GroceryItem>
	recipe: Recipe
	recipes: Array<Recipe>
}

export type QueryRecipeArgs = {
	recipeId: Scalars['Int']['input']
}

export type Recipe = {
	__typename?: 'Recipe'
	components: Array<Component>
	id: Scalars['ID']['output']
	title: Scalars['String']['output']
}

export type RecipeInput = {
	ingredients: Array<IngredientInput>
	title: Scalars['String']['input']
}

export type RecipeTree = {
	__typename?: 'RecipeTree'
	id: Scalars['ID']['output']
	recipes: Array<RecipeTree>
	title: Scalars['String']['output']
}

export type GroceryItemFragment = {
	__typename?: 'GroceryItem'
	id: string
	title: string
	recipes: Array<{
		__typename?: 'RecipeTree'
		id: string
		title: string
		recipes: Array<{ __typename?: 'RecipeTree'; id: string; title: string }>
	}>
}

export type GroceryListQueryVariables = Exact<{ [key: string]: never }>

export type GroceryListQuery = {
	__typename?: 'Query'
	groceryList: Array<{
		__typename?: 'GroceryItem'
		id: string
		title: string
		recipes: Array<{
			__typename?: 'RecipeTree'
			id: string
			title: string
			recipes: Array<{ __typename?: 'RecipeTree'; id: string; title: string }>
		}>
	}>
}

export type AllRecipesQueryVariables = Exact<{ [key: string]: never }>

export type AllRecipesQuery = {
	__typename?: 'Query'
	recipes: Array<{
		__typename?: 'Recipe'
		id: string
		title: string
		components: Array<{
			__typename?: 'Component'
			id: string
			quantity?: { __typename?: 'Quantity'; quantity: number; unit: string } | null
			ingredient:
				| { __typename?: 'Ingredient'; id: string; title: string }
				| {
						__typename?: 'Recipe'
						id: string
						title: string
						components: Array<{
							__typename?: 'Component'
							id: string
							quantity?: { __typename?: 'Quantity'; quantity: number; unit: string } | null
							ingredient:
								| { __typename?: 'Ingredient'; id: string; title: string }
								| { __typename?: 'Recipe' }
						}>
				  }
		}>
	}>
}

export type RecipeFragment = {
	__typename?: 'Recipe'
	id: string
	title: string
	components: Array<{
		__typename?: 'Component'
		id: string
		quantity?: { __typename?: 'Quantity'; quantity: number; unit: string } | null
		ingredient:
			| { __typename?: 'Ingredient'; id: string; title: string }
			| {
					__typename?: 'Recipe'
					id: string
					title: string
					components: Array<{
						__typename?: 'Component'
						id: string
						quantity?: { __typename?: 'Quantity'; quantity: number; unit: string } | null
						ingredient:
							| { __typename?: 'Ingredient'; id: string; title: string }
							| { __typename?: 'Recipe' }
					}>
			  }
	}>
}

export type SingleRecipeQueryVariables = Exact<{
	recipeId: Scalars['Int']['input']
}>

export type SingleRecipeQuery = {
	__typename?: 'Query'
	recipe: {
		__typename?: 'Recipe'
		id: string
		title: string
		components: Array<{
			__typename?: 'Component'
			id: string
			quantity?: { __typename?: 'Quantity'; quantity: number; unit: string } | null
			ingredient:
				| { __typename?: 'Ingredient'; id: string; title: string }
				| {
						__typename?: 'Recipe'
						id: string
						title: string
						components: Array<{
							__typename?: 'Component'
							id: string
							quantity?: { __typename?: 'Quantity'; quantity: number; unit: string } | null
							ingredient:
								| { __typename?: 'Ingredient'; id: string; title: string }
								| { __typename?: 'Recipe' }
						}>
				  }
		}>
	}
}
