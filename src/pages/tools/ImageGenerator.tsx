import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Image, Loader2, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import examplePortrait from "@/assets/example-portrait.jpg";
import exampleCity from "@/assets/example-city.jpg";
import exampleArt from "@/assets/example-art.jpg";

const ImageGenerator = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.image);
      toast.success("Image generated successfully!");
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate image';
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold">AI Image Generator</h1>
              <p className="text-muted-foreground">Create stunning images from text descriptions</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="p-6 space-y-4 bg-gradient-card shadow-card">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter your prompt</label>
                  <Textarea
                    placeholder="A majestic mountain landscape at sunset with vibrant colors..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-purple hover:opacity-90"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Image className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </Card>

              <Card className="p-6 bg-muted border-border">
                <h3 className="font-semibold mb-2">Tips for better results:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be specific about colors, style, and mood</li>
                  <li>• Include details about lighting and composition</li>
                  <li>• Mention artistic styles (realistic, anime, watercolor, etc.)</li>
                  <li>• Use descriptive adjectives</li>
                </ul>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-gradient-card shadow-card">
                <h3 className="font-semibold mb-4">Generated Image</h3>
                <div className="aspect-square rounded-xl bg-muted overflow-hidden flex items-center justify-center">
                  {generatedImage ? (
                    <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Image className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p>Your generated image will appear here</p>
                    </div>
                  )}
                </div>
                {generatedImage && (
                  <Button className="w-full mt-4" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                )}
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Example Generations</h3>
            <div className="grid grid-cols-3 gap-4">
              {[examplePortrait, exampleCity, exampleArt].map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-card">
                  <img src={img} alt={`Example ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
