<script setup lang="ts">
import type { GroceryItemFragment } from '@/gql/types'
import RecipeAndParents from './RecipeAndParents.vue'

defineProps<{ groceryItem: GroceryItemFragment }>()
</script>

<template>
	<v-list-item :title="groceryItem.title">
		<span v-if="groceryItem.recipes">
			(
			<template v-for="(r, i) in groceryItem.recipes" :key="r.id">
				<template v-if="i > 0">, </template>
				<recipe-and-parents :recipe="r" />
			</template>
			)
		</span>
	</v-list-item>
</template>
