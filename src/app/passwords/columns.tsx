"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Badge} from "@/components/ui/badge";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {IoIosMore} from "react-icons/io";
import {RiExpandUpDownLine} from "react-icons/ri";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Password = {
    id: string
    name: string
    emailOrUsername: string
    password: string
    passwordStrength: "weak" | "mid" | "strong" | "very strong"
}

export const columns: ColumnDef<Password>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <RiExpandUpDownLine className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "emailOrUsername",
        header: "Email Or Username",
    },
    {
        accessorKey: "password",
        header: "Password",
    },
    {
        accessorKey: "passwordStrength",
        header: "Password Strength",
        cell:({row})=>{
            let value = String(row.getValue("passwordStrength"));
            switch (value) {
                case "weak":
                    return (
                        <Badge variant="destructive">{value}</Badge>
                    );
                case "strong":
                    return (
                        <Badge variant="outline">{value}</Badge>
                    );
                case "very strong":
                    return (
                        <Badge variant="default">{value}</Badge>
                    );
                default:
                    return (
                        <Badge variant="secondary">{value}</Badge>
                    );

            }
        }
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const password = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <IoIosMore className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(password.password)}
                        >
                            Copy Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
