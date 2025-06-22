import { NextResponse } from "next/server"

// This would fetch real Al Jazeera RSS data
export async function GET() {
  try {
    // In a real implementation, you would fetch from Al Jazeera's RSS feed
    // const response = await fetch('https://www.aljazeera.com/xml/rss/all.xml')
    // const xmlData = await response.text()
    // Parse XML and convert to JSON

    // For now, returning sample data that represents current news topics
    const newsData = {
      featured: {
        title: "Gaza ceasefire talks continue as humanitarian crisis deepens",
        excerpt:
          "International mediators work around the clock as civilian casualties mount and aid deliveries remain limited in the besieged territory.",
        category: "MIDDLE EAST",
        readTime: "6 min",
        views: "15.2K",
        image: "/placeholder.svg?height=400&width=800",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        source: "Al Jazeera",
      },
      articles: [
        {
          title: "Ukraine conflict enters third year with no clear resolution",
          excerpt:
            "Military analysts assess the ongoing situation as both sides prepare for potential spring operations.",
          category: "EUROPE",
          readTime: "4 min",
          views: "8.7K",
          image: "/placeholder.svg?height=200&width=300",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          source: "Al Jazeera",
        },
        {
          title: "Climate summit delegates reach breakthrough agreement",
          excerpt: "Historic deal on fossil fuel transition marks significant progress in global climate negotiations.",
          category: "ENVIRONMENT",
          readTime: "5 min",
          views: "12.3K",
          image: "/placeholder.svg?height=200&width=300",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          source: "Al Jazeera",
        },
      ],
    }

    return NextResponse.json(newsData)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
