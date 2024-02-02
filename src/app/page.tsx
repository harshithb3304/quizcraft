"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const eyeIcon = "/EyeFilledIcon.svg";
const eyeSlashIcon = "/EyeSlashFilledIcon.svg";
const Page = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <main>
      <div>
        <div className="flex items-center justify-center text-center text-4xl md:text-6xl lg:text-8xl xl:text-11xl mb-40 mt-30 ">
          Welcome to the QuizCraft
        </div>
        <div>
          <div className="flex items-center justify-center p-4 text-base md:text-lg lg:text-xl xl:text-2xl">
            Login
          </div>
          <Input
            isRequired
            type="email"
            label="Username/Email"
            placeholder="Enter your Username or Email"
            className="flex items-center justify-center w-3/4 lg:w-1/4 p-2 md:p-3 lg:p-4 xl:p-5 mx-auto  border-purple-500 "
            defaultValue=""
            variant="bordered"
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                <div className="flex items-center justify-center mb-3">
                  <Image
                    src={isVisible ? eyeSlashIcon : eyeIcon}
                    alt="Eye Icon"
                    width={24}
                    height={24}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                </div>
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="flex items-center justify-center w-3/4 lg:w-1/4 p-2 md:p-3 lg:p-4 xl:p-5 mx-auto"
          />
          <Link
            isExternal
            href="https://github.com/nextui-org/nextui"
            className=" flex items-center justify-center"
            color="secondary"
          >
            Forgot Password?
          </Link>
          <div className="flex flex-wrap items-center justify-center mt-4 gap-10">
            <Link href="/quizpage">
              <Button color="secondary">Login</Button>
            </Link>
            <p>Or</p>
            <Button color="secondary">Sign Up</Button>
          </div>
        </div>
      </div>
    </main>
  );
};



export default Page;
