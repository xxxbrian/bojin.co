import Image from 'next/image'
import { Mail } from 'react-feather'

const Main = () => {
  return (
    <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6 justify-center">
      <div className="mb-2">
        <Image
          className="rounded-full transition-all duration-100"
          src="/images/avatar.png"
          alt="avatar"
          width={130}
          height={130}
          priority
        />
      </div>
      <h1 className="font-bold mb-8 text-2xl heading-text">Bojin Li (Brian)</h1>

      <p className="mb-8">
        Developer / Student /{' '}
        <a href="https://bgp.he.net/AS198734" target="_blank" rel="noopener noreferrer">
          <abbr title="⚡ BOJIN NETWORK NOC" className="!no-underline">
            #AS198734
          </abbr>
        </a>{' '}
        Operator
      </p>

      <p>
      Currently studying in {' '}
        <a href="https://unsw.edu.au" target="_blank" rel="noopener noreferrer">
        University of New South Wales
        </a>{' '}
        for a degree in Computer Science. 
      </p>
      <p>
      Appearance complex. Loyal fans of apple products. 
        Prefer someone with a decent aesthetic. 
        Enjoy the thing with the pretty designed.
      </p>

      <p className="mt-8">
      A flunky of strongly-typed languages.
      </p>
      <p className="flex space-x-2 items-center">
        <Mail size={15} />
        <a href="mailto:bojinxx@gmail.com">bojinxx#gmail.com</a>
      </p>
    </main>
  )
}

export default Main
