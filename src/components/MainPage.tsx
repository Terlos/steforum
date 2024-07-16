"use client";
import { Navbar } from "@/components/Navbar";
import { PostCard } from "./PostCard";
import { SideBar } from "./sidebar/Sidebar";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useState, useEffect } from "react";
import { getSession } from "@/auth";
import { Post } from "@/app/utils/types/types";
import { Profile } from "@/components/Profile";

export function MainPage() {
  const [blurState, setBluerState] = useState(false);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("post");
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [showCom, setShowCom] = useState<Boolean>(true);
  const [showProfile, setShowProfile] = useState(false);

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

  function showProfileHandler() {
    showProfile ? setShowProfile(false) : setShowProfile(true);
  }

  function showForm() {
    show ? setShow(false) : setShow(true);
  }

  const [dbValue, setDbValue] = useState<Post[]>([]);
  const [activeSearch, setActiveSearch] = useState<Post[]>([]);
  const [clear, setClear] = useState("");
  return (
    <main className="flex flex-col items-start justify-start w-full bg-darkWhite relative">
      <Navbar
        blur={blur}
        blurState={blurState}
        setUrl={setUrl}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        dbValue={dbValue}
        setActiveSearch={setActiveSearch}
        setClear={setClear}
        clear={clear}
        showProfileHandler={showProfileHandler}
        showProfile={showProfile}
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
      <Profile
        showProfile={showProfile}
        showProfileHandler={showProfileHandler}
      />
      <div className={`grid grid-cols-256-1fr-256 w-full`}>
        <SideBar
          blurState={blurState}
          isLoggedIn={isLoggedIn}
          showProfile={showProfile}
        />
        <PostCard
          url={url}
          blurState={blurState}
          setShowCom={setShowCom}
          showCom={showCom}
          isLoggedIn={isLoggedIn}
          blur={blur}
          setDbValue={setDbValue}
          activeSearch={activeSearch}
          clear={clear}
          showProfile={showProfile}
        />
      </div>
    </main>
  );
}
