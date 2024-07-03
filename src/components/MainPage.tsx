"use client";
import { Navbar } from "@/components/Navbar";
import { PostCard } from "./PostCard";
import { SideBar } from "./sidebar/Sidebar";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useState, useEffect } from "react";
import { CategoryCard } from "@/components/category/CategoryCard";
import { getSession, login, logout } from "@/auth";
import CreatePost from "./create/CreatePost";
import CreateCategory from "./create/CreateCategory";

interface MainPage {}
export function MainPage() {
  const [blurState, setBluerState] = useState(false);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState("post");
  const [url, setUrl] = useState("post");
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [showCom, setShowCom] = useState(true);
  // Check if user is logged in on component mount
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
        {change === "post" ? (
          <PostCard
            url={url}
            blurState={blurState}
            setShowCom={setShowCom}
            showCom={showCom}
          />
        ) : change === "category" ? (
          <CategoryCard url={url} blurState={blurState} />
        ) : change === "createPost" ? (
          <CreatePost />
        ) : change === "createCategory" ? (
          <CreateCategory />
        ) : null}
      </div>
    </main>
  );
}
