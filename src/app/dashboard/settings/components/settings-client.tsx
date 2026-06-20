"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfile, updatePassword } from "../actions"

export function SettingsClient({ user }: { user: any }) {
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoadingProfile(true)
    const formData = new FormData(e.currentTarget)
    const result = await updateProfile(formData)
    setIsLoadingProfile(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Profile updated successfully")
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoadingPassword(true)
    const formData = new FormData(e.currentTarget)
    const result = await updatePassword(formData)
    setIsLoadingPassword(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Password updated successfully")
      ;(e.target as HTMLFormElement).reset()
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">User ID</Label>
              <Input id="id" value={user?.id || ''} readOnly disabled className="bg-muted text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ''} readOnly disabled className="bg-muted text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Your email address is managed by your authentication provider.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" defaultValue={user?.user_metadata?.full_name || ''} />
            </div>
            <Button type="submit" disabled={isLoadingProfile}>
              {isLoadingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your security settings and password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" name="password" type="password" required minLength={6} />
            </div>
            <Button variant="outline" type="submit" disabled={isLoadingPassword}>
              {isLoadingPassword ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
