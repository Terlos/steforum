"use client";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { SideBar } from "@/components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { Comments } from "@/components/Comments";
import { getSession } from "@/auth";
import { Navbar } from "@/components/Navbar";
import { Post } from "@/app/utils/types/types";
import { Profile } from "@/components/Profile";

export default function CommentsPage({
  params,
}: {
  params: { categoryId: string; parentId: string };
}) {
  const { categoryId, parentId } = params;
  const [blurState, setBlurState] = useState(false);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("all");
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
    setBlurState(!blurState);
  }

  function showForm() {
    setShow(!show);
  }

  function showProfileHandler() {
    showProfile ? setShowProfile(false) : setShowProfile(true);
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
        commentId={parentId}
        categoryRoomId={categoryId}
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
        <Comments
          blurState={blurState}
          id={parentId}
          url={url}
          isLoggedIn={isLoggedIn}
          showProfile={showProfile}
        />
      </div>
    </main>
  );
}
