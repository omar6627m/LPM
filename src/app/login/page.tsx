"use client"

import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {useUserStore} from "../../../store/zustand";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useToast} from "@/components/ui/use-toast";
import {formatDate} from "../../../utils/helpers";
import {Toaster} from "@/components/ui/toaster";

const formSchema = z.object({
    password: z.string().min(4).max(50),
});

const LoginPage = () => {
    const router = useRouter();
    const {toast} = useToast();
    const correctPassword = 'password';
    const {login,user} = useUserStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    });

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [router, user]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch('http://192.168.1.103:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username:"admin", password:values.password }),
            });
            response.json().then(data => {
                login(data.token);
                toast({
                    title: "Login: Successful",
                    description: formatDate(String(new Date())),
                });
                router.push('/');
            }).catch(() => {
                toast({
                    title: "Error: Mac Address Not Allowed",
                    description: formatDate(String(new Date())),
                });
            });
        }catch (e) {
            console.log(e);
            form.setError('password', {
                type: 'manual',
                message: 'Incorrect password. Please try again.',
            });
        }
    }

    return (
        <main className="mt-72 w-5/6 lg:w-1/2 xl:w-1/6 mx-auto">
            <Toaster />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input placeholder="password" type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your master password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </main>

    );
};

export default LoginPage;
