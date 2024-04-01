"use client";

/* IMPORTACIONES DE REACT */
import { PropsWithChildren, createContext, useMemo, useState, useContext, useEffect } from "react";

/* IMPORTACION DE TIPOS */
import type { User } from "@/types/global";



/* TIPADO DE LOS VALORES DEL CONTEXT API */
type ContextValues = {
    user: User | null,
    accessToken: string | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

/* CREACIÓN DE UN CONTEXT */
export const MemoryContext = createContext<ContextValues>({user:null, accessToken: null, setUser: () => {}, setAccessToken: () => {}})


/* COMPONENTE PROVIDER DEL CONTEXT */
export default function MemoryProvider({children}: PropsWithChildren){
    /* LISTADO DE USUARIOS */
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(() => {
        if(typeof window !== "undefined")
            return  window.localStorage.getItem("token") || null
        return null;
    });
    
    /* OPTIMIZACIÓN ANTIRE-RENDERIZADOS */
    const value = useMemo(() => ({user, accessToken, setUser, setAccessToken}), [user, accessToken, setUser, setAccessToken]);
    
    return (
        <MemoryContext.Provider value={value}>
            {children}
        </MemoryContext.Provider>
    )
}


/* HOOK PARA CONSUMIR ESTE CONTEXT */
export function useMemory(){
    return useContext<ContextValues>(MemoryContext);
}

