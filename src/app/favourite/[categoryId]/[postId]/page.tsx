"use client";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { getSession } from "@/auth";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { SideBar } from "@/components/sidebar/Sidebar";
import { PostCard } from "@/components/PostCard";
import { Post } from "@/app/utils/types/types";

export default function Favourite({
  params,
}: {
  params: { categoryId: string; postId: string };
}) {
  const { categoryId, postId } = params;
  const [blurState, setBluerState] = useState(false);
  const [show, setShow] = useState(false);
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
        <SideBar blurState={blurState} isLoggedIn={isLoggedIn} />
        <PostCard
          url={url}
          blurState={blurState}
          setShowCom={setShowCom}
          showCom={showCom}
          isLoggedIn={isLoggedIn}
          blur={blur}
          categoryId={categoryId}
          postId={postId}
          setDbValue={setDbValue}
          activeSearch={activeSearch}
          clear={clear}
        />
      </div>
    </main>
  );
}
