import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const page =async () => {

  return (
    <main className="flex min-h-screen flex-col p-3 bg-white">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-teal-700 p-4 md:h-20">
        <h1 className='text-white'>WorkWise</h1>
      </div>

      <div className="mt-4 flex grow flex-col gap-4 m-10 md:flex-row">

        <div className="flex flex-col justify-center gap-4 rounded-lg bg-gray-100 px-4 py-2 md:w-2/5   md:px-10 md:mx-auto">
          <p className=" text-lg text-gray-800 md:text-3xl md:leading-normal" >
            <strong>Welcome to WorkWise</strong><br /> Empower your team <br /> Where every ticket becomes a stepping stone to smoother operations.
          </p>

          <Link
            href="/login"
            className="flex items-center gap-3 w-fit rounded-lg bg-teal-700 px-3 py-3  font-medium  text-white transition-colors hover:bg-teal-800 md:text-base"
          >
            <span>Log in</span>
            <FontAwesomeIcon icon={faArrowRight} className="icon w-5 h-5" />
          </Link>

        </div>

        <div className="flex items-center justify-center md:w-3/5 md:px-28 md:py-12">

          <Image
            src="/problemticket.jpg"
            width={1000}
            height={760}
            className=" hidden md:block rounded-lg"
            alt="dashboard project showing desktop version"
          />
          <Image
            src="/problem.jpg"
            width={560}
            height={620}
            className="rounded-lg block md:hidden"
            alt="dashboard project showing Mobile version"
          />
        </div>

      </div>
    </main>
  )
}

export default page
