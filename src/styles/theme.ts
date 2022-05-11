import {extendTheme, ThemeConfig, useColorMode} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    config,
    colors: {
        brand: {
            100: "#c9d200",
            // ...
            900: "#1a202c",
        },
    },
    components: {
        Button: {
            baseStyle: {
                //color: "brand.100"
            },
            variants: {
                link:(props: { colorMode: string; }) => {
                    return ({
                        color:  props.colorMode === 'dark' ? "white" : "gray.900",
                        _hover: {
                            color: "brand.100"
                        },
                        _focus: {
                            border: "none",
                            boxShadow: "none"
                        },
                        //bg: "purple"
                    });
                }
            }
        }
    }
})
