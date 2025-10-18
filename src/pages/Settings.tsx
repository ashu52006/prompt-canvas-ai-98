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
              <div className="p-6 bg-green-500/10 border-2 border-green-500/30 rounded-lg">
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2 text-lg">Image Generation - Already Working</h3>
                <p className="text-sm text-muted-foreground">Uses Lovable AI - no API key needed</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-500/5 to-red-500/5 border-2 border-orange-500/30 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="replicate" className="text-base font-semibold">Replicate API Key</Label>
                  <span className="text-xs bg-orange-500/20 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full font-semibold">REQUIRED FOR VIDEO</span>
                </div>
                <Input
                  id="replicate"
                  type="password"
                  placeholder="Paste your Replicate API key here: r8_xxxxxxxxxxxx"
                  value={apiKeys.replicate}
                  onChange={(e) => setApiKeys({ ...apiKeys, replicate: e.target.value })}
                  className="font-mono text-base h-12 border-2"
                />
                <div className="flex items-start gap-2 p-3 bg-background/50 rounded-lg">
                  <span className="text-2xl">🎬</span>
                  <div>
                    <p className="text-sm font-medium mb-1">Enables: Video Generation</p>
                    <p className="text-sm text-muted-foreground">
                      Get your key at{" "}
                      <a href="https://replicate.com/account/api-tokens" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">
                        replicate.com/account/api-tokens
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-2 border-blue-500/20 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="stability" className="text-base font-semibold">Stability AI API Key</Label>
                  <span className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-semibold">OPTIONAL</span>
                </div>
                <Input
                  id="stability"
                  type="password"
                  placeholder="Paste your Stability AI key here: sk-xxxxxxxxxxxx"
                  value={apiKeys.stability}
                  onChange={(e) => setApiKeys({ ...apiKeys, stability: e.target.value })}
                  className="font-mono text-base h-12 border-2"
                />
                <div className="flex items-start gap-2 p-3 bg-background/50 rounded-lg">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="text-sm font-medium mb-1">Enables: Advanced Image Features</p>
                    <p className="text-sm text-muted-foreground">
                      Get your key at{" "}
                      <a href="https://platform.stability.ai/account/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                        platform.stability.ai/account/keys
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-2 border-green-500/20 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="elevenlabs" className="text-base font-semibold">ElevenLabs API Key</Label>
                  <span className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full font-semibold">OPTIONAL</span>
                </div>
                <Input
                  id="elevenlabs"
                  type="password"
                  placeholder="Paste your ElevenLabs key here: xxxxxxxxxxxxxxxx"
                  value={apiKeys.elevenlabs}
                  onChange={(e) => setApiKeys({ ...apiKeys, elevenlabs: e.target.value })}
                  className="font-mono text-base h-12 border-2"
                />
                <div className="flex items-start gap-2 p-3 bg-background/50 rounded-lg">
                  <span className="text-2xl">🎙️</span>
                  <div>
                    <p className="text-sm font-medium mb-1">Enables: Voice & Audio Generation</p>
                    <p className="text-sm text-muted-foreground">
                      Get your key at{" "}
                      <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline font-semibold">
                        elevenlabs.io/app/settings/api-keys
                      </a>
                    </p>
                  </div>
                </div>
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
