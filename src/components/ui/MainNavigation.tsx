import React from 'react';
import {Button, ButtonGroup, Flex, Heading, Link, Menu, MenuButton} from "@chakra-ui/react";
import NextLink from "next/link";

const MainNavigation = (props: any) => {


    const {getMenuItems: menuItems} = props;
    console.log("MenuItems in menu-item: %s", menuItems);

    //strip first segment
    const parsePath = (path: string): string => {
        const pathArr = path.split("/");
        const newArr = [pathArr[0], ...pathArr.slice(2)];
        return newArr.join("/");
    }

    if (!menuItems) return <></>;

    return (
        menuItems &&
        <div>
            <Heading>Menu</Heading>
            <ButtonGroup >
                {menuItems.map((item: any, key: number) => {
                    return (
                        <NextLink href={parsePath(item.path)} passHref key={key}>
                            <Button as={"a"}  disabled={item.isActive}>
                                {item.title}
                            </Button>
                        </NextLink>
                    )
                })}
            </ButtonGroup>
        </div>
    );
};

export default MainNavigation;
