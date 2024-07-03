"use client";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { SideBar } from "@/components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { CategoryRoomPosts } from "@/components/category/CategoryRoomPosts";
import { getSession, login, logout } from "@/auth";
import CreatePost from "@/components/create/CreatePost";
import CreateCategory from "@/components/create/CreateCategory";
import { Navbar } from "@/components/Navbar";

export default function CategoryRoom({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;
  const [blurState, setBlurState] = useState(false);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("all");
  const [category, setCategory] = useState([]);
  const [showCom, setShowCom] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [change, setChange] = useState("comment");

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();
  }, []);

  function changeHandler(item: string) {
    setChange(item);
  }

  function blur() {
    setBlurState(!blurState);
  }

  function showForm() {
    setShow(!show);
  }

  return (
    <main className="flex flex-col items-start justify-start w-full bg-darkWhite relative">
      <Navbar
        blur={blur}
        blurState={blurState}
        setUrl={setUrl}
        category={category}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        changeHandler={changeHandler}
        categoryRoomId={categoryId}
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
        {change === "createPost" ? (
          <CreatePost categoryId={categoryId} />
        ) : change === "comment" ? (
          <CategoryRoomPosts
            category={category}
            url={url}
            blurState={blurState}
            id={categoryId}
            setCategory={setCategory}
            setShowCom={setShowCom}
            showCom={showCom}
          />
        ) : null}
      </div>
    </main>
  );
}
