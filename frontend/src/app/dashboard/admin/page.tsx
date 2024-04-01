import React from "react";

async function getData() {
    const response = await fetch("http://127.0.0.1:5000/users");
    return await response.json();
}

async function page() {
    const {
        data: _users
    }: { data: Array<Object>; limit: number; page: number; total: number } = await getData();

    return <div>page</div>;
}

export default page;
