"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { 
  Box, 
  LayoutDashboard, 
  Settings2, 
  Blocks,
  LogOut,
  LifeBuoy
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Clients",
      url: "/dashboard/projects",
      icon: Box,
    },
    {
      title: "Features",
      url: "/dashboard/features",
      icon: Blocks,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <Sidebar collapsible="icon" variant="floating" className="border-none shadow-xl" {...props}>
      <SidebarHeader className="pt-4 pb-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />} className="hover:bg-transparent">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm transition-transform hover:scale-105">
                <Blocks className="size-5" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none ml-2">
                <span className="font-semibold tracking-tight text-xl font-mono lowercase">ShipKit</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-6">
        <div className="flex flex-col rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-2 border border-zinc-100 dark:border-zinc-800/50">
          <SidebarMenu>
            {data.navMain.map((item) => {
              const isActive = pathname === item.url || (item.url !== '/dashboard' && pathname.startsWith(item.url + '/'))
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    render={<Link href={item.url} />}
                    isActive={isActive}
                    tooltip={item.title}
                    onClick={() => setOpenMobile(false)}
                    className={`rounded-xl py-5 transition-all duration-200 ${
                      isActive 
                        ? 'bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200' 
                        : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100'
                    }`}
                  >
                    <item.icon className="size-5" />
                    <span className="font-medium text-[15px]">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </div>

        <div className="mt-4 flex flex-col rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-2 border border-zinc-100 dark:border-zinc-800/50">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                render={<Link href="/help" />}
                tooltip="Help & Support"
                onClick={() => setOpenMobile(false)}
                className="rounded-xl py-5 text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100 transition-all duration-200"
              >
                <LifeBuoy className="size-5" />
                <span className="font-medium text-[15px]">Help & Support</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 pb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              tooltip="Logout"
              className="rounded-full py-6 bg-[#7c2626] text-white hover:bg-[#8b2b2b] hover:text-white shadow-[0_4px_14px_0_rgba(124,38,38,0.39)] transition-all duration-200 group flex items-center justify-center"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-white text-[#7c2626] group-hover:scale-110 transition-transform">
                <LogOut className="size-4 -ml-0.5" />
              </div>
              <span className="font-medium text-base ml-2">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
