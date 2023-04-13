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
