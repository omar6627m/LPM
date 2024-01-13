"use client"

import React, {ChangeEvent, useEffect, useState} from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/theme-toggle";
import {LuLogOut} from "react-icons/lu";
import {RiSettings5Line} from "react-icons/ri";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useUserStore} from "../../store/zustand";
import {formatDate} from "../../utils/helpers";
import {toast, useToast} from "@/components/ui/use-toast";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Password} from "@/app/passwords/columns";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";

interface MacAddress{
    id: number
    macAddress: string
}

const Header = () => {
    const {logout,user} = useUserStore();
    const [macAddress, setMacAddress] = useState("");
    const [macAddresses, setMacAddresses] = useState<MacAddress[]>([]);
    const {toast} = useToast();

    const handleMacInputChange = (event: ChangeEvent<HTMLInputElement>)=>{
        setMacAddress(event.target.value);
    }

    const onAddMacAddressSubmit = async()=>{
        try {
                const response = await fetch('http://localhost:8080/mac/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}`
                },
                body: JSON.stringify(macAddress),
            });
            if (response.ok) {
                toast({
                    title: "Mac Address: Added",
                    description: formatDate(String(new Date())),
                });
                fetchMacAddresses().then(setMacAddresses);
            }else{
                toast({
                    title: "Error: Try again",
                    description: formatDate(String(new Date())),
                });
            }

        }catch (e) {
            console.log(e);
            toast({
                title: "Error: Try again",
                description: formatDate(String(new Date())),
            });
        }
    }

    const onAddMacAddressDelete = async(id:number)=>{
        try {
            const response = await fetch(`http://localhost:8080/mac/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}`
                }
            });
            if (response.ok) {
                toast({
                    title: "Mac Address: DELETED",
                    description: formatDate(String(new Date())),
                });
                fetchMacAddresses().then(setMacAddresses);
            }else{
                toast({
                    title: "Error: Try again",
                    description: formatDate(String(new Date())),
                });
            }

        }catch (e) {
            console.log(e);
            toast({
                title: "Error: Try again",
                description: formatDate(String(new Date())),
            });
        }
    }

    useEffect(() => {
        fetchMacAddresses().then(setMacAddresses);
    }, []);



    const fetchMacAddresses = async ()=>{
        try {
            const response = await fetch('http://localhost:8080/mac/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}`
                }
            });

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
            throw new Error('Error fetching data');
        }
    }

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
                <Sheet >
                    <SheetTrigger>
                        <Button variant="outline" size="icon">
                            <RiSettings5Line className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>MAC Addresses of allowed devices</SheetTitle>
                            <SheetDescription>
                                <div className="grid w-full my-5 max-w-sm items-center gap-1.5">
                                    <Label htmlFor="mac">Add a mac Address</Label>
                                    <Input type="text" id="mac" onChange={handleMacInputChange}
                                    />
                                </div>
                                <Button onClick={onAddMacAddressSubmit}>Add</Button>
                                <Card className="mt-5">
                                    {macAddresses.map((mac) => (
                                        <div key={mac.id} className="my-3 flex items-center justify-between p-3 mb-2 rounded">
                                            <span>{mac.macAddress}</span>
                                            <Button variant="destructive" onClick={()=> {
                                                onAddMacAddressDelete(mac.id)
                                            }}>Delete</Button>
                                        </div>
                                    ))}
                                </Card>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <Button variant="outline" size="icon" onClick={()=>{
                    logout();
                    toast({
                        title: "Logout: Successful",
                        description: formatDate(String(new Date())),
                    })
                }}>
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
