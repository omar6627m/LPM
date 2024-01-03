"use client"

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {CiExport} from "react-icons/ci";
import {IoMdAdd} from "react-icons/io";
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
import {formatDate} from "../../utils/helpers";
import {router} from "next/client";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const formSchema = z.object({
    password: z.string().min(4).max(50),
    name: z.string().min(4).max(50),
    emailOrUsername: z.string().min(4).max(50),
});

const CTA = () => {
    const [newPasswordOpen, setNewPasswordOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            name: "",
            emailOrUsername: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        if (true) {
            toast({
                title: "Password: Created",
                description: formatDate(String(new Date())),
            });
            setNewPasswordOpen(false);
        }else {
            // when an error from the server is returned
        }
    }

    return (
        <div className="py-4 flex justify-between items-center">
            <div className="flex space-x-4">
                <Button variant="outline">
                    <CiExport className="mr-2 h-4 w-4" /> Import
                </Button>
                <Button variant="outline">
                    <CiExport className="mr-2 h-4 w-4" /> Export
                </Button>
            </div>
            <Dialog open={newPasswordOpen} onOpenChange={setNewPasswordOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" size="icon">
                        <IoMdAdd className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a new password</DialogTitle>
                        <DialogDescription>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CTA;
