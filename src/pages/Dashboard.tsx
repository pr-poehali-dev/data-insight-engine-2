import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { ContentPlanPage } from "@/components/dashboard/pages/ContentPlanPage"
import { PostsPage } from "@/components/dashboard/pages/PostsPage"
import { AIGeneratorPage } from "@/components/dashboard/pages/AIGeneratorPage"
import { RSSPage } from "@/components/dashboard/pages/RSSPage"
import { AdExchangePage } from "@/components/dashboard/pages/AdExchangePage"
import { AnalyticsPage } from "@/components/dashboard/pages/AnalyticsPage"
import { ChannelsPage } from "@/components/dashboard/pages/ChannelsPage"
import { InstructionsPage } from "@/components/dashboard/pages/InstructionsPage"
import { TeamPage } from "@/components/dashboard/pages/TeamPage"
import { ChatGPTPage } from "@/components/dashboard/pages/ChatGPTPage"
import { PaymentPage } from "@/components/dashboard/pages/PaymentPage"
import { SettingsPage } from "@/components/dashboard/pages/SettingsPage"

export type DashboardSection =
  | "content-plan"
  | "posts"
  | "ai-generator"
  | "rss"
  | "ad-exchange"
  | "analytics"
  | "channels"
  | "instructions"
  | "team"
  | "chatgpt"
  | "payment"
  | "settings"

const pageMap: Record<DashboardSection, React.ReactNode> = {
  "content-plan": <ContentPlanPage />,
  posts: <PostsPage />,
  "ai-generator": <AIGeneratorPage />,
  rss: <RSSPage />,
  "ad-exchange": <AdExchangePage />,
  analytics: <AnalyticsPage />,
  channels: <ChannelsPage />,
  instructions: <InstructionsPage />,
  team: <TeamPage />,
  chatgpt: <ChatGPTPage />,
  payment: <PaymentPage />,
  settings: <SettingsPage />,
}

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>("content-plan")

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {pageMap[activeSection]}
    </DashboardLayout>
  )
}

export default Dashboard
