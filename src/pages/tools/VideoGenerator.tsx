import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Video, Loader2, Download, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import exampleVideo from "@/assets/example-video.jpg";

const VideoGenerator = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    const apiKey = localStorage.getItem("replicate_api_key");
    if (!apiKey) {
      toast.error("Please configure your Replicate API key in settings");
      navigate("/settings");
      return;
    }

    setIsGenerating(true);
    try {
      // This will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success("Video generated successfully!");
      setGeneratedVideo("mock-video-url");
    } catch (error) {
      toast.error("Failed to generate video. Please check your API key.");
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
              <h1 className="text-4xl font-bold">AI Video Generator</h1>
              <p className="text-muted-foreground">Create videos from text descriptions</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="p-6 space-y-4 bg-gradient-card shadow-card">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter your prompt</label>
                  <Textarea
                    placeholder="A drone shot flying over a tropical beach at sunset..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-cyan hover:opacity-90"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Video (this may take a while)...
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      Generate Video
                    </>
                  )}
                </Button>
              </Card>

              <Card className="p-6 bg-muted border-border">
                <h3 className="font-semibold mb-2">Video generation tips:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Describe camera movements (pan, zoom, fly through)</li>
                  <li>• Be specific about scene transitions</li>
                  <li>• Mention lighting conditions and time of day</li>
                  <li>• Keep prompts clear and concise</li>
                  <li>• Video generation can take 2-5 minutes</li>
                </ul>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-gradient-card shadow-card">
                <h3 className="font-semibold mb-4">Generated Video</h3>
                <div className="aspect-video rounded-xl bg-muted overflow-hidden flex items-center justify-center">
                  {generatedVideo ? (
                    <div className="relative w-full h-full">
                      <img src={exampleVideo} alt="Video thumbnail" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Button size="lg" className="rounded-full w-16 h-16 bg-white hover:bg-white/90">
                          <Play className="w-8 h-8 text-black" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Video className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p>Your generated video will appear here</p>
                    </div>
                  )}
                </div>
                {generatedVideo && (
                  <Button className="w-full mt-4" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </Button>
                )}
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Example Video Generations</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden shadow-card relative group">
                  <img src={exampleVideo} alt={`Example ${i}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
