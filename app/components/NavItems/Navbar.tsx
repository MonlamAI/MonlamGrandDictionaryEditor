"use client";
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getuserrole } from "@/app/actions/GetActions";
import { RxExit } from "@/app/utils/Icon";

const Navbar = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    data: userRole,
    isLoading: isRoleLoading,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: () => getuserrole(user?.email),
    enabled: !!user?.email,
  });

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  if (isUserLoading || isRoleLoading) {
    return (
      <div className="flex items-center justify-end p-4 gap-4">
        <div className="animate-pulse flex space-x-4">
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching user role:", error);
  }

  return (
    <div className="flex items-center justify-end p-4 gap-4 relative">
      {user ? (
        <div className="flex items-center gap-3" ref={dropdownRef}>
          <div className="flex items-center">
            <img
              src={user.picture}
              alt={user.name || "User profile"}
              className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
              onClick={toggleDropdown}
            />
            <div
              className="ml-2 flex flex-col items-center justify-start cursor-pointer"
              onClick={toggleDropdown}
            >
              <p>{user.name}</p>
              <p
                className={`text-xs rounded-full px-2 py-1 ${
                  userRole === "user"
                    ? "text-success-600 bg-green-200 border-success-500"
                    : "text-purple-600 bg-purple-200 border-purple-500"
                } border-2 font-medium`}
              >
                {userRole === "user" ? "Contributor" : "Editor"}
              </p>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-20 right-2 bg-secondary-50 text-secondary-400 shadow-sm rounded-sm border border-secondary-200 w-40 z-10">
              <Link
                href="/api/auth/logout"
                className="flex items-center justify-between px-4 py-2 text-sm text-secondary-600 hover:bg-secondary-100"
              >
                Logout <RxExit />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/api/auth/login"
          className="mr-4 border py-2 px-4 hover:shadow-sm rounded-md text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
