"use client";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { getSession } from "@/auth";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { SideBar } from "@/components/sidebar/Sidebar";
import CreateCommunity from "@/components/create/CreateCommunity";
import { Profile } from "@/components/Profile";

interface MainPage {}
export default function addCommunities() {
  const [blurState, setBluerState] = useState(false);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState("post");
  const [url, setUrl] = useState("category");
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
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

  function showForm() {
    show ? setShow(false) : setShow(true);
  }

  function changeHandler(item: string) {
    setChange(item);
  }

  function showProfileHandler() {
    showProfile ? setShowProfile(false) : setShowProfile(true);
  }

  const [dbValue, setDbValue] = useState<any>([]);
  const [activeSearch, setActiveSearch] = useState<any>([]);
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
        setActiveSearch={activeSearch}
        clear={clear}
        setClear={setClear}
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
        <CreateCommunity showProfile={showProfile} />
      </div>
    </main>
  );
}
