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

const formSchema = z.object({
    password: z.string().min(4).max(50),
})

const LoginPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // TODO: some ux for feedback
        if (values.password === correctPassword) {
            login("token");
            router.push('/');
        }else {
            form.setError('password', {
                type: 'manual',
                message: 'Incorrect password. Please try again.',
            });
            setPassword("");
        }
    }

    return (
        <main className="mt-72 w-1/6">
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
