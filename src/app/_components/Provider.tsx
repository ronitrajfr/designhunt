"use client";

import { SessionProvider } from "next-auth/react";

import React from "react";

const Providers = ({ children, session }: any) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
