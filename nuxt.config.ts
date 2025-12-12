// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    bolClientId: process.env.BOL_CLIENT_ID,
    bolClientSecret: process.env.BOL_CLIENT_SECRET,
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/seo",
    "@nuxt/content",
    "nuxt-studio",
  ],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  site: {
    url: "https://muntthee.nl/",
    indexable: false,
  },
  studio: {
    // Studio admin route (default: '/_studio')
    route: "/admin",

    // GitHub repository configuration (owner and repo are required)
    repository: {
      provider: "github", // only GitHub is currently supported
      owner: "ways-agency", // your GitHub username or organization
      repo: "muntthee.nl", // your repository name
      branch: "main", // the branch to commit to (default: main)
    },
  },
  nitro: {
    prerender: {
      // Pre-render the homepage
      routes: ["/"],
      // Then crawl all the links on the page
      crawlLinks: true,
    },
  },
});
