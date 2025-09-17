import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { GoogleSignInButton } from "@/components/google-signin-button";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <Logo className="mb-4 justify-center" />
          <CardTitle className="text-2xl">Welcome to Suvidha</CardTitle>
          <CardDescription>
            Sign in with your Google account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSignInButton />
        </CardContent>
      </Card>
    </div>
  );
}
