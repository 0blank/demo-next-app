import Head from 'next/head'
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {!session && <>
          Not signed in <br />
          <Link href="/auth/login">
            <a>go to login page</a>
          </Link>
        </>}
        {session && <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>}
      </main>
    </div>
  )
}
