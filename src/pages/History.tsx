import { useState, useEffect } from "react"
import { Clock, TrendingUp, Search, Heart, Calendar, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface HistoryItem {
  type: 'mood' | 'search'
  mood?: string
  query?: string
  movies?: string[]
  result?: any
  timestamp: string
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [stats, setStats] = useState({
    moodCounts: {} as Record<string, number>,
    totalSearches: 0,
    totalMoodSelections: 0,
    mostPopularMood: '',
    recentActivity: 0
  })

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('movieHistory') || '[]')
    setHistory(savedHistory)

    // Calculate statistics
    const moodCounts: Record<string, number> = {}
    let searchCount = 0
    let moodCount = 0
    let recentCount = 0
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

    savedHistory.forEach((item: HistoryItem) => {
      if (item.type === 'mood' && item.mood) {
        moodCounts[item.mood] = (moodCounts[item.mood] || 0) + 1
        moodCount++
      } else if (item.type === 'search') {
        searchCount++
      }

      if (new Date(item.timestamp).getTime() > oneDayAgo) {
        recentCount++
      }
    })

    const mostPopularMood = Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || ''

    setStats({
      moodCounts,
      totalSearches: searchCount,
      totalMoodSelections: moodCount,
      mostPopularMood,
      recentActivity: recentCount
    })
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('movieHistory')
    setHistory([])
    setStats({
      moodCounts: {},
      totalSearches: 0,
      totalMoodSelections: 0,
      mostPopularMood: '',
      recentActivity: 0
    })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getMoodColor = (mood: string) => {
    const colors: Record<string, string> = {
      'Happy': 'bg-sentiment-positive',
      'Romantic': 'bg-cinema-gold',
      'Sad': 'bg-sentiment-negative',
      'Exciting': 'bg-cinema-blue',
      'Scary': 'bg-destructive',
      'Inspiring': 'bg-primary'
    }
    return colors[mood] || 'bg-muted'
  }

  const getTotalInteractions = () => stats.totalSearches + stats.totalMoodSelections

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Your Movie Journey
            </h1>
            <p className="text-muted-foreground">
              Track your movie discovery history and see your emotional patterns
            </p>
          </div>
          {history.length > 0 && (
            <Button variant="outline" onClick={clearHistory}>
              Clear History
            </Button>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-primary/5 to-cinema-purple/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Interactions</p>
                  <p className="text-3xl font-bold text-primary">{getTotalInteractions()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-cinema-gold/5 to-cinema-blue/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Movie Searches</p>
                  <p className="text-3xl font-bold text-cinema-blue">{stats.totalSearches}</p>
                </div>
                <Search className="h-8 w-8 text-cinema-blue" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-sentiment-positive/5 to-cinema-gold/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Mood Selections</p>
                  <p className="text-3xl font-bold text-sentiment-positive">{stats.totalMoodSelections}</p>
                </div>
                <Heart className="h-8 w-8 text-sentiment-positive" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-secondary to-accent/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recent Activity</p>
                  <p className="text-3xl font-bold">{stats.recentActivity}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood Analytics */}
        {Object.keys(stats.moodCounts).length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-card to-secondary/30 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Mood Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-2">Most Popular Mood</p>
                <Badge 
                  className={`${getMoodColor(stats.mostPopularMood)} text-white text-lg px-4 py-2`}
                >
                  {stats.mostPopularMood}
                </Badge>
              </div>

              <div className="space-y-3">
                {Object.entries(stats.moodCounts)
                  .sort(([,a], [,b]) => b - a)
                  .map(([mood, count]) => {
                    const percentage = (count / stats.totalMoodSelections) * 100
                    return (
                      <div key={mood} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{mood}</span>
                          <span className="text-sm text-muted-foreground">
                            {count} times ({Math.round(percentage)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No activity yet</p>
                <p className="text-sm text-muted-foreground">Start exploring movies to see your history here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.slice(0, 10).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${
                      item.type === 'mood' ? 'bg-primary' : 'bg-cinema-blue'
                    } text-white`}>
                      {item.type === 'mood' ? (
                        <Heart className="h-4 w-4" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">
                          {item.type === 'mood' ? 'Mood Selection' : 'Movie Search'}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {formatDate(item.timestamp)}
                        </Badge>
                      </div>
                      
                      {item.type === 'mood' && item.mood && (
                        <div className="space-y-2">
                          <Badge className={`${getMoodColor(item.mood)} text-white`}>
                            {item.mood}
                          </Badge>
                          {item.movies && (
                            <div className="text-sm text-muted-foreground">
                              Recommended: {item.movies.slice(0, 2).join(', ')}
                              {item.movies.length > 2 && ` and ${item.movies.length - 2} more`}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {item.type === 'search' && (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foregroundo">
                            Searched for: <span className="font-medium">"{item.query}"</span>
                          </p>
                          {item.result && (
                            <p className="text-sm text-muted-foreground">
                              Found: {item.result.title} ({item.result.year})
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}