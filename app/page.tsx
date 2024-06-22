import Button from "@/components/Button";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import { ArrowRight, FileText, Search, TrendingUp } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import Footer from "@/components/Footer";

export default function Home() {
  const words = ["Pulse", "Rhythm", "Spirit", "Beat"];

  return (
    <main className="relative flex flex-col items-center pt-20">
      <div
        style={{ clipPath: "polygon(0 70%, 100% 0, 100% 30%, 0 100%)" }}
        className="absolute top-[10%] h-[700px] w-full bg-gradient-to-tr from-purple via-pink to-yellow"
      />

      <Navbar />

      <section className="relative h-[calc(100svh-140px)] overflow-clip">
        <div className="flex h-full w-full justify-center gap-32 pt-20">
          <div className="flex w-min flex-col justify-self-end">
            <div className="text-6xl font-bold">
              Unlock Croatia's{" "}
              <FlipWords words={words} className="text-white" />
            </div>
            <p className="mt-6 text-xl text-gray">
              Dive into the Trends Shaping Our Nation!
            </p>
            <div className="mt-12 flex items-center gap-6">
              <Button text="Explore" className="bg-purple" />
              <button className="flex gap-2 text-nowrap bg-transparent font-semibold text-purple">
                How it works <ArrowRight />
              </button>
            </div>
          </div>

          <div className="flex h-fit flex-col items-center justify-center rounded-3xl border-[2px] border-white/10 bg-container px-9 py-16 backdrop-blur-lg">
            <Input
              text="Search for trends..."
              className="bg-gradient-to-r from-gray/20 via-gray/20 to-purple/30"
            />

            <img src="home_chart.svg" className="mt-12 w-[400px]" />
          </div>
        </div>
      </section>

      <section className="relative mt-40 flex flex-col items-center overflow-clip">
        <div className="relative px-6">
          <p className="text-center text-4xl font-bold">How it works</p>

          <div className="mt-16 flex gap-16">
            <div className="card_number relative flex w-[250px] flex-col items-center rounded-3xl border-[2px] border-white/10 bg-container p-9">
              <FileText className="mt-6 size-16 stroke-[0.5] text-purple" />
              <p className="mt-10 text-nowrap text-2xl font-semibold">
                Data Scraping
              </p>
              <p className="mt-6 text-center text-gray">
                We gather Croatia&apos;s online data quickly and accurately
              </p>
            </div>

            <div className="card_number relative flex w-[250px] flex-col items-center rounded-3xl border-[2px] border-white/10 bg-container p-9 before:content-['2']">
              <Search className="mt-6 size-16 stroke-[0.5] text-purple" />
              <p className="mt-10 text-nowrap text-2xl font-semibold">
                Searching
              </p>
              <p className="mt-6 text-center text-gray">
                Enter your prompt, and we&apos;ll find the data in our database.
              </p>
            </div>

            <div className="card_number relative flex w-[250px] flex-col items-center rounded-3xl border-[2px] border-white/10 bg-container p-9 before:content-['3']">
              <TrendingUp className="mt-6 size-16 stroke-[0.5] text-purple" />
              <p className="mt-10 text-nowrap text-2xl font-semibold">
                Visualizing
              </p>
              <p className="mt-6 text-center text-gray">
                See clear charts showing Croatia&apos;s digital data trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-40 flex h-svh w-full flex-col items-center justify-center overflow-clip bg-gradient-to-br from-purple via-pink to-yellow text-black">
        <svg
          className="absolute top-0 h-[150px] w-full rotate-180 fill-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,100 100,0 100,100" />
        </svg>

        <div className="w-full max-w-screen-md px-6">
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

        <svg
          className="absolute bottom-0 h-[150px] w-full translate-y-[-1] rotate-180 fill-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,100 100,0 100,100" />
        </svg>
      </section>

      <section className="relative mt-40 w-full overflow-clip pb-1">
        <p className="text-center text-4xl font-bold">Contact</p>

        <div className="mt-16 flex items-center justify-center gap-16 px-64">
          <p className="max-w-sm text-4xl font-extralight text-white/50">
            Got questions? Ideas? Or just want to chat?{" "}
            <span className="font-bold text-white">We&apos;re all ears.</span>
          </p>

          <div className="flex w-[350px] flex-col gap-4">
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

      <Footer />
    </main>
  );
}
