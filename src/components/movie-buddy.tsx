import { useState } from "react"
import { MessageCircle, Bot, X, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const randomSuggestions = [
  { title: "The Shawshank Redemption", genre: "Drama", mood: "Hopeful" },
  { title: "Spirited Away", genre: "Animation", mood: "Wonder" },
  { title: "The Grand Budapest Hotel", genre: "Comedy", mood: "Whimsical" },
  { title: "Blade Runner 2049", genre: "Sci-Fi", mood: "Contemplative" },
  { title: "La La Land", genre: "Musical", mood: "Romantic" },
]

export function MovieBuddy() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSuggestion, setCurrentSuggestion] = useState(0)

  const getRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * randomSuggestions.length)
    setCurrentSuggestion(randomIndex)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-cinema-purple shadow-lg hover:shadow-cinema transition-all duration-300"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80">
      <Card className="bg-gradient-to-br from-card to-secondary border-primary/20 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Movie Buddy</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-3">
              🎬 Want a random movie suggestion? I've got you covered!
            </p>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">
                {randomSuggestions[currentSuggestion].title}
              </h4>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  {randomSuggestions[currentSuggestion].genre}
                </Badge>
                <Badge 
                  variant="outline"
                  className="border-cinema-gold text-cinema-gold"
                >
                  {randomSuggestions[currentSuggestion].mood}
                </Badge>
              </div>
            </div>
          </div>

          <Button
            onClick={getRandomSuggestion}
            className="w-full bg-gradient-to-r from-cinema-gold to-cinema-blue text-cinema-gold-foreground"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Get Another Suggestion
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}