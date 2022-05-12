import {extendTheme, ThemeConfig, theme as baseTheme} from "@chakra-ui/react";

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
        accent: {
            100: baseTheme.colors.cyan["200"],
            500: "var(--chakra-colors-orange-500)",
            900: "var(--chakra-colors-red-500)",
        }
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
