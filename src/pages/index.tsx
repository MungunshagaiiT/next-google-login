import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex h-[100vh] justify-center items-center flex-col">
        <div className="p-2">
          <p>
            {" "}
            <strong> Signed in as: </strong> {session?.user?.email}{" "}
          </p>
        </div>
        <div className="p-2">
          <p>
            {" "}
            <strong>Name: </strong> {session?.user?.name}
          </p>
        </div>
        <button className="bg-green text-gray-50" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex h-[100vh] justify-center items-center flex-col">
      <div>
        <strong>Status:</strong> Not signed in{" "}
      </div>
      <button className="bg-green text-gray-50" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
