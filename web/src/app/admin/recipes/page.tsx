'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Search,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Play,
  Star,
  Clock,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MOCK_RECIPES } from '@/lib/mock-data';

const DIFFICULTY_CONFIG = {
  easy: { label: 'Easy', color: 'bg-green-500' },
  medium: { label: 'Medium', color: 'bg-yellow-500' },
  hard: { label: 'Hard', color: 'bg-red-500' },
};

export default function AdminRecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = MOCK_RECIPES.filter((recipe) =>
    recipe.title_english.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Recipes</h1>
          <p className="text-muted-foreground">Manage cooking recipes and videos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Recipe
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recipes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const difficulty = DIFFICULTY_CONFIG[recipe.difficulty_level];
          return (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-orange-100 to-red-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🍛</span>
                </div>
                {recipe.video_url && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="icon" className="rounded-full h-14 w-14 bg-white text-orange-500">
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>
                )}
                <Badge className={`absolute top-2 left-2 ${difficulty.color} text-white`}>
                  {difficulty.label}
                </Badge>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-1">{recipe.title_english}</h3>
                <p className="text-sm text-muted-foreground">{recipe.title_tamil}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.cooking_time}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {recipe.servings}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {recipe.rating}
                  </span>
                </div>
                {recipe.fish_product && (
                  <Badge variant="secondary" className="mt-3">
                    🐟 {recipe.fish_product.name_english}
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
