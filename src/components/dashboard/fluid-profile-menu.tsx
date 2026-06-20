"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LogOut, Settings, User as UserIcon, LifeBuoy, Users, CreditCard } from "lucide-react"

// A custom popover using Framer Motion for fluid, premium animations
export function FluidProfileMenu({ user }: { user: any }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()
  const supabase = createClient()
  const menuRef = React.useRef<HTMLDivElement>(null)

  // Close when clicking outside
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [isOpen])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const userEmail = user?.email || "user@example.com"
  const userName = user?.user_metadata?.full_name || "ShipKit User"

  return (
    <div className="relative z-50" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-500 p-[2px] transition-transform hover:scale-105 active:scale-95 focus:outline-none"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-background overflow-hidden border-2 border-background">
          <Avatar className="h-full w-full">
            <AvatarImage src="" alt="User Avatar" />
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 mt-2 w-[280px] rounded-2xl bg-white dark:bg-zinc-950 p-2 shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-3 pb-4">
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-100 truncate">
                  {userName}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {userEmail}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-500 p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background overflow-hidden border-2 border-background">
                  <Avatar className="h-full w-full">
                    <AvatarImage src="" alt="User Avatar" />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800/50 my-1" />

            {/* Menu Items */}
            <div className="flex flex-col gap-1 p-1">
              <MenuItem icon={UserIcon} label="Profile" onClick={() => { setIsOpen(false); router.push('/dashboard/settings') }} />
              <MenuItem 
                icon={Users} 
                label="Community" 
                badge={<div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium text-zinc-600 dark:text-zinc-300">+</div>} 
                onClick={() => setIsOpen(false)} 
              />
              <MenuItem 
                icon={CreditCard} 
                label="Subscription" 
                badge={<Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-none px-1.5 py-0 text-[10px] uppercase font-bold tracking-wider">PRO</Badge>} 
                onClick={() => setIsOpen(false)} 
              />
              <MenuItem icon={Settings} label="Settings" onClick={() => { setIsOpen(false); router.push('/dashboard/settings') }} />
            </div>

            <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800/50 my-1" />

            <div className="flex flex-col gap-1 p-1">
              <MenuItem icon={LifeBuoy} label="Help center" onClick={() => setIsOpen(false)} />
              <MenuItem icon={LogOut} label="Sign out" onClick={handleLogout} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MenuItem({ 
  icon: Icon, 
  label, 
  onClick, 
  badge 
}: { 
  icon: React.ElementType, 
  label: string, 
  onClick: () => void,
  badge?: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/60 focus:bg-zinc-100 dark:focus:bg-zinc-800/60 focus:outline-none"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <span>{label}</span>
      </div>
      {badge && <div>{badge}</div>}
    </button>
  )
}
