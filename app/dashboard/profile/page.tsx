import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { ProfileSettings } from "@/components/dashboard/profile-settings"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 bg-muted/20">
        <ProfileSettings />
      </main>
    </div>
  )
}
