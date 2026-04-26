import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = T | null | undefined
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
	deleteRecipe: Scalars['Boolean']['output']
	renameIngredient: GroceryItem
}

export type MutationAddIngredientToRecipeArgs = {
	ingredient: IngredientInput
	recipeId: Scalars['Int']['input']
}

export type MutationAddRecipeArgs = {
	recipe: RecipeInput
}

export type MutationDeleteRecipeArgs = {
	recipeId: Scalars['Int']['input']
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
} & { ' $fragmentName'?: 'GroceryItemFragment' }

export type GroceryListQueryVariables = Exact<{ [key: string]: never }>

export type GroceryListQuery = {
	__typename?: 'Query'
	groceryList: Array<
		{ __typename?: 'GroceryItem' } & {
			' $fragmentRefs'?: { GroceryItemFragment: GroceryItemFragment }
		}
	>
}

export type AddIngredientMutationVariables = Exact<{
	ingredient: IngredientInput
	recipeId: Scalars['Int']['input']
}>

export type AddIngredientMutation = { __typename?: 'Mutation'; addIngredientToRecipe: number }

export type AddRecipeMutationVariables = Exact<{
	recipe: RecipeInput
}>

export type AddRecipeMutation = {
	__typename?: 'Mutation'
	addRecipe: { __typename?: 'Recipe'; id: string }
}

export type AllRecipesQueryVariables = Exact<{ [key: string]: never }>

export type AllRecipesQuery = {
	__typename?: 'Query'
	recipes: Array<
		{ __typename?: 'Recipe' } & { ' $fragmentRefs'?: { RecipeFragment: RecipeFragment } }
	>
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
} & { ' $fragmentName'?: 'RecipeFragment' }

export type SingleRecipeQueryVariables = Exact<{
	recipeId: Scalars['Int']['input']
}>

export type SingleRecipeQuery = {
	__typename?: 'Query'
	recipe: { __typename?: 'Recipe' } & { ' $fragmentRefs'?: { RecipeFragment: RecipeFragment } }
}

