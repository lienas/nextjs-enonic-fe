import React from 'react';
import {
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Link,
    Menu,
    MenuButton,
    Popover, PopoverContent,
    PopoverTrigger,
    Text,
    VStack
} from "@chakra-ui/react";
import NextLink from "next/link";
import {getUrl} from "../../_enonicAdapter/utils";

const MainNavigation = (props: any) => {

    const {getMenuItems: menuItems} = props;

    //strip first segment
    const parsePath = (path: string): string => {
        const pathArr = path.split("/");
        const newArr = [...pathArr.slice(2)];
        return newArr.join("/");
    }

    const SubMenu = (props: any) => {
        const {childs} = props;
        console.log("Submenu %s", childs);
        const submenu = childs?.map((child: any) => {
            return (
                <NextLink href={getUrl(child.path)} key={child.id} passHref>
                    <Button as={"a"}>{child.title}</Button>
                </NextLink>
            )
        })

        return submenu || null
    }

    if (!menuItems) return <></>;

    return (
        menuItems &&
        <div>
            <Heading>Menu</Heading>
            <ButtonGroup variant={"link"}>
                {menuItems.map((item: any, key: number) => {
                    return (
                        <VStack key={item.id}>
                            <Popover trigger={"hover"} placement={'bottom-start'}>

                                <NextLink href={getUrl(parsePath(item.path))} passHref key={key}>
                                    <PopoverTrigger>
                                        <Button as={"a"} disabled={item.isActive}>
                                            {item.title}
                                        </Button>
                                    </PopoverTrigger>
                                </NextLink>

                                <PopoverContent>
                                    {item.children && <SubMenu childs={item.children}/>}
                                </PopoverContent>
                            </Popover>
                        </VStack>
                    )
                })}
            </ButtonGroup>
        </div>
    );
};

export default MainNavigation;
