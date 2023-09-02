"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import axios from "axios";
import { useTheme } from "next-themes";

const Nav = ({ setmode }) => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  const [user, setuser] = useState({});
  const [user1, setuser1] = useState({});
  const [mode1, setmode1] = useState();
  const [mode2, setmode2] = useState(true);
  const { theme, setTheme } = useTheme();
  const handleToggle = async (e) => {
    setmode1(e.target.checked);
    mode1 ? setTheme("light") : setTheme("dark");
    // console.log(mode1)
    // setmode(mode1);
    // localStorage.setItem("mode", mode1);
    // const res1 = await fetch("./api/mode", {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     mode1: mode1,
    //     id: session?.user.id,
    //   }),
    // });
    // const res = await fetch("./api/mode", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     id: session?.user.id,
    //   }),
    // });
    // const data = await res.json();
    // console.log(data);
    // setuser(data);
  };
  const style2 = {
    //  background: "#040D12"
  };
  const style1 = {
    //  background: "transparent"
  };
  return (
    <div className="nav" style={mode1 ? style2 : style1}>
      <Link href="/" className="logo">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className=""
        />
        <p
          className="logo-text"
          style={mode1 ? { color: "#ff6600" } : { color: "#ff6600" }}
        >
          Prompto
        </p>
      </Link>
      {/* <div className="dark-mode-label1">
        <input type="checkbox" id="darkmode-toggle" />
        <label for="darkmode-toggle" />
      </div> */}

      {/* Desktop Navigation  */}
      {session?.user ? (
        <>
          <div className="desc-nav">
            <div className="button">
              <Link
                href="/create-prompt"
                className="button1"
                style={mode1 ? { color: "white", background: "#4e4f4f" } : {}}
              >
                Create Post
              </Link>

              <button
                type="button"
                onClick={signOut}
                className="button2"
                style={mode1 ? { color: "white", background: "#4e4f4f" } : {}}
              >
                Sign Out
              </button>
            </div>
            <div className="dark-mode-label">
              <input
                type="checkbox"
                id="darkmode-toggle"
                checked={mode1}
                onChange={(e) => {
                  handleToggle(e);
                }}
              />
              <label for="darkmode-toggle" />
            </div>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={40}
                height={40}
                className="profile-img"
                alt="profile"
              />
            </Link>
          </div>
          {/* Mobile Navigation */}
          <div
            className="mob-nav"
            style={mode1 ? {} : { paddingBottom: "5vh" }}
          >
            <Image
              src={session?.user.image}
              width={40}
              height={40}
              className="profile-img"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div
                className="dropdown"
                style={mode2 ? { color: "white", background: "#4e4f4f" } : {}}
              >
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="button3"
                >
                  Sign Out
                </button>
                <button
                  className={mode2 ? "dark-mode-button" : "white-mode-button"}
                  onClick={() => {
                    setmode2(!mode2);
                    // setmode(mode2);
                    mode2 ? setTheme("light") : setTheme("dark");
                  }}
                >
                  {mode2 ? (
                    <>
                      <i class="fa-solid fa-moon"></i>
                    </>
                  ) : (
                    <>
                      <i class="fa-solid fa-sun"></i>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="button4"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default Nav;
