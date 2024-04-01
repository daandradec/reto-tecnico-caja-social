'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

export async function login(formData: FormData){

    const response = await (await fetch('http://127.0.0.1:5000/login', {body:formData})).json();

    if(!response){
        cookies()
        .set('errors', 'Invalid Credentials', {
                expires: new Date(Date.now() + 10 * 1000), path:"/login",
            }
        );    
    }else
        redirect("/dashboard");  
}