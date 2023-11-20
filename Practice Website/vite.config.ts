import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path, { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: "@src", replacement: path.resolve(__dirname, "./src") },
			{
				find: "@gql",
				replacement: path.resolve(__dirname, "./src/generated"),
			},
		],
	},
	build: {
		outDir: "build",
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
			},
		},
	},
})
