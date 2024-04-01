export const ENV = {
    host: process.env.NEXT_PUBLIC_API_BACKEND,
    api: {
        auth: `${process.env.NEXT_PUBLIC_API_BACKEND}${process.env.NEXT_PUBLIC_APi_SERVICE_AUTH}`,
        users: `${process.env.NEXT_PUBLIC_API_BACKEND}${process.env.NEXT_PUBLIC_APi_SERVICE_USERS}`,
        savingaccounts: `${process.env.NEXT_PUBLIC_API_BACKEND}${process.env.NEXT_PUBLIC_APi_SERVICE_SAVING_ACCOUNTS}`
    }
}