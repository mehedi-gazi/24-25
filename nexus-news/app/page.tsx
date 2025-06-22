"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Menu, ChevronRight, Clock, Eye, ExternalLink, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

// Full article content
const fullArticles = {
  "gaza-ceasefire": {
    title: "Gaza ceasefire talks continue as humanitarian crisis deepens",
    content: `
      <p>International mediators are working around the clock to broker a ceasefire agreement as the humanitarian situation in Gaza continues to deteriorate. The latest round of negotiations, taking place in Cairo, involves representatives from multiple regional powers and international organizations.</p>
      
      <p>According to sources close to the talks, significant obstacles remain regarding the terms of prisoner exchanges and the timeline for aid deliveries. The United Nations has warned that the current blockade is preventing critical medical supplies and food from reaching civilians.</p>
      
      <p>"We are at a critical juncture," said a senior diplomatic source who requested anonymity. "The international community is united in its call for an immediate cessation of hostilities, but the details of implementation remain contentious."</p>
      
      <p>Humanitarian organizations report that hospitals in the region are operating at critical capacity, with medical staff working under extremely difficult conditions. The International Red Cross has called for immediate access to provide emergency medical care.</p>
      
      <p>The talks are expected to continue through the weekend, with mediators expressing cautious optimism about reaching a framework agreement. However, previous negotiations have stalled over similar issues, highlighting the complexity of the situation.</p>
      
      <p>Regional leaders have emphasized the urgent need for a sustainable solution that addresses both immediate humanitarian concerns and longer-term stability in the region.</p>
    `,
    category: "MIDDLE EAST",
    readTime: "6 min",
    views: "15.2K",
    image: "/images/gaza-crisis.jpg",
    publishedAt: "2024-01-15T10:30:00Z",
    source: "Al Jazeera",
  },
  "ukraine-conflict": {
    title: "Ukraine conflict enters third year with no clear resolution",
    content: `
      <p>As the conflict in Ukraine approaches its third year, military analysts are assessing the current situation and potential developments for the coming months. Both sides appear to be preparing for renewed operations as winter conditions begin to ease.</p>
      
      <p>Recent intelligence reports suggest significant military buildup along key frontlines, with both Ukrainian and Russian forces reinforcing their positions. NATO officials have confirmed continued support for Ukraine's defense capabilities.</p>
      
      <p>"The situation remains fluid and complex," stated a senior military analyst. "We're seeing tactical adjustments on both sides as they adapt to changing conditions on the ground."</p>
      
      <p>International aid continues to flow to Ukraine, with the latest package including advanced defensive systems and humanitarian supplies. The European Union has pledged additional support for reconstruction efforts in liberated territories.</p>
      
      <p>Diplomatic efforts continue in parallel, though breakthrough agreements remain elusive. Several international forums are working to maintain dialogue channels despite the ongoing hostilities.</p>
      
      <p>The conflict has had far-reaching implications for global security architecture and international law, with experts calling for renewed focus on conflict prevention mechanisms.</p>
    `,
    category: "EUROPE",
    readTime: "4 min",
    views: "8.7K",
    image: "/images/ukraine-conflict.jpg",
    publishedAt: "2024-01-15T08:15:00Z",
    source: "Al Jazeera",
  },
  "climate-summit": {
    title: "Climate summit delegates reach breakthrough agreement",
    content: `
      <p>Delegates at the international climate summit have announced a historic breakthrough agreement on fossil fuel transition, marking what many consider the most significant progress in global climate negotiations in years.</p>
      
      <p>The agreement, reached after intensive negotiations extending through the night, establishes concrete timelines for reducing carbon emissions and provides a framework for supporting developing nations in their transition to renewable energy.</p>
      
      <p>"This represents a turning point in our collective response to the climate crisis," said the summit's lead negotiator. "For the first time, we have binding commitments that address both mitigation and adaptation needs."</p>
      
      <p>Key provisions include a commitment to triple renewable energy capacity by 2030 and establish a $100 billion fund to support climate adaptation projects in vulnerable regions. The agreement also includes mechanisms for monitoring and enforcement.</p>
      
      <p>Environmental groups have cautiously welcomed the agreement while emphasizing the need for rapid implementation. "The real test will be in the execution," noted a spokesperson for a major environmental organization.</p>
      
      <p>The agreement is expected to influence national climate policies and corporate sustainability strategies worldwide, with implementation beginning immediately.</p>
    `,
    category: "ENVIRONMENT",
    readTime: "5 min",
    views: "12.3K",
    image: "/images/climate-summit.jpg",
    publishedAt: "2024-01-14T16:45:00Z",
    source: "Al Jazeera",
  },
  "tech-regulation": {
    title: "Tech giants face new regulatory challenges in EU",
    content: `
      <p>The European Union has implemented its most comprehensive set of technology regulations to date, significantly impacting how major technology companies operate within the bloc. The new measures focus on data protection, market competition, and content moderation.</p>
      
      <p>Under the new framework, technology companies must comply with stricter data handling requirements and provide users with greater control over their personal information. Companies failing to meet these standards face substantial financial penalties.</p>
      
      <p>"This legislation represents a fundamental shift in how we approach technology governance," explained a senior EU official. "We're establishing clear rules that prioritize user rights and fair competition."</p>
      
      <p>The regulations also address concerns about market dominance, requiring large platforms to allow greater interoperability and provide users with more choice in services and applications.</p>
      
      <p>Technology companies have expressed mixed reactions, with some welcoming the clarity while others raise concerns about implementation costs and potential impacts on innovation.</p>
      
      <p>Legal experts predict that these regulations will influence technology policy development in other jurisdictions, potentially establishing new global standards for the industry.</p>
    `,
    category: "TECHNOLOGY",
    readTime: "3 min",
    views: "6.1K",
    image: "/images/tech-regulation.jpg",
    publishedAt: "2024-01-14T14:20:00Z",
    source: "Al Jazeera",
  },
  "south-china-sea": {
    title: "Diplomatic tensions rise in South China Sea",
    content: `
      <p>Regional tensions in the South China Sea have escalated following a series of military exercises and diplomatic exchanges between major powers. High-level discussions are underway to address territorial disputes and ensure maritime security.</p>
      
      <p>Recent naval activities in the region have prompted responses from multiple countries, with each asserting their rights under international maritime law. The situation has drawn attention from global security analysts.</p>
      
      <p>"The South China Sea remains a critical waterway for international trade," noted a maritime security expert. "Any disruption to navigation could have significant economic implications globally."</p>
      
      <p>Diplomatic channels remain active, with several countries calling for adherence to established international protocols and peaceful resolution of disputes. Regional forums are facilitating dialogue between stakeholders.</p>
      
      <p>The Association of Southeast Asian Nations (ASEAN) has reiterated its commitment to maintaining peace and stability in the region through multilateral cooperation and dialogue.</p>
      
      <p>International observers are closely monitoring developments, emphasizing the importance of de-escalation and diplomatic solutions to prevent further tensions.</p>
    `,
    category: "ASIA PACIFIC",
    readTime: "6 min",
    views: "11.2K",
    image: "/images/south-china-sea.jpg",
    publishedAt: "2024-01-13T15:45:00Z",
    source: "Al Jazeera",
  },
}

