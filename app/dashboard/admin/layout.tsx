import { auth } from "@/auth";

import { Space_Grotesk } from "next/font/google";
import { redirect } from "next/navigation";
import React from "react";
const sg = Space_Grotesk({ subsets: ["latin"] });

export default async function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  if (user?.role !== "ADMIN") {
    redirect("/dashboard/vote/participant");
  }
  return (
    <div className={`${sg.className} bg-white`}>
      <div>
      {children}
      </div>
     
    </div>
  );
}
