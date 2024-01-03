import Header from "@/components/header";
import CTA from "@/components/CTA";
import PasswordTable from "@/components/PasswordTable";
import {Toaster} from "@/components/ui/toaster";
import * as z from "zod";


export default function Home() {

    return (
        <main className="px-5">
            <Header/>
            <CTA />
            <PasswordTable />
            <Toaster />
        </main>
    );
}
