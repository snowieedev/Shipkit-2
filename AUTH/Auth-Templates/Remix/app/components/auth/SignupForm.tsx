import { Form, useNavigation } from "react-router";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TextureButton } from "../ui/texture-button";
import { SocialAuthSection } from "./SocialAuthSection";
import { Separator } from "../ui/separator";
import { useState } from "react";

export function SignupForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [password, setPassword] = useState("");

  // Simple password strength check for template
  const getStrength = (pw: string) => {
    if (pw.length === 0) return 0;
    if (pw.length < 8) return 1;
    if (pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw)) return 3;
    return 2;
  };
  const strength = getStrength(password);

  return (
    <div className="space-y-6">
      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" type="text" placeholder="John Doe" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            required 
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && (
            <div className="flex gap-1 mt-2">
              <div className={`h-1.5 w-full rounded-full ${strength >= 1 ? 'bg-red-500' : 'bg-muted'}`} />
              <div className={`h-1.5 w-full rounded-full ${strength >= 2 ? 'bg-yellow-500' : 'bg-muted'}`} />
              <div className={`h-1.5 w-full rounded-full ${strength >= 3 ? 'bg-green-500' : 'bg-muted'}`} />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" name="confirmPassword" type="password" required autoComplete="new-password" />
        </div>
        <TextureButton type="submit" className="w-full" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
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
