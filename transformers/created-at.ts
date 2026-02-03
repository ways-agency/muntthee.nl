import { defineTransformer } from "@nuxt/content";

export default defineTransformer({
  name: "created-at",
  extensions: [".md"], // File extensions to apply this transformer to
  async transform(file) {
    const cwd = process.cwd();
    const path = await import("path");
    const { mtime, birthtime } = await import("fs/promises").then((fs) =>
      fs.stat(path.join(cwd, "content", file.id as string)),
    );

    console.log("file", file);

    const dateCreated = birthtime;
    const dateModified = mtime;
    let datePublished;

    if (file.datePublished !== undefined) {
      console.log("file.datePublished is defined");
      datePublished = file.datePublished;
    } else if (!file.draft) {
      console.log("file.draft is false", dateModified);
      datePublished = dateModified;
    } else {
      console.log("file.draft is true");
      datePublished = undefined;
    }

    console.log("datePublished", datePublished);

    return {
      ...file,
      dateCreated,
      dateModified,
      datePublished,
    };
    // Modify the file object as needed
    // return {
    //   ...file,
    //   createdAt: file.createdAt,
    // }
  },
});
