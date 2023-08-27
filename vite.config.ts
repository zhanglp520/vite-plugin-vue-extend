import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        emptyOutDir: true,
        lib: {
            entry: "./index.ts",
            name: "@ainiteam/vite-plugin-extend",
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "vue"
                }
            }
        }
    },
    plugins: [
        vue(),
        dts({
            tsConfigFilePath: "../../tsconfig.json"
        })
    ]
});
