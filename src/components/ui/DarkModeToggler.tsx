import {Button, useColorMode} from "@chakra-ui/react";
import {SunIcon, MoonIcon} from "@chakra-ui/icons";


export const DarkModeToggler = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <Button onClick={toggleColorMode} variant={"link"}>
            {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
        </Button>
    )
}
