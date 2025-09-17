"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth();

  return (
    <Button onClick={signInWithGoogle} className="w-full">
      <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-72.2 72.2C322 104 286.6 88 248 88c-88.3 0-160 71.7-160 160s71.7 160 160 160c101.1 0 127.3-84.4 130.3-125.2H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path>
      </svg>
      Sign in with Google
    </Button>
  );
}
