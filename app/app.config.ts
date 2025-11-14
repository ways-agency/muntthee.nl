export default defineAppConfig({
  ui: {
    colors: {
      primary: "mint",
    },
    navigationMenu: {
      compoundVariants: [
        {
          disabled: false,
          active: true,
          variant: "pill",
          class: {
            link: ["before:bg-muted hover:before:bg-muted"],
          },
        },
      ],
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
  },
});
