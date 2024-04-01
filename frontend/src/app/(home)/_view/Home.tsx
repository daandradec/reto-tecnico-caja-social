import React from "react";
import Brand from "@/assets/brand.svg";
import Image from "next/image";
import Link from "next/link";

function Home() {
    return (
        <>
            <section className="flex w-full items-start justify-center">
                <div className="m-auto flex max-w-screen-xl grow flex-col items-center justify-start gap-6 px-3 py-20 md:gap-12 md:px-12 lg:max-w-7xl lg:px-24">
                    <Image src={Brand} alt="logo" width={200} height={200} />
                    <div className="flex flex-1 flex-col items-center gap-6 text-center">
                        <div className="flex max-w-lg flex-col gap-6">
                            <h3 className="text-4xl font-semibold text-slate-950 md:text-6xl">
                                Bienvenido al Banco Challenge
                            </h3>
                            <h4 className="text-lg font-normal leading-7 text-slate-500">
                                Aqui podra crear una cuenta de ahorros de forma
                                casi inmediata y operar sobre ella
                            </h4>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed bg-blue-700 stroke-white px-6 text-white hover:bg-blue-950 h-[42px] min-w-[42px] gap-2 disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100"
                        >
                            <Link href="/register">Registrarse</Link>
                        </button>
                        <button
                            type="button"
                            className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-blue-700 px-2 text-blue-700 h-[42px] min-w-[42px] gap-2 disabled:stroke-slate-400 disabled:text-slate-400 hover:stroke-blue-950 hover:text-blue-950"
                        >
                            <Link href="/login">Loguearse</Link>
                        </button>
                    </div>
                </div>
            </section>

            <section className="m-auto grid w-full max-w-screen-2xl grid-flow-row flex-wrap items-center gap-x-0 gap-y-6 px-3 py-6 text-center md:gap-x-14 md:px-16 md:py-14 lg:grid-cols-2 lg:text-start 2xl:gap-x-24 2xl:px-28 2xl:py-20">
                <div className="flex w-full max-w-2xl items-center justify-center justify-self-end rounded-2xl bg-slate-50 py-20 md:py-32">
                <Image src={Brand} alt="logo" width={80} height={80} />
                </div>
                <div className="flex flex-col gap-6 justify-self-start md:gap-12">
                    <div className="flex max-w-lg flex-col gap-6">
                        <p className="text-sm font-semibold uppercase text-slate-500">
                            Misión &amp; Visión
                        </p>
                        <h3 className="text-4xl font-semibold text-slate-950 md:text-5xl">
                            Facilitar el acceso a una cuenta a todos
                        </h3>
                        <h4 className="text-lg font-normal tracking-tight text-slate-500">
                            Comienza a ahorrar con la cuenta sencilla unica, personal e intransferible de creación muy rapida con el Banco challenge
                        </h4>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed bg-blue-700 stroke-white px-6 text-white hover:bg-blue-950 h-[42px] min-w-[42px] gap-2 disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100"
                        >
                            <Link href="/register">¡Lo Quiero!</Link>
                        </button>
                    </div>
                </div>
                <div className="h-[80px]"></div>
            </section>
        </>
    );
}

export default Home;
