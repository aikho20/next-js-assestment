"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/config/store";
import Search from "@/components/ui/search";
import { CustomChart } from "@/components/ui/custom-chart";
import Link from "next/link";
import { follow_us, footer } from "@/utils/data";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface HomepageLayoutProps {
  children: React.ReactNode;
}

export default function HomepageLayout({ children }: HomepageLayoutProps) {
  return (
    <div className="relative ">
      <div className="p-4 sticky top-0 shadow-sm  bg-white z-50">
        <div className="container flex flex-row space-x-5 items-center ">
          <p className="text-bold text-lg text-primary">
            D Supreme Development
          </p>
          <div className=" flex-row space-x-5 hidden md:flex">
            <Link href={"/"} className="text-sm text-gray-600">
              Home
            </Link>
            <Link href={"/"} className="text-sm text-gray-600">
              Statistics
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 min-h-[80vh] container">{children}</div>
      <div className="bg-primary">
        <div className="container flex flex-col md:flex-row justify-between py-10">
          <div className="p-5 space-y-4">
            <p className="text-semibold text-lg text-white">
              D Supreme Development
            </p>
            <div className="flex space-y-2 flex-col md:flex-row md:space-x-2">
              <Input placeholder="Email Address" />
              <Button variant={"outline"} className="max-w-[120px]">Subscribe</Button>
            </div>
          </div>
          <div className="p-5 flex flex-col items-start">
            <p className="text-white text-xl mb-2">About us</p>
            {footer.map((items, index) => (
              <p className="text-gray-400 text-sm my-1" key={index}>
                {items?.title}
              </p>
            ))}
          </div>

          <div className="p-5 flex flex-col items-start">
            <p className="text-white text-xl mb-2">Follow us</p>
            {follow_us.map((items, index) => (
              <p className="text-gray-400 text-sm my-1" key={index}>
                {items?.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
