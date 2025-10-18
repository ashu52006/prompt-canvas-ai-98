import { useState } from "react";
import { Search, Image, Video, Wand2, Palette, Sparkles, Eraser } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";
import heroBg from "@/assets/hero-bg.jpg";
import examplePortrait from "@/assets/example-portrait.jpg";
import exampleCity from "@/assets/example-city.jpg";
import exampleArt from "@/assets/example-art.jpg";
import exampleLandscape from "@/assets/example-landscape.jpg";
import exampleVideo from "@/assets/example-video.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const tools = [
    {
      title: "AI Image Generator",
      description: "Create stunning images from text prompts using advanced AI models",
      icon: Image,
      href: "/tools/image-generator",
      thumbnail: examplePortrait,
      gradient: "purple" as const,
    },
    {
      title: "AI Video Generator",
      description: "Generate amazing videos from text descriptions",
      icon: Video,
      href: "/tools/video-generator",
      thumbnail: exampleVideo,
      gradient: "cyan" as const,
    },
    {
      title: "Art Style Transfer",
      description: "Transform your images with AI-powered artistic styles",
      icon: Palette,
      href: "/tools/art-style",
      thumbnail: exampleArt,
      gradient: "purple" as const,
    },
    {
      title: "Logo Generator",
      description: "Design professional logos with AI assistance",
      icon: Sparkles,
      href: "/tools/logo-generator",
      thumbnail: exampleCity,
      gradient: "cyan" as const,
    },
    {
      title: "Background Remover",
      description: "Remove backgrounds from images instantly with AI",
      icon: Eraser,
      href: "/tools/background-remover",
      thumbnail: exampleLandscape,
      gradient: "purple" as const,
    },
    {
      title: "Magic Enhance",
      description: "Enhance image quality and resolution with AI",
      icon: Wand2,
      href: "/tools/enhance",
      thumbnail: examplePortrait,
      gradient: "cyan" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Create with AI
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your ideas into reality with our powerful AI generation tools. 
                From images to videos, we've got you covered.
              </p>
            </div>
            
            <div className="flex items-center gap-2 max-w-2xl mx-auto bg-card rounded-2xl p-2 shadow-card">
              <Search className="w-5 h-5 text-muted-foreground ml-3" />
              <Input
                type="text"
                placeholder="What do you want to create today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 text-lg"
              />
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 rounded-xl">
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Browse AI Tools</h2>
            <p className="text-muted-foreground">Choose from our collection of powerful AI generation tools</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </div>

      {/* Example Gallery */}
      <div className="container mx-auto px-4 py-16 border-t border-border">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">AI-Generated Examples</h2>
            <p className="text-muted-foreground">See what's possible with our AI tools</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[examplePortrait, exampleCity, exampleArt, exampleLandscape].map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                <img src={img} alt={`Example ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
