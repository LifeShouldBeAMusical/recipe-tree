<script setup lang="ts">
import { appVersion } from '@/config'
</script>
<template>
	<v-footer>
		<v-row justify="center">
			<v-col class="text-center mt-4" cols="12">
				<v-chip variant="text" class="mx-1">&copy; {{ new Date().getFullYear() }}</v-chip>
				<v-chip variant="text" class="mx-1">
					{{ appVersion.number }}
					({{ appVersion.stage }})
				</v-chip>
			</v-col>
		</v-row>
	</v-footer>
</template>
