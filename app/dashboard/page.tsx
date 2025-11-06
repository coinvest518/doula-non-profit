import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 bg-muted/20">
        <DashboardOverview />
      </main>
    </div>
  )
}
