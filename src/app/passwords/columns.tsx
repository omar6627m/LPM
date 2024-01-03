"use client"

import {ColumnDef} from "@tanstack/react-table";
import React, {useState} from "react";
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
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {formatDate} from "../../../utils/helpers";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Password = {
    id: string
    name: string
    emailOrUsername: string
    password: string
    passwordStrength: "weak" | "mid" | "strong" | "very strong"
}

const formSchema = z.object({
    password: z.string().min(4).max(50),
    name: z.string().min(4).max(50),
    emailOrUsername: z.string().min(4).max(50),
});

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
            const password = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [dialog, setDialog] = useState("edit");
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [dialogOpen, setDialogOpen] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                    password: password.password,
                    name: password.name,
                    emailOrUsername: password.emailOrUsername,
                },
            });
            function onSubmitEdit(values: z.infer<typeof formSchema>) {
                console.log(values)
                if (true) {
                    toast({
                        title: "Password: Updated",
                        description: formatDate(String(new Date())),
                    });
                    setDialogOpen(false);
                }else {
                    // when an error from the server is returned
                }
            }

            function onSubmitDelete() {
                if (true) {
                    toast({
                        title: "Password: Deleted",
                        description: formatDate(String(new Date())),
                    });
                    setDialogOpen(false);
                }else {
                    // when an error from the server is returned
                }
            }

            const editDialog = (
                <DialogHeader>
                    <DialogTitle>Edit Password</DialogTitle>
                    <DialogDescription className="flex flex-col">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="A website name or anything" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="emailOrUsername"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email or Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your login identifier" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="password" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            );

            const deleteDialog = (
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription className="flex flex-col">
                        <p>This action cannot be undone. This will permanently delete this password ({password.name})
                            from the database.</p>
                        <DialogClose asChild>
                            <Button className="mt-5 ml-auto" variant="destructive"
                                    onClick={onSubmitDelete}>Delete</Button>
                        </DialogClose>
                    </DialogDescription>
                </DialogHeader>
            );

            return (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <IoIosMore className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(password.password)}
                            >
                                Copy Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DialogTrigger asChild onClick={()=> setDialog("edit")}>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger asChild onClick={()=> setDialog("delete")}>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        { dialog === "edit" ? editDialog : deleteDialog}
                    </DialogContent>
                </Dialog>
            );
        },
    }
]
