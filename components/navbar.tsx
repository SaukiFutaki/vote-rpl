import { signIn, signOut } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAvatarProps } from "@/types";
import { BadgePlus, List, LogOut, Settings, User, Vote } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar({
  userName,
  email,
  userRole,
}: IAvatarProps) {
  return (
    <div className="flex flex-col ">
      <header className="px-4 lg:px-6 h-20 flex items-center ">
        <Link className="flex items-center justify-center" href="/dashboard">
          <Vote className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">VoteNow</span>
        </Link>
        {!email ? (
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            {signInButton()}
          </nav> // Show login button if email is null
        ) : (
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    {/* <AvatarImage src={urlAvatar} alt={userName} /> */}
                    <AvatarFallback>
                      {
                        userName
                          ?.split(" ") // Memecah string berdasarkan spasi
                          .map((word) => word.charAt(0).toUpperCase()) // Ambil huruf pertama dari setiap kata dan ubah jadi kapital
                          .join("") // Gabungkan kembali menjadi satu string
                      }
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                {userRole === "ADMIN" && (
                  <>
                    <Link href="/dashboard/admin/vote/create">
                      <DropdownMenuItem>
                        <BadgePlus className="mr-2 h-4 w-4" />
                        Create Poll
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/admin/vote/list">
                      <DropdownMenuItem>
                        <List className="mr-2 h-4 w-4" />
                        List Poll
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem>{signOutButton()}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        )}
      </header>
    </div>
  );
}

function signInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit">sign in</Button>
    </form>
  );
}

function signOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">
        {" "}
        <LogOut className="mr-2 h-4 w-4" />
        sign out
      </Button>
    </form>
  );
}
