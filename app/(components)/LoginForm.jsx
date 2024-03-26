"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
    const router = useRouter();
    const [register, setRegister] = useState(true);

    // State to track form submission
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    const handleForm = (e) => {
        e.preventDefault();
        router.refresh();
        setRegister(!register);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!loginData.username || !loginData.password) {
            setError("All field are necessary.");
            return;
        }

        // Only submit form if not already submitting

        if (!register && !submitting) {

            setSubmitting(true); // Set submitting state to true
            const res = await fetch('/api/Signup', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ loginData }),
            })

            if (!res.ok) {
                setError("User Already exists. or Failed to Register");
                // throw new Error("Failed to Register")
            } else {
                setError("Proceed to Login page.")
                router.refresh();
            }

            // Reset form fields by updating state with empty values
            setloginData({ username: "", password: "" });
            setRegister(register);

        }
        else {
            if (register && !submitting) {
                try {
                    const res = await signIn("credentials", {
                        username: loginData.username,
                        password: loginData.password,
                        redirect: false,
                    })
                    if (res.error) {
                        setError("Invalid Credentials");
                        return;
                    }
                    router.replace("dashboard");
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setloginData((preState) => ({
            ...preState,
            [name]: value,
        }));
    }

    const dummyData = {
        username: "",
        password: ""
    }

    const [loginData, setloginData] = useState(dummyData);

    return (
        <div className='min-h-screen flex flex-col md:flex-row gap-4 items-center justify-center'>
            <form className="flex flex-col justify-center border-t-8 border-teal-600 bg-gray-200 font-sans sm:flex sm:flex-wrap sm:justify-center sm:mx-24 rounded-lg shadow-2xl p-8 md:w-1/3 " method='post' onSubmit={handleSubmit}>
                <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
                    <h1 className={` mb-3 text-2xl text-center`}>{register ? "Please Log in to continue." : "Please Sign up to continue."}</h1>
                    <div className="w-full">
                        <div>
                            <label className="mb-3 mt-5 block text-xl font-medium " htmlFor="email">Email</label>
                            <div className="relative">
                                <input className="peer block w-full rounded-md border border-gray-200 py-[8px] pl-10 outline-2 placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    name="username"
                                    placeholder="Enter your email address"
                                    onChange={handleChange}
                                    value={loginData.username}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="mb-3 mt-5 block text-xl font-medium  " htmlFor="password">Password</label>
                            <div className="relative">
                                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                    value={loginData.password}
                                    minLength={5}
                                    maxLength={8} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end mt-2  space-x-4">
                        <button onClick={handleForm} className='mb-1 text-sm '>{register ? "Don't have a account? Sign up !" : "Already Registered? Login now !"}</button>
                        <input type='submit' className='bg-teal-600 text-white p-2 px-3 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-teal-600 cursor-pointer' value={register ? "Login" : "Sign Up"} disabled={submitting} />
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

