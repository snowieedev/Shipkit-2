import { Form, useNavigation } from "react-router";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TextureButton } from "../ui/texture-button";
import { SocialAuthSection } from "./SocialAuthSection";
import { Separator } from "../ui/separator";

export function LoginForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="space-y-6">
      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
              Forgot password?
            </a>
          </div>
          <Input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        <TextureButton type="submit" className="w-full" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </TextureButton>
      </Form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <SocialAuthSection />
    </div>
  );
}
