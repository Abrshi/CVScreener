import { Bug } from "lucide-react";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="border-b mb-5 py-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <Bug />
          </Link>

          <div className="flex gap-5">
            <a
              href="/api/auth/signin"
              className="text-zinc-500 hover:text-zinc-800"
            >
              Login
            </a>
            <a
              href="/api/auth/signin"
              className="text-zinc-500 hover:text-zinc-800"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
