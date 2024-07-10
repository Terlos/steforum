"use client";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { CategoryCard } from "@/components/category/CategoryCard";
import { getSession, login, logout } from "@/auth";
import { SideBar } from "@/components/sidebar/Sidebar";
import { RegisterForm } from "@/components/RegisterForm";
import { LoginForm } from "@/components/LoginForm";
import { PostCard } from "@/components/PostCard";

export function Favourite() {
  const [blurState, setBluerState] = useState(false);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState("post");
  const [url, setUrl] = useState("post");
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [showCom, setShowCom] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();
  }, []);

  function blur() {
    blurState ? setBluerState(false) : setBluerState(true);
  }

  function showForm() {
    show ? setShow(false) : setShow(true);
  }

  function changeHandler(item: string) {
    setChange(item);
  }

  return (
    <main className="flex flex-col items-start justify-start w-full bg-darkWhite relative">
      <Navbar
        blur={blur}
        blurState={blurState}
        changeHandler={changeHandler}
        setUrl={setUrl}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <LoginForm
        blur={blur}
        blurState={blurState}
        showForm={showForm}
        show={show}
      />
      <RegisterForm
        blur={blur}
        blurState={blurState}
        showForm={showForm}
        show={show}
      />
      <div className={`grid grid-cols-256-1fr-256 w-full`}>
        <SideBar blurState={blurState} />
        <PostCard
          url={url}
          blurState={blurState}
          setShowCom={setShowCom}
          showCom={showCom}
        />
      </div>
    </main>
  );
}