export const GroceryItemFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'GroceryItem' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'GroceryItem' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'recipes' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'recipes' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'title' } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GroceryItemFragment, unknown>
export const RecipeFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Recipe' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recipe' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'components' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'quantity' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'unit' } }
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'ingredient' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'InlineFragment',
												typeCondition: {
													kind: 'NamedType',
													name: { kind: 'Name', value: 'Ingredient' }
												},
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
														{ kind: 'Field', name: { kind: 'Name', value: 'title' } }
													]
												}
											},
											{
												kind: 'InlineFragment',
												typeCondition: {
													kind: 'NamedType',
													name: { kind: 'Name', value: 'Recipe' }
												},
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
														{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'components' },
															selectionSet: {
																kind: 'SelectionSet',
																selections: [
																	{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'quantity' },
																		selectionSet: {
																			kind: 'SelectionSet',
																			selections: [
																				{
																					kind: 'Field',
																					name: { kind: 'Name', value: 'quantity' }
																				},
																				{ kind: 'Field', name: { kind: 'Name', value: 'unit' } }
																			]
																		}
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'ingredient' },
																		selectionSet: {
																			kind: 'SelectionSet',
																			selections: [
																				{
																					kind: 'InlineFragment',
																					typeCondition: {
																						kind: 'NamedType',
																						name: { kind: 'Name', value: 'Ingredient' }
																					},
																					selectionSet: {
																						kind: 'SelectionSet',
																						selections: [
																							{
																								kind: 'Field',
																								name: { kind: 'Name', value: 'id' }
																							},
																							{
																								kind: 'Field',
																								name: { kind: 'Name', value: 'title' }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<RecipeFragment, unknown>
export const GroceryListDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GroceryList' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'groceryList' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GroceryItem' } }]
						}
					}
				]
			}
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'GroceryItem' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'GroceryItem' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'recipes' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'recipes' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'title' } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GroceryListQuery, GroceryListQueryVariables>
export const AddIngredientDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'AddIngredient' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'ingredient' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'IngredientInput' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'addIngredientToRecipe' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'ingredient' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'ingredient' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'recipeId' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } }
							}
						]
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AddIngredientMutation, AddIngredientMutationVariables>
export const AddRecipeDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'AddRecipe' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'recipe' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'RecipeInput' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'addRecipe' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'recipe' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'recipe' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AddRecipeMutation, AddRecipeMutationVariables>
export const AllRecipesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'AllRecipes' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'recipes' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Recipe' } }]
						}
					}
				]
			}
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Recipe' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recipe' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'components' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'quantity' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'unit' } }
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'ingredient' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'InlineFragment',
												typeCondition: {
													kind: 'NamedType',
													name: { kind: 'Name', value: 'Ingredient' }
												},
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
														{ kind: 'Field', name: { kind: 'Name', value: 'title' } }
													]
												}
											},
											{
												kind: 'InlineFragment',
												typeCondition: {
													kind: 'NamedType',
													name: { kind: 'Name', value: 'Recipe' }
												},
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
														{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'components' },
															selectionSet: {
																kind: 'SelectionSet',
																selections: [
																	{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'quantity' },
																		selectionSet: {
																			kind: 'SelectionSet',
																			selections: [
																				{
																					kind: 'Field',
																					name: { kind: 'Name', value: 'quantity' }
																				},
																				{ kind: 'Field', name: { kind: 'Name', value: 'unit' } }
																			]
																		}
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'ingredient' },
																		selectionSet: {
																			kind: 'SelectionSet',
																			selections: [
																				{
																					kind: 'InlineFragment',
																					typeCondition: {
																						kind: 'NamedType',
																						name: { kind: 'Name', value: 'Ingredient' }
																					},
																					selectionSet: {
																						kind: 'SelectionSet',
																						selections: [
																							{
																								kind: 'Field',
																								name: { kind: 'Name', value: 'id' }
																							},
																							{
																								kind: 'Field',
																								name: { kind: 'Name', value: 'title' }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AllRecipesQuery, AllRecipesQueryVariables>
export const SingleRecipeDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'SingleRecipe' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'recipe' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'recipeId' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Recipe' } }]
						}
					}
				]
			}
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Recipe' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recipe' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'components' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'quantity' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'unit' } }
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'ingredient' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'InlineFragment',
												typeCondition: {
													kind: 'NamedType',
													name: { kind: 'Name', value: 'Ingredient' }
												},
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
														{ kind: 'Field', name: { kind: 'Name', value: 'title' } }
													]
												}
											},
											{
												kind: 'InlineFragment',
												typeCondition: {
													kind: 'NamedType',
													name: { kind: 'Name', value: 'Recipe' }
												},
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
														{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'components' },
															selectionSet: {
																kind: 'SelectionSet',
																selections: [
																	{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'quantity' },
																		selectionSet: {
																			kind: 'SelectionSet',
																			selections: [
																				{
																					kind: 'Field',
																					name: { kind: 'Name', value: 'quantity' }
																				},
																				{ kind: 'Field', name: { kind: 'Name', value: 'unit' } }
																			]
																		}
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'ingredient' },
																		selectionSet: {
																			kind: 'SelectionSet',
																			selections: [
																				{
																					kind: 'InlineFragment',
																					typeCondition: {
																						kind: 'NamedType',
																						name: { kind: 'Name', value: 'Ingredient' }
																					},
																					selectionSet: {
																						kind: 'SelectionSet',
																						selections: [
																							{
																								kind: 'Field',
																								name: { kind: 'Name', value: 'id' }
																							},
																							{
																								kind: 'Field',
																								name: { kind: 'Name', value: 'title' }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SingleRecipeQuery, SingleRecipeQueryVariables>
