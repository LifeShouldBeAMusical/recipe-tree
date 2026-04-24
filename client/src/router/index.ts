import RecipeListView from '@/views/RecipeListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'home',
		component: RecipeListView
	},
	{
		path: '/recipes',
		name: 'recipes',
		component: RecipeListView
	},
	{
		path: '/recipe/:id',
		name: 'single-recipe',
		component: () => import('../views/SingleRecipeView.vue')
	},
	{
		path: '/groceries',
		name: 'grocery-list',
		component: () => import('../views/GroceryListView.vue')
	}
	// {
	// 	path: '/about',
	// 	name: 'about',
	// 	component: () => import('../views/AboutView.vue')
	// },
	// {
	// 	path: '/:pathMatch(.*)*',
	// 	name: 'NotFound',
	// 	component: () => import('../views/PageNotFoundView.vue')
	// }
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
