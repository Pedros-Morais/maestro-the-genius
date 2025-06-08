"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center">
        <div className="h-10 w-10 border-4 border-[#f28500] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2 text-[#f28500]">Loading...</h1>
        <p className="text-gray-500">Please wait while we redirect you to your login page</p>
      </div>
    </div>
  );
}
