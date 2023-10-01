'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CustomButton } from ".";

const Navbar = () => {

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const elem = document.getElementById("footer");
    if (elem) {
      window.scrollTo({ top: elem.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <header className="w-full z-10 absolute">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href={"/"} className="flex justify-center items-center">
          <Image
            src={"/logo.svg"}
            className="object-contain"
            alt="car hub logo"
            width={118}
            height={18}
          />
        </Link>
        <CustomButton
          title="Contact Us"
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[130px] "
          handleClick={handleScroll}
        />
      </nav>
    </header>
  );
};

export default Navbar;
