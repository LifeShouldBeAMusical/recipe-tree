import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp, h, provide } from 'vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { md2 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// import 'vuetify/styles'

// Vue i18N

const vuetify = createVuetify({
	components,
	directives,
	defaults: {
		global: { FontFace: 'Sofia Sans' }
	},
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: { mdi }
	},
	blueprint: md2
})

import App from '@/App.vue'
import { apolloClient } from '@/client'
import router from '@/router'
import { DefaultApolloClient } from '@vue/apollo-composable'

const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient)
	},
	render: () => h(App)
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
