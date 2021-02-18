import { NuxtConfig } from '@nuxt/types'
// import colors from 'vuetify/es5/util/colors'

const dev: boolean = process.env.NODE_ENV === 'development'

const config: NuxtConfig = {
    server: {
        port: process.env.PORT || 3000,
        host: dev ? 'localhost' : '0.0.0.0'
    },

    dev,

    serverMiddleware: [
        {
            path: '/api',
            handler: '~/api/app.ts'
        }
    ],

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        titleTemplate: '%s - Tracker',
        title: 'Tracker',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Track habits and set goals'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    loading: {
        color: 'blue',
        failedColor: 'blue'
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['@/assets/main'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        'nuxt-build-optimisations'
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth-next',
        '@nuxtjs/device'
    ],

    buildOptimisations: {
        profile: 'risky'
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: ''
    },

    auth: {
        localStorage: undefined,
        watchLoggedIn: true,
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'access_token',
                    maxAge: 60
                },
                refreshToken: {
                    property: 'refresh_token',
                    maxAge: 60 * 60 * 24 * 7
                },
                user: {
                    property: 'user'
                },
                endpoints: {
                    login: {
                        url: '/api/auth/login',
                        method: 'post'
                    },
                    logout: false,
                    user: {
                        url: '/api/auth/user',
                        method: 'get'
                    },
                    refresh: {
                        url: '/api/auth/refresh',
                        method: 'post'
                    }
                }
            }
        },
        redirect: {
            login: '/auth',
            home: '/',
            logout: '/auth'
        }
    },

    router: {
        middleware: ['auth']
    },

    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true
            // themes: {
            //     dark: {
            //         primary: colors.blue.darken2,
            //         accent: colors.grey.darken3,
            //         secondary: colors.amber.darken3,
            //         info: colors.teal.lighten1,
            //         warning: colors.amber.base,
            //         error: colors.deepOrange.accent4,
            //         success: colors.green.accent3
            //     }
            // }
        },
        treeShake: {
            components: ['VBtn']
        }
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},

    pwa: {
        meta: {
            mobileAppIOS: true
        },
        manifest: {
            name: 'Todo Tracker',
            short_name: 'Tracker'
        }
    }
}

export default config
