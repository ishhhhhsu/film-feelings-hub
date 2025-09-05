import { Heart, Brain, Film, Sparkles, Target, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function About() {
  const features = [
    {
      icon: Brain,
      title: "Sentiment Analysis",
      description: "Advanced AI analyzes movie reviews to understand the emotional impact and mood of each film."
    },
    {
      icon: Heart,
      title: "Mood-Based Recommendations",
      description: "Get personalized movie suggestions based on how you're feeling right now."
    },
    {
      icon: Film,
      title: "Curated Collection",
      description: "Thousands of movies carefully categorized by emotional themes and viewer sentiment."
    },
    {
      icon: Sparkles,
      title: "Movie Buddy AI",
      description: "Your personal movie companion that provides random suggestions and helps you discover hidden gems."
    }
  ]

  const stats = [
    { label: "Movies Analyzed", value: "50,000+" },
    { label: "Sentiment Categories", value: "25+" }, 
    { label: "Happy Users", value: "10,000+" },
    { label: "Recommendations Made", value: "1M+" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Film className="h-6 w-6 text-cinema-gold" />
            <span className="text-sm text-muted-foreground uppercase tracking-wide">About CineMood</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-cinema-gold bg-clip-text text-transparent">
            Because Every Feeling Deserves a Film
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            CineMood is a revolutionary movie discovery platform that understands your emotions and connects you with films that resonate with your current mood. Using advanced sentiment analysis, we help you find the perfect movie for any feeling.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-cinema-gold/5 border-primary/10">
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To create meaningful connections between viewers and films by understanding the emotional journey that movies provide. We believe that the right movie at the right moment can transform your day, inspire your thoughts, or simply provide the perfect escape.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How CineMood Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-primary to-cinema-purple rounded-lg text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Stats Section */}
        <Card className="mb-12 bg-gradient-to-r from-secondary to-accent/50 border-cinema-blue/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">CineMood by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Section */}
        <Card className="bg-gradient-to-r from-cinema-purple/5 to-cinema-blue/5 border-cinema-purple/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Brain className="h-6 w-6 text-cinema-purple" />
              The Technology Behind the Magic
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-muted-foreground mb-6">
                Our advanced sentiment analysis engine processes thousands of movie reviews, ratings, and emotional responses to create a comprehensive understanding of each film's emotional impact.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">Natural Language Processing</Badge>
              <Badge variant="secondary">Machine Learning</Badge>
              <Badge variant="secondary">Emotion Recognition</Badge>
              <Badge variant="secondary">Collaborative Filtering</Badge>
              <Badge variant="secondary">Sentiment Classification</Badge>
              <Badge variant="secondary">Recommendation Algorithms</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}