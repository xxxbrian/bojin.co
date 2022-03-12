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
          width={120}
          height={120}
          priority
        />
      </div>
      <h1 className="font-bold mb-8 text-2xl heading-text">Bojin Li (Brian)</h1>

      <p className="mb-8">
        Developer / Designer /{' '}
        <a href="https://unsw.edu.au" target="_blank" rel="noopener noreferrer">
          <abbr title="🔥 UNSWer" className="!no-underline">
            #UNSW
          </abbr>
        </a>{' '}
        Student
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
      Loving python, doing Java, learning typescript.
      </p>
      <p className="flex space-x-2 items-center">
        <Mail size={15} />
        <a href="mailto:bojin.li@foxmail.com">bojin.li#foxmail.com</a>
      </p>
    </main>
  )
}

export default Main
