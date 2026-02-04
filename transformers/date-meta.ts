import { defineTransformer } from "@nuxt/content";

export default defineTransformer({
  name: "date-meta",
  extensions: [".md"], // File extensions to apply this transformer to
  async transform(file) {
    const cwd = process.cwd();
    const path = await import("path");
    const { birthtime } = await import("fs/promises").then((fs) =>
      fs.stat(path.join(cwd, "content", file.id as string)),
    );

    return {
      ...file,
      dateCreated: birthtime,
    };
    // Modify the file object as needed
    // return {
    //   ...file,
    //   createdAt: file.createdAt,
    // }
  },
});
