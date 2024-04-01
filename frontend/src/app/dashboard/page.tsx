'use client'
import Dashboard from "./_view/Dashboard";
import React, { useEffect, useState } from "react";

/* IMPORTACION DE HOOKS */
import { useMemory } from "@/context/MemoryContext";
import { useRouter } from "next/navigation";

function page() {  
    return <DashboardProtected/>
}

function DashboardProtected() {
    const { accessToken } = useMemory();
    const router = useRouter();
    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        if(!accessToken)
            router.replace("/login");
        else
            setShowPage(true)
    }, [accessToken, router])
    

    if(!showPage)
        return null;  
    return <Dashboard/>
}

export default page;
