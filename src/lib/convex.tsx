"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/tanstack-react-start";
import { ReactNode } from "react";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

// Lazy-init: avoid throwing during SSR prerender when env vars aren't set
let convex: ConvexReactClient | null = null;

function getClient(): ConvexReactClient {
  if (!convex) {
    if (!convexUrl) {
      throw new Error("Missing VITE_CONVEX_URL");
    }
    convex = new ConvexReactClient(convexUrl);
  }
  return convex;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // During SSR/prerender, skip providers entirely — the shell HTML
  // doesn't need Convex or Clerk. Client-side hydration sets them up.
  if (typeof window === "undefined") {
    return <>{children}</>;
  }

  return (
    <ConvexProviderWithClerk client={getClient()} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export { getClient as convex };
