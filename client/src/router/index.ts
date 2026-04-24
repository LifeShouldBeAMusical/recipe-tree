import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
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
