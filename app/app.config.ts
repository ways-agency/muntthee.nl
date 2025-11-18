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
        container: "lg:py-24",
      },
    },
    prose: {
      blockquote: {
        base: "border-primary",
      },
    },
    contentToc: {
      slots: {
        link: "font-bold",
      },
      variants: {
        active: {
          false: {
            link: "font-normal",
          },
        },
      },
    },
  },
});
