import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Key, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState({
    replicate: localStorage.getItem("replicate_api_key") || "",
    stability: localStorage.getItem("stability_api_key") || "",
    elevenlabs: localStorage.getItem("elevenlabs_api_key") || "",
  });

  const handleSave = () => {
    localStorage.setItem("replicate_api_key", apiKeys.replicate);
    localStorage.setItem("stability_api_key", apiKeys.stability);
    localStorage.setItem("elevenlabs_api_key", apiKeys.elevenlabs);
    toast.success("API keys saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto space-y-8">
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
              <h1 className="text-4xl font-bold">API Configuration</h1>
              <p className="text-muted-foreground">Set up your API keys for external services</p>
            </div>
          </div>

          <Card className="p-6 space-y-6 bg-gradient-card shadow-card">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <Key className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">API Keys</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="replicate">Replicate API Key</Label>
                <Input
                  id="replicate"
                  type="password"
                  placeholder="r8_xxxxxxxxxxxx"
                  value={apiKeys.replicate}
                  onChange={(e) => setApiKeys({ ...apiKeys, replicate: e.target.value })}
                  className="font-mono"
                />
                <p className="text-sm text-muted-foreground">
                  Used for video generation. Get your key at{" "}
                  <a href="https://replicate.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    replicate.com
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stability">Stability AI API Key</Label>
                <Input
                  id="stability"
                  type="password"
                  placeholder="sk-xxxxxxxxxxxx"
                  value={apiKeys.stability}
                  onChange={(e) => setApiKeys({ ...apiKeys, stability: e.target.value })}
                  className="font-mono"
                />
                <p className="text-sm text-muted-foreground">
                  Used for advanced image generation. Get your key at{" "}
                  <a href="https://platform.stability.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    platform.stability.ai
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="elevenlabs">ElevenLabs API Key</Label>
                <Input
                  id="elevenlabs"
                  type="password"
                  placeholder="xxxxxxxxxxxxxxxx"
                  value={apiKeys.elevenlabs}
                  onChange={(e) => setApiKeys({ ...apiKeys, elevenlabs: e.target.value })}
                  className="font-mono"
                />
                <p className="text-sm text-muted-foreground">
                  Used for voice generation. Get your key at{" "}
                  <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    elevenlabs.io
                  </a>
                </p>
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-gradient-hero hover:opacity-90"
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Save API Keys
            </Button>
          </Card>

          <Card className="p-6 bg-muted border-border">
            <h3 className="font-semibold mb-2">About API Keys</h3>
            <p className="text-sm text-muted-foreground">
              Your API keys are stored locally in your browser and are never sent to our servers. 
              They are only used to authenticate with the respective services when you use the tools.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
