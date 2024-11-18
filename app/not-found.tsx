import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center flex-col h-screen space-y-10 justify-center">
      <div className=" relative ">
        <iframe
          src="https://giphy.com/embed/VwoJkTfZAUBSU"
          width="332"
          height="480"
          allowFullScreen
        ></iframe>

        <div className=" absolute top-0 left-0 w-full h-full"></div>
      </div>

      <Link className="hover:underline" href="/dashboard/vote/participant">Back to your home</Link>
    </div>
  );
}
