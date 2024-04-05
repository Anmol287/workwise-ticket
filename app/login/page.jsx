import LoginForm from '../(components)/LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: "Login",
  description: "Login page for allowing only authorized people, created by Anmol Kansal",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  
  return (
    <main>
    <LoginForm />
    </main>
  );
}
export default Page;

