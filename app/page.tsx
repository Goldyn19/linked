'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/links');
    }
  };
  return (
    <div className="flex flex-col items-center w-full mx-auto p-4 justify-center h-screen">
      <div className="flex items-center mb-5">
        <Image
          src="/images/logo.svg"
          alt="logo"
          className="mt-2 h-auto w-auto"
          height={34}
          width={34}
        />
        <h1 className="text-heading-m pl-2 pt-2">devlinks</h1>
      </div>
      <div className="card bg-white mt-5 px-5 md:w-[476px] w-full rounded-lg shadow-md pt-5 pb-10">
        <h1 className="text-heading-m pt-5">Login</h1>
        <h2 className="text-body-m mt-2 text-light-black">
          Add your details below to get back into the app
        </h2>

        <form className="w-full" onSubmit={handleSubmit}>
          <label htmlFor="email-address-icon" className="block text-body-s mb-[-10px]">
            Email Address
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 0H1C0.867392 0 0.740215 0.0526785 0.646447 0.146447C0.552678 0.240215 0.5 0.367392 0.5 0.5V9C0.5 9.26522 0.605357 9.51957 0.792893 9.70711C0.98043 9.89464 1.23478 10 1.5 10H12.5C12.7652 10 13.0196 9.89464 13.2071 9.70711C13.3946 9.51957 13.5 9.26522 13.5 9V0.5C13.5 0.367392 13.4473 0.240215 13.3536 0.146447C13.2598 0.0526785 13.1326 0 13 0ZM12.5 9H1.5V1.63688L6.66187 6.36875C6.75412 6.45343 6.87478 6.50041 7 6.50041C7.12522 6.50041 7.24588 6.45343 7.33813 6.36875L12.5 1.63688V9Z"
                  fill="#737373"
                />
              </svg>
            </div>
            <input
              type="email"
              id="email-address-icon"
              className="rounded-lg block w-full pl-10 border border-dark-grey text-body-m focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
              placeholder="e.g. alex@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email Address"
            />
          </div>
          <label htmlFor="password" className="block text-body-s mt-5 mb-[-10px]">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 5H9V3.5C9 2.70435 8.68393 1.94129 8.12132 1.37868C7.55871 0.81607 6.79565 0.5 6 0.5C5.20435 0.5 4.44129 0.81607 3.87868 1.37868C3.31607 1.94129 3 2.70435 3 3.5V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5ZM6.5 9.91438V11.5C6.5 11.6326 6.44732 11.7598 6.35355 11.8536C6.25979 11.9473 6.13261 12 6 12C5.86739 12 5.74021 11.9473 5.64645 11.8536C5.55268 11.7598 5.5 11.6326 5.5 11.5V9.91438C5.16639 9.79643 4.88522 9.56434 4.70618 9.25914C4.52715 8.95393 4.46177 8.59526 4.5216 8.24651C4.58144 7.89776 4.76264 7.58139 5.03317 7.35332C5.3037 7.12525 5.64616 7.00016 6 7.00016C6.35384 7.00016 6.6963 7.12525 6.96683 7.35332C7.23736 7.58139 7.41856 7.89776 7.4784 8.24651C7.53823 8.59526 7.47285 8.95393 7.29382 9.25914C7.11478 9.56434 6.83361 9.79643 6.5 9.91438ZM8 5H4V3.5C4 2.96957 4.21071 2.46086 4.58579 2.08579C4.96086 1.71071 5.46957 1.5 6 1.5C6.53043 1.5 7.03914 1.71071 7.41421 2.08579C7.78929 2.46086 8 2.96957 8 3.5V5Z"
                  fill="#737373"
                />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              className="rounded-lg block w-full pl-10 border border-dark-grey text-body-m focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-custom-blue text-white text-heading-s w-full rounded-lg mt-5"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <h1 className="flex mx-auto items-center justify-center mt-5 text-body-m">
          <span className=''>Don&apos;t have an account? </span>
          <Link href="/signup" className="text-custom-blue pl-1">Create account</Link>
        </h1>
      </div>
    </div>
  );
}
