import { Plugin } from "vite";
import { parse, compileScript } from "@vue/compiler-sfc";

export default (): Plugin => {
    return {
        name: "vite:plugin-vue-extend-setup-name",
        enforce: "pre",
        transform(code, id) {
            if (/\.vue$/.test(id)) {
                const { descriptor } = parse(code);
                const result = compileScript(descriptor, { id });
                const name = result.attrs.name;
                const lang = result.attrs.lang;
                const inheriAttrs = result.attrs.inheriAttrs;
                if (name) {
                    const template = `
                    <script lang="${lang ? lang : ""}">
                    export default{
                        name:"${name}",
                        inheriAttrs:${inheriAttrs ? inheriAttrs : false},
                    };
                    </script>
                    `;
                    code += template;
                }
            }

            return code;
        }
    };
};
