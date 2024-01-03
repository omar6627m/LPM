import Header from "@/components/header";
import CTA from "@/components/CTA";
import PasswordTable from "@/components/PasswordTable";
import {Toaster} from "@/components/ui/toaster";

export default function Home() {

    return (
        <main>
            <Header/>
            <CTA />
            <PasswordTable />
            <Toaster />
        </main>
    );
}
