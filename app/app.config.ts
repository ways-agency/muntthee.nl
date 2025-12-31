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
    blogPost: {
      slots: {
        title: "line-clamp-2",
        description: "line-clamp-3",
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
        linkText: "line-clamp-2 whitespace-normal",
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
