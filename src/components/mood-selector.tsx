import { useState } from "react"
import { Heart, Smile, Frown, Zap, Ghost, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const moods = [
  { name: "Happy", icon: Smile, color: "bg-sentiment-positive", movies: ["The Pursuit of Happyness", "Paddington", "Chef", "The Grand Budapest Hotel", "About Time"] },
  { name: "Romantic", icon: Heart, color: "bg-cinema-gold", movies: ["The Notebook", "La La Land", "Before Sunrise", "Her", "Eternal Sunshine"] },
  { name: "Sad", icon: Frown, color: "bg-sentiment-negative", movies: ["Inside Out", "Manchester by the Sea", "Her", "Lost in Translation", "The Pursuit of Happyness"] },
  { name: "Exciting", icon: Zap, color: "bg-cinema-blue", movies: ["Mad Max: Fury Road", "John Wick", "Mission Impossible", "The Dark Knight", "Inception"] },
  { name: "Scary", icon: Ghost, color: "bg-destructive", movies: ["The Conjuring", "Hereditary", "Get Out", "A Quiet Place", "The Babadook"] },
  { name: "Inspiring", icon: Sparkles, color: "bg-primary", movies: ["The Shawshank Redemption", "Dead Poets Society", "Good Will Hunting", "Rocky", "Forrest Gump"] },
]

interface MoodSelectorProps {
  onMoodSelect: (mood: string, movies: string[]) => void
}

export function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const handleMoodClick = (mood: typeof moods[0]) => {
    setSelectedMood(mood.name)
    onMoodSelect(mood.name, mood.movies)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-cinema-gold bg-clip-text text-transparent">
          How are you feeling?
        </h2>
        <p className="text-muted-foreground">
          Select your mood and discover movies that match your vibe
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon
          const isSelected = selectedMood === mood.name
          
          return (
            <Card
              key={mood.name}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg",
                isSelected && "ring-2 ring-primary shadow-cinema"
              )}
              onClick={() => handleMoodClick(mood)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                <div className={cn(
                  "p-4 rounded-full text-white transition-all duration-300",
                  mood.color,
                  isSelected && "scale-110"
                )}>
                  <Icon className="h-8 w-8" />
                </div>
                <span className="font-semibold text-lg">{mood.name}</span>
                {isSelected && (
                  <Badge variant="secondary" className="animate-in fade-in">
                    Selected
                  </Badge>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}