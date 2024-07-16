"use client";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { SideBar } from "@/components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { CommunityRoomPosts } from "@/components/category/CommunityRoomPosts";
import { getSession } from "@/auth";
import { Navbar } from "@/components/Navbar";
import { Category, Post } from "@/app/utils/types/types";
export default function CategoryRoom({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;
  const [blurState, setBlurState] = useState(false);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("all");
  const [category, setCategory] = useState<Category[]>([]);
  const [showCom, setShowCom] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

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
        categoryRoomId={categoryId}
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
        <CommunityRoomPosts
          category={category}
          url={url}
          blurState={blurState}
          id={categoryId}
          setCategory={setCategory}
          setShowCom={setShowCom}
          showCom={showCom}
          isLoggedIn={isLoggedIn}
          blur={blur}
          setDbValue={setDbValue}
          activeSearch={activeSearch}
          clear={clear}
        />
      </div>
    </main>
  );
}
