import { Star, Clock, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MovieRecommendationsProps {
  mood: string
  movies: string[]
  onClear: () => void
  onReset: () => void
}

// Mock movie data - in a real app, this would come from an API
const movieDetails = {
  "The Pursuit of Happyness": { year: 2006, rating: 8.0, genre: "Drama", sentiment: "Hopeful" },
  "Paddington": { year: 2014, rating: 8.4, genre: "Family", sentiment: "Joyful" },
  "Chef": { year: 2014, rating: 7.3, genre: "Comedy", sentiment: "Uplifting" },
  "The Grand Budapest Hotel": { year: 2014, rating: 8.1, genre: "Comedy", sentiment: "Whimsical" },
  "About Time": { year: 2013, rating: 7.8, genre: "Romance", sentiment: "Heartwarming" },
  "The Notebook": { year: 2004, rating: 7.8, genre: "Romance", sentiment: "Passionate" },
  "La La Land": { year: 2016, rating: 8.0, genre: "Musical", sentiment: "Bittersweet" },
  "Before Sunrise": { year: 1995, rating: 8.1, genre: "Romance", sentiment: "Intimate" },
  "Her": { year: 2013, rating: 8.0, genre: "Drama", sentiment: "Melancholic" },
  "Eternal Sunshine": { year: 2004, rating: 8.3, genre: "Drama", sentiment: "Complex" },
  "Inside Out": { year: 2015, rating: 8.1, genre: "Animation", sentiment: "Emotional" },
  "Manchester by the Sea": { year: 2016, rating: 7.8, genre: "Drama", sentiment: "Grief" },
  "Lost in Translation": { year: 2003, rating: 7.7, genre: "Drama", sentiment: "Lonely" },
  "Mad Max: Fury Road": { year: 2015, rating: 8.1, genre: "Action", sentiment: "Intense" },
  "John Wick": { year: 2014, rating: 7.4, genre: "Action", sentiment: "Thrilling" },
  "Mission Impossible": { year: 1996, rating: 7.1, genre: "Action", sentiment: "Adrenaline" },
  "The Dark Knight": { year: 2008, rating: 9.0, genre: "Action", sentiment: "Dark" },
  "Inception": { year: 2010, rating: 8.8, genre: "Sci-Fi", sentiment: "Mind-bending" },
  "The Conjuring": { year: 2013, rating: 7.5, genre: "Horror", sentiment: "Terrifying" },
  "Hereditary": { year: 2018, rating: 7.3, genre: "Horror", sentiment: "Disturbing" },
  "Get Out": { year: 2017, rating: 7.7, genre: "Horror", sentiment: "Suspenseful" },
  "A Quiet Place": { year: 2018, rating: 7.5, genre: "Horror", sentiment: "Tense" },
  "The Babadook": { year: 2014, rating: 6.8, genre: "Horror", sentiment: "Psychological" },
  "The Shawshank Redemption": { year: 1994, rating: 9.3, genre: "Drama", sentiment: "Hopeful" },
  "Dead Poets Society": { year: 1989, rating: 8.1, genre: "Drama", sentiment: "Inspiring" },
  "Good Will Hunting": { year: 1997, rating: 8.3, genre: "Drama", sentiment: "Motivational" },
  "Rocky": { year: 1976, rating: 8.1, genre: "Sports", sentiment: "Triumphant" },
  "Forrest Gump": { year: 1994, rating: 8.8, genre: "Drama", sentiment: "Life-affirming" },
}

export function MovieRecommendations({ mood, movies, onClear, onReset }: MovieRecommendationsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Movies for your {mood} mood</h3>
          <p className="text-muted-foreground">Here are 5 perfect matches for you</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
          <Button variant="outline" onClick={onClear}>
            Clear
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {movies.map((movie, index) => {
          const details = movieDetails[movie as keyof typeof movieDetails] || {
            year: 2020,
            rating: 7.5,
            genre: "Drama",
            sentiment: "Good"
          }

          return (
            <Card key={movie} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {movie}
                    </h4>
                    <div className="flex items-center space-x-1 text-cinema-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium">{details.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{details.year}</span>
                    </div>
                    <Badge variant="secondary">{details.genre}</Badge>
                  </div>

                  <Badge 
                    variant="outline" 
                    className="border-cinema-purple text-cinema-purple"
                  >
                    {details.sentiment}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-cinema-gold/5 border-cinema-gold/20">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            🎬 Enjoying these recommendations? Try a different mood or ask our Movie Buddy for more suggestions!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}