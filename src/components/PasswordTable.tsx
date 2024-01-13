"use client"

import {Password, columns} from "@/app/passwords/columns";
import {DataTable} from "@/app/passwords/data-table";
import {useUserStore} from "../../store/zustand";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {formatDate} from "../../utils/helpers";

async function getData(token: string): Promise<Password[]> {
    try {
        const response = await fetch('http://192.168.1.101:8080/password/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();

        const returned: Password[] = data.map((pass: Password) => {
            if (pass.password.length <= 4) {
                pass.passwordStrength = 'weak';
            } else if (pass.password.length <= 8) {
                pass.passwordStrength = 'mid';
            } else if (pass.password.length <= 12) {
                pass.passwordStrength = 'strong';
            } else {
                pass.passwordStrength = 'very strong';
            }
            return pass;
        });

        return returned;
    } catch (e) {
        console.error(e);
        throw new Error('Error fetching data');
    }
}

export default function PasswordTable() {
    const [data,setData] = useState<Password[]>();
    const {user,refresh} = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }else{
            getData(user).then(setData);
        }
    }, [router, user,refresh]);

    if (!user) {
        return null;
    }

    return (
        <div className="">
            <DataTable columns={columns} data={data || []} />
        </div>
    )
}
