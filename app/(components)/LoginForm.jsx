"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            router.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='min-h-screen flex flex-col md:flex-row gap-4 items-center justify-center'>
            <form className="flex flex-col justify-center border-t-8 border-teal-600 bg-gray-200 font-sans sm:flex sm:flex-wrap sm:justify-center sm:mx-24 rounded-lg shadow-2xl p-8 md:w-1/3 " method='post' onSubmit={handleSubmit}>
                <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
                    <h1 className={` mb-3 text-2xl text-center`}>Please Log in to continue.</h1>
                    <div className="w-full">
                        <div>
                            <label className="mb-3 mt-5 block text-xl font-medium " htmlFor="email">Email</label>
                            <div className="relative">
                                <input className="peer block w-full rounded-md border border-gray-200 py-[8px] pl-10 outline-2 placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="mb-3 mt-5 block text-xl font-medium  " htmlFor="password">Password</label>
                            <div className="relative">
                                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={5}
                                    maxLength={8} 
                                    required
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end mt-2  space-x-4">
                        <Link className="text-sm mt-3 text-right" href={"/register"}>
                            {` Don't have an account ? Register`}
                        </Link>

                        <button className='bg-teal-600 text-white p-2 px-3 m-2 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-teal-600 cursor-pointer'>
                            Login
                        </button>

                    </div>
                </div>

                {error && (
                    <div className='bg-red-400 text-black font-semibold font-mono w-fit text-sm ml-8 p-1 px-3 rounded-sm mt-2 '>{error}</div>
                )}

            </form>
            <Image
                src="/login.jpg"
                width={1000}
                height={760}
                className="hidden md:block rounded-lg md:w-1/4"
                alt="dashboard project showing desktop version"
            />
            <Image
                src="/problem.jpg"
                width={500}
                height={400}
                className="rounded-lg block md:hidden shadow-md"
                alt="dashboard project showing Mobile version"
            />
        </div>
    );
}
