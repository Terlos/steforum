import Link from "next/link";
import Image from "next/image";
import userPic from "/public/userPic.svg";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { logout } from "@/auth";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Navbar {
  blur: () => void;
  blurState: Boolean;
  setUrl: (item: string) => void;
  isLoggedIn: Boolean;
  setIsLoggedIn: (item: Boolean) => void;
  categoryRoomId?: string;
  commentId?: string;
  showForm?: () => void;
  dbValue: any;
  setActiveSearch: (item: any) => void;
  setClear: (item: string) => void;
  clear: string;
  showProfileHandler?: () => void;
  showProfile?: Boolean;
}

export function Navbar({
  blur,
  blurState,
  setUrl,
  isLoggedIn,
  setIsLoggedIn,
  categoryRoomId,
  commentId,
  showForm,
  dbValue,
  setActiveSearch,
  setClear,
  clear,
  showProfile,
  showProfileHandler,
}: Navbar) {
  const [btnName, setBtnName] = useState<String>("Newest");
  const [showMenu, setShowMenu] = useState(false);
  const [showProf, setShowProf] = useState(false);
  const pathname = usePathname();
  return (
    <div
      className={` ${showProfile ? "blur" : ""} ${
        pathname.startsWith("/favourite")
          ? "h-[149.33px] items-start"
          : "items-center"
      } flex sticky top-0 flex-row justify-center w-full z-10 bg-darkWhite pb-6 ${
        blurState ? "blur" : ""
      } `}
    >
      <div className="flex w-11/12 items-start justify-between pt-7">
        <div>
          <Link href={"/"} className="font-semibold text-2xl text-gray">
            SteBlogs
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          {!pathname.endsWith("/addComment") &&
            !pathname.endsWith("/addCommunities") &&
            !pathname.startsWith("/favourite") &&
            !pathname.endsWith("/addCommunityRoomPost") && (
              <SearchBar
                dbValue={dbValue}
                setActiveSearch={setActiveSearch}
                setClear={setClear}
                clear={clear}
              />
            )}

          <div className="flex flex-row justify-between items-center w-full max-w-[26rem] pt-6">
            <div className="flex flex-row justify-center items-center gap-2">
              {pathname === "/" && (
                <>
                  <div>
                    <h1 className="hover:cursor-pointer font-semibold text-gray py-1 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg">
                      Post
                    </h1>
                  </div>
                  <Link href={"/communityRoom"}>
                    <h1 className="hover:cursor-pointer font-semibold text-gray py-1 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg">
                      Communities
                    </h1>
                  </Link>
                </>
              )}
              {pathname === "/communityRoom" && (
                <>
                  <Link href={"/"}>
                    <h1 className="hover:cursor-pointer font-semibold text-gray py-1 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg">
                      Post
                    </h1>
                  </Link>
                  {pathname === "/communityRoom" && isLoggedIn == true ? (
                    <Link href={"/communityRoom/addCommunities"}>
                      <h1 className="hover:cursor-pointer font-semibold text-gray py-1 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg">
                        Add community
                      </h1>
                    </Link>
                  ) : (
                    pathname === "/communityRoom" && (
                      <>
                        <h1
                          onClick={() => {
                            blur();
                            toast(
                              "You have to be logged in to create community"
                            );
                          }}
                          className="hover:cursor-pointer font-semibold text-gray py-1 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg"
                        >
                          Add community
                        </h1>
                      </>
                    )
                  )}
                </>
              )}

              {pathname.startsWith("/communityRoomPosts") &&
              !pathname.endsWith("/addCommunityRoomPost") &&
              isLoggedIn == true ? (
                <Link
                  href={`/communityRoomPosts/${categoryRoomId}/addCommunityRoomPost`}
                >
                  <h1 className="hover:cursor-pointer font-semibold text-gray py-1 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg">
                    Add post
                  </h1>
                </Link>
              ) : (
                pathname.startsWith("/communityRoomPosts") &&
                !pathname.endsWith("/addCommunityRoomPost") && (
                  <>
                    <h1
                      onClick={() => {
                        blur();
                        toast("You have to be logged in to create post");
                      }}
                      className="hover:cursor-pointer font-semibold text-gray py-1 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg"
                    >
                      Add post
                    </h1>
                  </>
                )
              )}

              {pathname.startsWith("/comments") &&
              !pathname.endsWith("/addComment") &&
              isLoggedIn == true ? (
                <Link
                  href={`/comments/${categoryRoomId}/${commentId}/addComment`}
                >
                  <h1 className="hover:cursor-pointer font-semibold text-gray py-1 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg">
                    Add comment
                  </h1>
                </Link>
              ) : (
                pathname.startsWith("/comments") &&
                !pathname.endsWith("/addComment") && (
                  <>
                    <h1
                      onClick={() => {
                        blur();
                        toast("You have to be logged in to create comment");
                      }}
                      className="hover:cursor-pointer font-semibold text-gray py-1 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg"
                    >
                      Add comment
                    </h1>
                  </>
                )
              )}
            </div>
            {pathname.endsWith("/addCommunities") ||
            pathname.endsWith("/comments/") ||
            pathname.startsWith("/favourite") ||
            pathname.endsWith("/addComment") ||
            pathname.endsWith("/addCommunityRoomPost") ? (
              <></>
            ) : (
              <div className="flex flex-row justify-between items-center relative w-[10rem]">
                <h2 className="font-semibold text-gray px-1">Sort by:</h2>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="rounded-lg border-none font-semibold text-gray hover:bg-light-gray px-3 py-1"
                >
                  {btnName}
                </button>
                {showMenu && (
                  <div className="absolute flex flex-col gap-2 justify-center items-start top-9 left-[5rem] bg-white rounded-lg">
                    {BTNDATA.filter((item) => item.name !== btnName).map(
                      (item) => (
                        <h2
                          key={item.id}
                          onClick={() => {
                            setUrl(item.change);
                            setBtnName(item.name);
                            setShowMenu(false);
                          }}
                          className="flex flex-row justify-center items-center font-semibold text-gray cursor-pointer px-3 py-2 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg"
                        >
                          {item.name}
                        </h2>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-3 relative">
          {isLoggedIn ? (
            <>
              <Image
                onClick={() => setShowProf(!showProf)}
                src={userPic}
                alt="user"
              ></Image>
              <div
                className={`${
                  showProf ? "" : "hidden"
                } absolute flex flex-col gap-2 justify-center items-start top-8 bg-white rounded-lg`}
              >
                <a
                  onClick={() => {
                    if (showProfileHandler) {
                      showProfileHandler();
                    }
                  }}
                  className=" flex justify-center items-center flex-nowrap font-semibold text-gray cursor-pointer py-2 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg w-24"
                >
                  Profile
                </a>
                <a
                  onClick={() => {
                    toast("You have been logged out");
                    logout(), setIsLoggedIn(!isLoggedIn);
                  }}
                  className=" flex justify-center items-center flex-nowrap font-semibold text-gray cursor-pointer py-2 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg w-24"
                >
                  Hop out
                </a>
              </div>
            </>
          ) : (
            <>
              <Image
                onClick={() => setShowProf(!showProf)}
                src={userPic}
                alt="user"
              ></Image>
              <div
                className={`${
                  showProf ? "" : "hidden"
                } flex-nowrap absolute flex flex-col gap-2 justify-center items-start top-8 bg-white rounded-lg`}
              >
                <a
                  onClick={() => blur()}
                  className=" flex justify-center items-center flex-nowrap font-semibold text-gray cursor-pointer py-2 px-3 hover:bg-light-gray first:rounded-t-lg last:rounded-b-lg w-20"
                >
                  Hop in
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const BTNDATA = [
  {
    id: 1,
    name: "Newest",
    change: "newest",
  },
  {
    id: 2,
    name: "Latest",
    change: "latest",
  },
];
