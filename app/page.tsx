import Button from "@/components/Button";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import { FileText, Search, TrendingUp } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";
import ButtonSecondary from "@/components/ButtonSecondary";

export default function Home() {
  const words = ["Pulse", "Rhythm", "Spirit", "Beat"];

  return (
    <main
      id="home"
      className="relative flex flex-col items-center pt-5 md:pt-10 lg:pt-20"
    >
      <div className="absolute top-[275px] hidden h-[500px] w-full bg-gradient-to-tr from-purple via-pink to-yellow clip-rectangle md:block lg:top-[300px] lg:h-[700px]" />

      <Navbar />

      <section className="relative h-fit overflow-hidden">
        <div className="flex h-full w-full flex-col justify-center gap-9 px-6 pt-14 md:flex-row md:gap-16 md:px-16 md:pt-16 lg:gap-32 lg:pt-20">
          <div className="flex w-min flex-col justify-self-end">
            <div className="text-4xl font-bold md:text-5xl lg:text-6xl">
              Unlock Croatia&apos;s{" "}
              <FlipWords
                words={words}
                className="hidden text-white lg:inline-block"
              />
              <span className="inline-block lg:hidden">Pulse</span>
            </div>
            <p className="mt-2 text-base text-gray md:mt-4 md:text-lg lg:mt-6 lg:text-xl">
              Dive into the Trends <br /> Shaping Our Nation!
            </p>
            <div className="mt-8 flex items-center gap-6 md:mt-10 lg:mt-12">
              <Link href="/explore">
                <Button text="Explore" className="bg-purple" />
              </Link>
              <ButtonSecondary text="How it works" href="#howItWorks" />
            </div>
          </div>

          <div className="mt-6 flex h-fit flex-col items-center justify-center rounded-3xl border-2 border-white/10 bg-container px-9 py-16 backdrop-blur-lg md:mt-0">
            <Input
              text="Search for trends..."
              className="bg-gradient-to-r from-gray/20 via-gray/20 to-purple/30"
            />

            <img
              src="home_chart.svg"
              className="pointer-events-none mt-12 w-72 select-none md:w-96"
            />
          </div>
        </div>
      </section>

      <section
        id="howItWorks"
        className="relative flex flex-col items-center overflow-hidden"
      >
        <div className="mt-24 px-6 md:mt-32 lg:mt-40">
          <p className="text-center text-2xl font-bold md:text-3xl lg:text-4xl">
            How it works
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-x-16 gap-y-9 px-6 md:mt-12 lg:mt-16">
            <div className="card_number relative flex w-[250px] flex-col items-center rounded-3xl border-[2px] border-white/10 bg-container px-6 py-9 md:px-9">
              <FileText className="mt-6 size-14 stroke-[0.5] text-purple md:size-16" />
              <p className="mt-10 text-nowrap text-xl font-semibold md:text-2xl">
                Data Scraping
              </p>
              <p className="mt-6 max-w-44 text-center text-xs text-gray md:text-base">
                We gather Croatia&apos;s online data quickly and accurately
              </p>
            </div>

            <div className="card_number relative flex w-[250px] flex-col items-center rounded-3xl border-[2px] border-white/10 bg-container px-6 py-9 before:content-['2'] md:p-9 md:px-9">
              <Search className="mt-6 size-14 stroke-[0.5] text-purple md:size-16" />
              <p className="mt-10 text-nowrap text-xl font-semibold md:text-2xl">
                Searching
              </p>
              <p className="mt-6 max-w-44 text-center text-xs text-gray md:text-base">
                Enter your prompt, and we&apos;ll find the data in our database.
              </p>
            </div>

            <div className="card_number relative flex w-[250px] flex-col items-center rounded-3xl border-[2px] border-white/10 bg-container px-6 py-9 before:content-['3'] md:p-9 md:px-9">
              <TrendingUp className="mt-6 size-14 stroke-[0.5] text-purple md:size-16" />
              <p className="mt-10 text-nowrap text-xl font-semibold md:text-2xl">
                Visualizing
              </p>
              <p className="mt-6 max-w-44 text-center text-xs text-gray md:text-base">
                See clear charts showing Croatia&apos;s digital data trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative mt-24 flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple via-pink to-yellow py-24 text-black clip-about md:mt-32 md:py-32 md:clip-about-md lg:mt-40 lg:py-36 lg:clip-about-lg"
      >
        <div className="flex w-full max-w-screen-md justify-center px-6 sm:justify-start sm:px-16">
          <div className="relative flex max-w-96 flex-col">
            <p className="text-3xl font-bold md:text-4xl lg:text-5xl">
              About <br /> Croatia Trends
            </p>
            <p className="mt-8 text-base font-light md:text-lg lg:text-xl">
              We&apos;re a group of fresh minds, passionate about{" "}
              <span className="font-bold">
                unlocking Croatia&apos;s digital story. <br></br>
                <br></br>
              </span>{" "}
              We provide you with clear,{" "}
              <span className="font-bold">insightful graphs,</span> just like
              Google Trends, but tailored{" "}
              <span className="font-bold">exclusively for Croatia.</span>{" "}
              <br></br>
              <br></br> Let&apos;s explore together and make data-driven
              decisions for a brighter tomorrow!
            </p>

            <img
              src="croatia.svg"
              className="absolute -bottom-80 left-[500px] max-w-5xl"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="relative w-full overflow-hidden pb-1">
        <p className="mt-24 text-center text-2xl font-bold md:mt-32 md:text-3xl  lg:mt-40 lg:text-4xl">
          Contact
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-16 px-6 md:mt-12 md:flex-row lg:mt-16">
          <p className="max-w-sm text-2xl font-extralight text-white/50 md:text-3xl lg:text-4xl">
            Got questions? Ideas? <br /> Or just want to chat? <br />
            <span className="font-bold text-white">We&apos;re all ears.</span>
          </p>

          <div className="flex w-full max-w-[350px] flex-col gap-4">
            <Input
              hasIcon={false}
              text="Name"
              className="w-full bg-gradient-to-r from-[#2a2b2d]/85 to-[#36333e]"
            />
            <Input
              hasIcon={false}
              text="Email"
              className="w-full bg-gradient-to-r from-[#2a2b2d]/85 to-[#36333e]"
            />
            <textarea
              placeholder="Message"
              style={{ resize: "none" }}
              className="h-[125px] w-full rounded-3xl bg-transparent bg-gradient-to-r from-[#2a2b2d]/85
      to-[#36333e] px-6 py-2.5 text-white ring-4 ring-[#1f2023] transition-all focus-within:ring-2 focus-within:ring-purple focus:outline-none"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
