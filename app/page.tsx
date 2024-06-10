import Button from "@/components/Button";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import { ArrowRight, FileText, Search, TrendingUp } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import Footer from "@/components/Footer";

export default function Home() {
  const words = ["Pulse", "Rhythm", "Spirit", "Beat"];

  return (
    <main className="flex flex-col items-center pt-20">
      <div className="absolute top-[75%] -z-10 h-[200px] w-[2000px] rotate-[-25deg] bg-gradient-to-r from-purple via-pink to-yellow"></div>

      <Navbar />

      <section className="h-[calc(100svh-140px)] overflow-x-hidden">
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
              className="bg-gradient-to-r from-inputGray/20 via-inputGray/20 to-purple/30"
            />

            <img src="home_chart.svg" className="mt-12 w-[400px]" />
          </div>
        </div>
      </section>

      <section className="mt-40 flex flex-col items-center overflow-x-hidden">
        <div className="relative px-6">
          <p className="text-center text-4xl font-bold">How it works</p>

          <div className="mt-16 flex gap-16">
            <div className="card_number relative flex w-[250px] flex-col items-center rounded-3xl border-[2px] border-white/10 bg-container p-9">
              <FileText className="size-16 stroke-[0.5] text-purple" />
              <p className="mt-10 text-nowrap text-2xl font-semibold">
                Data Scraping
              </p>
              <p className="mt-6 text-center text-gray">
                We gather Croatia's online data quickly and accurately
              </p>
            </div>

            <div className="card_number relative flex w-[250px] flex-col items-center rounded-3xl border-[2px] border-white/10 bg-container p-9 before:content-['2']">
              <Search className="size-16 stroke-[0.5] text-purple" />
              <p className="mt-10 text-nowrap text-2xl font-semibold">
                Searching
              </p>
              <p className="mt-6 text-center text-gray">
                Enter your prompt, and we'll find the data in our database.
              </p>
            </div>

            <div className="card_number relative flex w-[250px] flex-col items-center rounded-3xl border-[2px] border-white/10 bg-container p-9 before:content-['3']">
              <TrendingUp className="size-16 stroke-[0.5] text-purple" />
              <p className="mt-10 text-nowrap text-2xl font-semibold">
                Visualizing
              </p>
              <p className="mt-6 text-center text-gray">
                See clear charts showing Croatia's digital data trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-40 flex h-svh flex-col justify-center overflow-hidden bg-gradient-to-br from-purple via-pink to-yellow text-black">
        <img src="croatia.svg" className="absolute right-0 top-0 w-[550px]" />

        <svg
          className="absolute top-0 h-[150px] w-full rotate-180 fill-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,100 100,0 100,100" />
        </svg>

        <div className="grid grid-cols-2 px-64">
          <div className="flex flex-col">
            <p className="text-5xl font-bold">About Croatia Trends</p>
            <p className="mt-8 text-xl font-light">
              We're a group of fresh minds, passionate about{" "}
              <span className="font-bold">
                unlocking Croatia's digital story. <br></br>
                <br></br>
              </span>{" "}
              We provide you with clear,{" "}
              <span className="font-bold">insightful graphs,</span> just like
              Google Trends, but tailored{" "}
              <span className="font-bold">exclusively for Croatia.</span>{" "}
              <br></br>
              <br></br> Let's explore together and make data-driven decisions
              for a brighter tomorrow!
            </p>
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

      <section className="relative mt-40 w-full">
        <p className="text-center text-4xl font-bold">Contact</p>

        <div className="mt-16 flex items-center justify-center gap-16 px-64">
          <p className="max-w-sm text-4xl font-extralight text-white/50">
            Got questions? Ideas? Or just want to chat?{" "}
            <span className="font-bold text-white">We're all ears.</span>
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
              className="h-[125px] w-full rounded-3xl bg-transparent bg-gradient-to-r from-[#2a2b2d]/85 to-[#36333e] px-6 py-2.5 text-white focus:outline-none"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
