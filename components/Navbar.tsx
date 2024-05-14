import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="w-full px-8 lg:px-16 xl:px-24 py-4 flex justify-between items-center border-b">
      <div className="w-[50px] h-[50px]">
        <Image
          src={"/logo_simple.png"}
          width={75}
          height={60}
          alt="logo"
          className="object-contain"
        />
      </div>

      <Button
        variant={"outline"}
        asChild
        className="hover:bg-primary hover:text-white transition-colors"
      >
        <Link href={"https://judelininelus.com"} target="_blank">About me</Link>
      </Button>
    </nav>
  );
}
