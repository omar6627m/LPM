"use client"

import React, {ChangeEvent, useState} from 'react';
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
import {useUserStore} from "../../store/zustand";
import {Label} from "@/components/ui/label";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";

const formSchema = z.object({
    password: z.string().min(4).max(50),
    name: z.string().min(4).max(50),
    username: z.string().min(4).max(50),
});

interface FormData {
    file: File | null;
}

const CTA = () => {
    const [newPasswordOpen, setNewPasswordOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            name: "",
            username: "",
        },
    });
    const {user,toggleRefresh} = useUserStore();
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [importFormData, setImportFormData] = useState<FormData>({
        file: null,
    });
    async function onExportClick(){
        try {
            const response = await fetch('http://localhost:8080/password/exportKeyInfos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}`
                },
            });
            response.json().then(data=>{
                console.log(data);
                // Convert the data to a Blob
                const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
                // Create a download link
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);

                // Set the download attribute and filename
                downloadLink.download = 'exported_data.json';

                // Append the link to the body
                document.body.appendChild(downloadLink);

                // Trigger the download
                downloadLink.click();

                // Clean up: remove the link and revoke the Object URL
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(downloadLink.href);
                toast({
                    title: "Passwords: Exported",
                    description: formatDate(String(new Date())),
                });
            })
        }catch (e) {
            toast({
                title: "Error: Try again.",
                description: formatDate(String(new Date())),
            });
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        setImportFormData(prev=>({
            ...prev,
            file: selectedFile || null,
        }));
    };

    async function onImportSubmit(){
        console.log(importFormData)
        let fileContent:string = "";
        try {
            if (importFormData.file) {
                fileContent = await readFileContent(importFormData.file);
            }
            const response = await fetch('http://localhost:8080/password/importKeyInfos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}`
                },
                body:fileContent
            });
            if (response.ok) {
                toast({
                    title: "Passwords: Imported",
                    description: formatDate(String(new Date())),
                });
                setImportDialogOpen(false);
                toggleRefresh();
            }else{
                toast({
                    title: "Error: Try again",
                    description: formatDate(String(new Date())),
                });
            }
        }catch (e) {
            toast({
                title: "Error: Try again.",
                description: formatDate(String(new Date())),
            });
        }
    }

    const readFileContent = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    resolve(event.target.result as string);
                } else {
                    reject(new Error('Failed to read file content'));
                }
            };
            reader.readAsText(file);
        });
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch('http://localhost:8080/password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}`
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                toast({
                        title: "Password: Created",
                        description: formatDate(String(new Date())),
                    });
                setNewPasswordOpen(false);
                toggleRefresh();
            }else{
                toast({
                    title: "Error: Try again.",
                    description: formatDate(String(new Date())),
                });
                setNewPasswordOpen(false);
            }
        }catch (e) {
            toast({
                title: "Error: Try again.",
                description: formatDate(String(new Date())),
            });
            setNewPasswordOpen(false);
        }
    }

    return (
        <div className="py-4 flex justify-between items-center">
            <div className="flex space-x-4">
                <Button variant="outline" onClick={()=>{setImportDialogOpen(true)}}>
                    <CiExport className="mr-2 h-4 w-4" /> Import
                </Button>
                <Button variant="outline" onClick={onExportClick}>
                    <CiExport className="mr-2 h-4 w-4" /> Export
                </Button>
            </div>


            <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Import passwords from a file</DialogTitle>
                        <DialogDescription>
                            <div className="grid w-full my-5 max-w-sm items-center gap-1.5">
                                <Label htmlFor="fileInput">File</Label>
                                <Input type="file"
                                       id="fileInput"
                                       accept=".json"
                                       onChange={handleFileChange}
                                />
                            </div>
                            <Button onClick={onImportSubmit}>Import</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
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
                                        name="username"
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
