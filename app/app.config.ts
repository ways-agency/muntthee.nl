export default defineAppConfig({
  ui: {
    colors: {
      primary: "mint",
    },
    button: {
      slots: {
        base: "rounded-full",
      },
    },
    pageHero: {
      slots: {
        title: "font-heading",
      },
    },
    pageSection: {
      slots: {
        title: "font-heading",
      },
    },
  },
});
