"use client"

import {Password, columns} from "@/app/passwords/columns";
import {DataTable} from "@/app/passwords/data-table";
import {useUserStore} from "../../store/zustand";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

async function getData(): Promise<Password[]> {
    // TODO: Fetch data from API.
    return [
        {
            id: "728ed52f",
            name: "AGoogle",
            passwordStrength: "mid",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "7l8ed52f",
            name: "ZGoogle",
            passwordStrength: "weak",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "72ged52f",
            name: "Google",
            passwordStrength: "very strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "728ed72f",
            name: "Google",
            passwordStrength: "strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "72ed72f",
            name: "AAGoogle",
            passwordStrength: "strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "728ed2f",
            name: "Google",
            passwordStrength: "strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "28ed72f",
            name: "Google",
            passwordStrength: "strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "728ed72",
            name: "Google",
            passwordStrength: "strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "728edfed72f",
            name: "Google",
            passwordStrength: "strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "72a8ed72f",
            name: "Google",
            passwordStrength: "strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "728qed72f",
            name: "Google",
            passwordStrength: "strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },
        {
            id: "728ed7f",
            name: "Google",
            passwordStrength: "strong",
            emailOrUsername: "m@example.com",
            password:"ABCD1234"
        },

    ]
}

export default function PasswordTable() {
    const [data,setData] = useState<Password[]>();
    const {user} = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }else{
            getData().then(setData);
        }
    }, [router, user]);

    if (!user) {
        return null;
    }

    return (
        <div className="">
            <DataTable columns={columns} data={data || []} />
        </div>
    )
}
