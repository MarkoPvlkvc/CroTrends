import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="sticky top-2 z-20 mx-auto grid h-fit w-fit grid-cols-[auto_1fr_auto] items-center gap-32 rounded-full bg-black/75 p-3 backdrop-blur-lg">
      <img src="CroTrends-cropped.svg" className="h-full py-1.5 pl-4" />
      <div className="flex justify-center gap-8 text-xl font-medium text-gray">
        <button className="text-white">Home</button>
        <button className="bg-transparent transition-colors hover:text-white">
          How it works
        </button>
        <button className="bg-transparent transition-colors hover:text-white">
          About
        </button>
        <button className="bg-transparent transition-colors hover:text-white">
          Contact
        </button>
      </div>
      <Button text="Explore" />
    </nav>
  );
};

export default Navbar;
