import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/theme-toggle";
import {LuLogOut} from "react-icons/lu";
import {RiSettings5Line} from "react-icons/ri";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Header = () => {
    return (
        <header className="py-4 flex justify-between items-center">
            <div className="flex space-x-2 items-center">
                <Image
                    src="/password-svgrepo-com.svg"
                    width={500}
                    height={500}
                    alt="Logo"
                    className="h-8 w-8 mr-2"
                />
                <p className="font-bold text-lg">LPM</p>
            </div>

            <div className="flex items-center space-x-4">
                <ModeToggle />
                <Button variant="outline" size="icon">
                    <RiSettings5Line className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                    <LuLogOut className="h-4 w-4" />
                </Button>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
};

export default Header;
