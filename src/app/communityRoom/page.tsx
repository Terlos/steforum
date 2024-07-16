"use client";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { CommunityRoom } from "@/components/category/CommunityRoom";
import { getSession, login, logout } from "@/auth";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { SideBar } from "@/components/sidebar/Sidebar";
import { Post, Author } from "@/app/utils/types/types";
import { Profile } from "@/components/Profile";

interface Category {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  like: number;
  author: Author;
  posts: Post[];
  imageUrl: string;
}

export default function Communities() {
  const [blurState, setBluerState] = useState(false);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState("post");
  const [url, setUrl] = useState("category");
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [showCom, setShowCom] = useState(true);
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

  function showProfileHandler() {
    showProfile ? setShowProfile(false) : setShowProfile(true);
  }

  const [dbValue, setDbValue] = useState<Array<Post | Category>>([]);
  const [activeSearch, setActiveSearch] = useState<Category[] | Post[]>([]);
  const [clear, setClear] = useState("");

  return (
    <main className="flex flex-col items-start justify-start w-full bg-darkWhite relative">
      <Navbar
        blur={blur}
        blurState={blurState}
        setUrl={setUrl}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showForm={showForm}
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
        <CommunityRoom
          blurState={blurState}
          url={url}
          setDbValue={setDbValue}
          activeSearch={activeSearch}
          clear={clear}
          showProfile={showProfile}
        />
      </div>
    </main>
  );
}
