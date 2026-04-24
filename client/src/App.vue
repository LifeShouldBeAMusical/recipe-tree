<script setup lang="ts">
import Footer from '@/components/FooterComponent.vue'
import MenuBar from '@/components/MenuBar.vue'
</script>

<template>
	<v-app class="d-flex flex-column">
		<MenuBar />
		<v-container class="router" fluid>
			<RouterView />
		</v-container>
		<Footer />
	</v-app>
</template>

<style>
.router {
	margin: 4em 0 0 0;
}
</style>
