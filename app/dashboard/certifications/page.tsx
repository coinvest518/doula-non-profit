import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MyCertifications } from "@/components/dashboard/my-certifications"

export default function CertificationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 bg-muted/20">
        <MyCertifications />
      </main>
    </div>
  )
}
