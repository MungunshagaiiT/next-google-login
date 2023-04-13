# next/auth ашиглан Google login-оор нэвтрэх

## Google cloud  дээр хийгдэх үйлдлүүд: 
1. https://cloud.google.com ороод console руу ороод шинэ project үүсгэх
2. search хэсгээс Google+ API сонгоох Enable API button дээр дарах
3. API&Services -> Enabled APIs&services -> Oauth Content screen - шаардлагатай мэдээллийг бөглөнө./project-oo deploy hiisen linkee
4. Oauth Content screen step 2 дээр Scope сонгох  
* Scopes -> ADD OR REMOVE SCOPES -> google -ээр нэвтэрсэн тохиолдолд юу авмаар байгаа тэрийгээ сонгох - email, name
5. Credentials - > CREATE CREDENTIALS -> OAuth client ID ->сонголт дээр дарна. Үүний дараа Client id болон Client secret -ээ хуулж авна.

## Installation:
```shell
 npx create-next-app next-google-login
 ```
 ```shell
 npm install next-auth
```

## Code-ийн хэсгүүд:

pages/api/auth/[...nextAuth].ts

```tsx
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});

```


pages/login/index.tsx
```tsx
import React from "react";

const index = () => {
  const handleClick = () => {};
  return (
    <div className="align-center text-center">
      <button onClick={handleClick} className="bg-blue ">
        Google login
      </button>
    </div>
  );
};

export default index;
```

pages/_app.tsx

```tsx
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Component from ".";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```


pages/index.tsx

```tsx
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
```









