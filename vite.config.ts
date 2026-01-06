import { defineConfig } from "vite";
import injectGamelists from "./src/vite-plugin-inject-gamelists";
import { viteSingleFile } from "vite-plugin-singlefile";
import htmlMinifier from "vite-plugin-html-minifier";

export default defineConfig({
    plugins: [injectGamelists(), viteSingleFile(), htmlMinifier()],
});
