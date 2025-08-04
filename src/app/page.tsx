
import { InteractiveConfigClient } from "@/components/interactive-configuration/interactive-config-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InteractiveConfigurationPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 bg-card/70 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome to Droid Architect</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Configure your Android AI application by providing details about your app. 
            I'll help generate a foundational framework, suggest architecture patterns, 
            and create build documentation based on your input.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="flex justify-center">
          <InteractiveConfigClient />
      </div>
    </div>
  );
}
