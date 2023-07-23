"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="nav">
      <Link href="/" className="logo">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className=""
        />
        <p className="logo-text">Prompto</p>
      </Link>

      {/* Desktop Navigation  */}
      {session?.user ? (
        <>
          <div className="desc-nav">
            <div className="button">
            
              <Link href="/create-prompt" className="button1">
                Create Post
              </Link>

              <button type="button" onClick={signOut} className="button2">
                Sign Out
              </button>

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

          <div className="mob-nav">
            <Image
              src={session?.user.image}
              width={40}
              height={40}
              className="profile-img"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
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
