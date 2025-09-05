import { useState } from "react"
import { Search, Filter, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoodSelector } from "@/components/mood-selector"
import { MovieRecommendations } from "@/components/movie-recommendations"
import { MovieBuddy } from "@/components/movie-buddy"
import cinemaHero from "@/assets/cinema-hero.jpg"

const genres = [
  "All Genres", "Action", "Comedy", "Drama", "Horror", "Romance", 
  "Sci-Fi", "Thriller", "Animation", "Documentary", "Fantasy"
]

// Mock search results
const searchResults = {
  "inception": {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    sentiments: ["Mind-bending", "Complex", "Thrilling", "Thought-provoking"]
  },
  "titanic": {
    title: "Titanic", 
    year: 1997,
    genre: "Romance",
    sentiments: ["Romantic", "Tragic", "Epic", "Heartbreaking"]
  },
  "joker": {
    title: "Joker",
    year: 2019, 
    genre: "Drama",
    sentiments: ["Dark", "Disturbing", "Intense", "Psychological"]
  }
}

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [recommendedMovies, setRecommendedMovies] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All Genres")
  const [searchResult, setSearchResult] = useState<any>(null)

  const handleMoodSelect = (mood: string, movies: string[]) => {
    setSelectedMood(mood)
    setRecommendedMovies(movies)
    setSearchResult(null)
    
    // Save to history (in a real app, this would be saved to a database)
    const historyItem = {
      type: 'mood',
      mood,
      movies,
      timestamp: new Date().toISOString()
    }
    const history = JSON.parse(localStorage.getItem('movieHistory') || '[]')
    history.unshift(historyItem)
    localStorage.setItem('movieHistory', JSON.stringify(history.slice(0, 50)))
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    const result = searchResults[searchQuery.toLowerCase() as keyof typeof searchResults]
    if (result) {
      setSearchResult(result)
      setSelectedMood(null)
      setRecommendedMovies([])
      
      // Save to history
      const historyItem = {
        type: 'search',
        query: searchQuery,
        result,
        timestamp: new Date().toISOString()
      }
      const history = JSON.parse(localStorage.getItem('movieHistory') || '[]')
      history.unshift(historyItem)
      localStorage.setItem('movieHistory', JSON.stringify(history.slice(0, 50)))
    }
  }

  const handleClear = () => {
    setSelectedMood(null)
    setRecommendedMovies([])
    setSearchResult(null)
    setSearchQuery("")
  }

  const handleReset = () => {
    setSelectedMood(null)
    setRecommendedMovies([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${cinemaHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
          <div className="relative text-center py-20 px-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-cinema-gold" />
              <span className="text-sm text-muted-foreground uppercase tracking-wide">Discover Your Next Favorite</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-cinema-gold bg-clip-text text-transparent">
              CineMood
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Because every feeling deserves a film. Discover movies that match your mood and explore the emotions behind every story.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8 bg-gradient-to-r from-card to-secondary/50 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Movie Sentiment Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search for a movie (try 'Inception', 'Titanic', or 'Joker')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full"
                />
              </div>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-primary to-cinema-purple"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResult && (
          <Card className="mb-8 border-cinema-gold/20 bg-gradient-to-r from-cinema-gold/5 to-cinema-purple/5">
            <CardHeader>
              <CardTitle className="text-cinema-gold">Search Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{searchResult.title}</h3>
                  <p className="text-muted-foreground">{searchResult.year} • {searchResult.genre}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Sentiment Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.sentiments.map((sentiment: string, index: number) => (
                      <Badge 
                        key={sentiment}
                        variant="outline"
                        className={
                          index === 0 ? "border-sentiment-positive text-sentiment-positive" :
                          index === 1 ? "border-sentiment-neutral text-sentiment-neutral" :
                          index === 2 ? "border-cinema-blue text-cinema-blue" :
                          "border-cinema-purple text-cinema-purple"
                        }
                      >
                        {sentiment}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mood Selection or Recommendations */}
        {!selectedMood && !searchResult ? (
          <MoodSelector onMoodSelect={handleMoodSelect} />
        ) : selectedMood && recommendedMovies.length > 0 ? (
          <MovieRecommendations
            mood={selectedMood}
            movies={recommendedMovies}
            onClear={handleClear}
            onReset={handleReset}
          />
        ) : null}

        {/* Movie Buddy */}
        <MovieBuddy />
      </div>
    </div>
  )
}