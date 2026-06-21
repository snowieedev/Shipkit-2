import { Form, useNavigation } from "react-router";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TextureButton } from "../ui/texture-button";

interface VerifyEmailFormProps {
  email?: string;
  isVerifyingLink?: boolean;
}

export function VerifyEmailForm({ email, isVerifyingLink }: VerifyEmailFormProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (isVerifyingLink) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Verifying your email address...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground text-center">
        We sent a verification code to <span className="font-medium text-foreground">{email || "your email"}</span>.
      </div>
      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input id="code" name="code" type="text" placeholder="123456" required autoComplete="one-time-code" className="text-center text-lg tracking-widest" />
        </div>
        <TextureButton type="submit" className="w-full" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </TextureButton>
      </Form>
      <div className="text-center text-sm">
        <Form method="post" action="/verify-email?action=resend">
          <button type="submit" className="text-primary hover:underline" disabled={isSubmitting}>
            Resend Code
          </button>
        </Form>
      </div>
    </div>
  );
}