// Sample news data with working images
const sampleNewsData = {
  featured: {
    id: "gaza-ceasefire",
    title: "Gaza ceasefire talks continue as humanitarian crisis deepens",
    excerpt:
      "International mediators work around the clock as civilian casualties mount and aid deliveries remain limited in the besieged territory.",
    category: "MIDDLE EAST",
    readTime: "6 min",
    views: "15.2K",
    image: "/images/gaza-crisis.jpg",
    publishedAt: "2024-01-15T10:30:00Z",
    source: "Al Jazeera",
  },
  articles: [
    {
      id: "ukraine-conflict",
      title: "Ukraine conflict enters third year with no clear resolution",
      excerpt: "Military analysts assess the ongoing situation as both sides prepare for potential spring operations.",
      category: "EUROPE",
      readTime: "4 min",
      views: "8.7K",
      image: "/images/ukraine-conflict.jpg",
      publishedAt: "2024-01-15T08:15:00Z",
      source: "Al Jazeera",
    },
    {
      id: "climate-summit",
      title: "Climate summit delegates reach breakthrough agreement",
      excerpt: "Historic deal on fossil fuel transition marks significant progress in global climate negotiations.",
      category: "ENVIRONMENT",
      readTime: "5 min",
      views: "12.3K",
      image: "/images/climate-summit.jpg",
      publishedAt: "2024-01-14T16:45:00Z",
      source: "Al Jazeera",
    },
    {
      id: "tech-regulation",
      title: "Tech giants face new regulatory challenges in EU",
      excerpt: "European Union implements stricter data protection measures affecting major technology companies.",
      category: "TECHNOLOGY",
      readTime: "3 min",
      views: "6.1K",
      image: "/images/tech-regulation.jpg",
      publishedAt: "2024-01-14T14:20:00Z",
      source: "Al Jazeera",
    },
    {
      id: "economy-global",
      title: "Economic indicators show mixed signals globally",
      excerpt: "Financial markets react to latest employment data and inflation reports from major economies.",
      category: "ECONOMY",
      readTime: "4 min",
      views: "9.8K",
      image: "/images/economy-global.jpg",
      publishedAt: "2024-01-14T11:30:00Z",
      source: "Al Jazeera",
    },
    {
      id: "renewable-energy",
      title: "Breakthrough in renewable energy storage technology",
      excerpt: "Scientists develop new battery technology that could revolutionize clean energy adoption.",
      category: "SCIENCE",
      readTime: "5 min",
      views: "7.4K",
      image: "/images/renewable-energy.jpg",
      publishedAt: "2024-01-13T19:15:00Z",
      source: "Al Jazeera",
    },
    {
      id: "south-china-sea",
      title: "Diplomatic tensions rise in South China Sea",
      excerpt: "Regional powers engage in high-level discussions amid territorial disputes and military exercises.",
      category: "ASIA PACIFIC",
      readTime: "6 min",
      views: "11.2K",
      image: "/images/south-china-sea.jpg",
      publishedAt: "2024-01-13T15:45:00Z",
      source: "Al Jazeera",
    },
  ],
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

export default function TacticalNewsPage() {
  const { featured, articles } = sampleNewsData
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const openArticle = (articleId: string) => {
    setSelectedArticle(articleId)
  }

  const closeArticle = () => {
    setSelectedArticle(null)
  }

  const currentArticle = selectedArticle ? fullArticles[selectedArticle as keyof typeof fullArticles] : null

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Article Modal */}
      {selectedArticle && currentArticle && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-red-600 text-white">{currentArticle.category}</Badge>
                  <span className="text-sm text-gray-400">
                    {formatTimeAgo(currentArticle.publishedAt)} • {currentArticle.source}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={closeArticle} className="text-white hover:text-red-400">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="relative mb-8">
                <Image
                  src={currentArticle.image || "/placeholder.svg"}
                  alt={currentArticle.title}
                  width={800}
                  height={400}
                  className="w-full h-80 object-cover border border-red-900/30"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1">
                  {currentArticle.source}
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-6 leading-tight">{currentArticle.title}</h1>

              <div className="flex items-center space-x-6 text-sm text-gray-400 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentArticle.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{currentArticle.views}</span>
                </div>
              </div>

              <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              />

              <div className="mt-12 pt-8 border-t border-gray-800">
                <Button onClick={closeArticle} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                  Back to News Feed
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-red-900/30 bg-black/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white"></div>
                </div>
                <span className="text-xl font-bold tracking-wider">NEXUS</span>
                <div className="hidden md:block text-xs text-gray-400 ml-2">POWERED BY AL JAZEERA</div>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-sm font-medium hover:text-red-400 transition-colors tracking-wide">
                  MIDDLE EAST
                </a>
                <a href="#" className="text-sm font-medium hover:text-red-400 transition-colors tracking-wide">
                  WORLD
                </a>
                <a href="#" className="text-sm font-medium hover:text-red-400 transition-colors tracking-wide">
                  POLITICS
                </a>
                <a href="#" className="text-sm font-medium hover:text-red-400 transition-colors tracking-wide">
                  ECONOMY
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-xs text-gray-400">
                LIVE:{" "}
                {new Date().toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                GMT
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-red-400 hover:bg-red-900/20"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:text-red-400 hover:bg-red-900/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-red-900/30 bg-black/95">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <a href="#" className="block text-sm font-medium hover:text-red-400 transition-colors tracking-wide py-2">
                MIDDLE EAST
              </a>
              <a href="#" className="block text-sm font-medium hover:text-red-400 transition-colors tracking-wide py-2">
                WORLD
              </a>
              <a href="#" className="block text-sm font-medium hover:text-red-400 transition-colors tracking-wide py-2">
                POLITICS
              </a>
              <a href="#" className="block text-sm font-medium hover:text-red-400 transition-colors tracking-wide py-2">
                ECONOMY
              </a>
            </nav>
          </div>
        )}

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-red-900/30 bg-black/95">
            <div className="container mx-auto px-4 py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search intelligence reports..."
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Breaking News Banner */}
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <Badge className="bg-white text-red-600 text-xs font-bold">BREAKING</Badge>
            <div className="text-sm font-medium tracking-wide">
              Live updates: International diplomatic efforts intensify amid ongoing regional tensions
            </div>
            <ExternalLink className="w-4 h-4 ml-auto" />
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
          <div className="pl-8">
            <div className="flex items-center space-x-4 mb-4">
              <Badge className="bg-red-600 text-white hover:bg-red-700 tracking-wider">{featured.category}</Badge>
              <span className="text-xs text-gray-400 tracking-wide">
                {formatTimeAgo(featured.publishedAt)} • {featured.source}
              </span>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">{featured.title}</h1>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-400 mb-8">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{featured.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{featured.views}</span>
                  </div>
                </div>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-sm font-medium tracking-wide"
                  onClick={() => openArticle(featured.id)}
                >
                  READ FULL REPORT
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="relative cursor-pointer" onClick={() => openArticle(featured.id)}>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent z-10"></div>
                <Image
                  src={featured.image || "/placeholder.svg"}
                  alt="Featured article"
                  width={800}
                  height={400}
                  className="w-full h-80 object-cover border border-red-900/30 hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1">AL JAZEERA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-8 h-px bg-red-600 mr-4"></div>
            <h2 className="text-2xl font-bold tracking-wider">LATEST INTELLIGENCE</h2>
          </div>
          <div className="text-sm text-gray-400">Updated {formatTimeAgo(articles[0].publishedAt)}</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 hover:border-red-900/50 transition-all duration-300 group cursor-pointer"
              onClick={() => openArticle(article.id)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black/80 text-white text-xs tracking-wider">{article.category}</Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1">
                  {article.source}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3 text-xs text-gray-400">
                  <span>{formatTimeAgo(article.publishedAt)}</span>
                  <span>•</span>
                  <span>{article.source}</span>
                </div>
                <h3 className="font-bold text-lg mb-3 leading-tight group-hover:text-red-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Regional Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <div className="w-8 h-px bg-red-600 mr-4"></div>
          <h2 className="text-2xl font-bold tracking-wider">REGIONAL COVERAGE</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "MIDDLE EAST", count: "24", color: "bg-red-600", active: true },
            { name: "ASIA PACIFIC", count: "18", color: "bg-gray-700", active: false },
            { name: "AFRICA", count: "12", color: "bg-gray-700", active: false },
            { name: "AMERICAS", count: "15", color: "bg-gray-700", active: false },
          ].map((region, index) => (
            <div key={index} className="group cursor-pointer" onClick={() => alert(`Filtering by ${region.name}`)}>
              <div
                className={`${region.color} p-6 border border-gray-800 hover:border-red-900/50 transition-all duration-300 ${
                  region.active ? "border-red-600" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg tracking-wider mb-2">{region.name}</h3>
                    <p className="text-gray-300 text-sm">{region.count} ACTIVE STORIES</p>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Updates Ticker */}
      <section className="bg-gray-900/30 border-y border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold tracking-wider">LIVE UPDATES</span>
            </div>
            <div className="text-sm text-gray-300 overflow-hidden">
              <div className="animate-scroll whitespace-nowrap">
                Gaza ceasefire negotiations continue • Climate summit reaches historic agreement • EU implements new
                tech regulations • Global markets show mixed signals • Renewable energy breakthrough announced
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-900/30 bg-black/95 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-red-600 flex items-center justify-center">
                  <div className="w-3 h-3 border border-white"></div>
                </div>
                <span className="font-bold tracking-wider">NEXUS</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Real-time intelligence network powered by Al Jazeera's global news coverage and analysis.
              </p>
              <div className="text-xs text-gray-500">Data source: Al Jazeera Media Network</div>
            </div>
            <div>
              <h4 className="font-bold mb-4 tracking-wider">REGIONS</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Middle East
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Asia Pacific
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Africa
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Americas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Europe
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 tracking-wider">COVERAGE</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Politics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Economy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Environment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Human Rights
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 tracking-wider">INTELLIGENCE</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Live Updates: ACTIVE</li>
                <li>Sources: VERIFIED</li>
                <li>Coverage: 24/7</li>
                <li>Status: OPERATIONAL</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2024 NEXUS INTELLIGENCE NETWORK. POWERED BY AL JAZEERA.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span>Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
