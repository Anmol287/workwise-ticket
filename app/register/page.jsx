import React from 'react'
import RegisterForm from '../(components)/RegisterForm'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: "Register yourself",
  description: "Registering page for new people, created by Anmol Kansal",
};

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <main>
      <RegisterForm />
    </main>
  )
}

export default page
