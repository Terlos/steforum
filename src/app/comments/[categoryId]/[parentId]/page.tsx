"use client";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { SideBar } from "@/components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { Comments } from "@/components/Comments";
import { getSession } from "@/auth";
import CreatePost from "@/components/create/CreatePost";
import { Navbar } from "@/components/Navbar";
import CreateComment from "@/components/create/CreateComment";

export default function CommentsPage({
  params,
}: {
  params: { categoryId: string; parentId: string };
}) {
  const { categoryId, parentId } = params;
  const [blurState, setBlurState] = useState(false);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("all");
  const [category, setCategory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [change, setChange] = useState("comment");

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
        commentId={parentId}
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
        <Comments
          blurState={blurState}
          id={parentId}
          setCategory={setCategory}
          url={url}
        />
      </div>
    </main>
  );
}
