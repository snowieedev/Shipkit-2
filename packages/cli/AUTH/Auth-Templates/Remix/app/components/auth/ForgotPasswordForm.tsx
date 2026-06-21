import { Form, useNavigation } from "react-router";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TextureButton } from "../ui/texture-button";

export function ForgotPasswordForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="space-y-6">
      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" />
        </div>
        <TextureButton type="submit" className="w-full" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending reset link..." : "Send Reset Link"}
        </TextureButton>
      </Form>
    </div>
  );
}
