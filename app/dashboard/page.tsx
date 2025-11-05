import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export default async function DashboardPage() {
  // TODO: Check authentication with Supabase
  // const supabase = await getSupabaseServerClient()
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) {
  //   redirect('/login')
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 bg-muted/20">
        <DashboardOverview />
      </main>
    </div>
  )
}
