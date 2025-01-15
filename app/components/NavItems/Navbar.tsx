"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const Navbar = () => {
  const { isLoading, user } = useUser();
  if (isLoading) {
    return (
      <div className="flex items-center justify-end p-4 gap-4">
        <div className="animate-pulse flex space-x-4">
          <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-end p-4 gap-4">
      <div className="flex items-center">
        {user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <img
                src={user.picture}
                alt={user.name || "User profile"}
                className=" h-12 w-12 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="ml-2  flex flex-col items-center justify-start">
                <p>{user.name}</p>
                <p className="text-xs rounded-full px-2 py-1 text-success-600 bg-green-200 border-2 border-success-500 font-medium">
                  Annotator
                </p>
              </div>
            </div>

            <Link
              href="/api/auth/logout"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              logout
            </Link>
          </div>
        )}
        {!user && (
          <Link
            href="/api/auth/login"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
