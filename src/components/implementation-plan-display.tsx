"use client";

import { useState } from "react";
import { generateImplementationPlan, GenerateImplementationPlanOutput } from "@/ai/flows/generate-implementation-plan";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, FileCode, Milestone, TestTube2, Network, Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const initialFeatureDescription = `Implement the 'Reactflow App Builder' as described in the architecture document.

This feature will allow users to visually construct application logic using a drag-and-drop interface.

Key requirements:
- Create a new page at '/app-builder'.
- Use the 'reactflow' library for the canvas.
- Implement custom nodes for UI Screens, Data Models, and API Calls.
- Include a toolbar for adding nodes and managing the graph.
- Create an inspector panel to edit properties of selected nodes/edges.
- Develop a new Genkit flow named 'translateReactflowToKotlin' that takes the Reactflow JSON state as input and generates corresponding Kotlin application code.`;

const initialArchitecture = `The application is built on Next.js (App Router), TypeScript, ShadCN UI, Tailwind CSS, and Genkit.

Current Structure:
- src/app/layout.tsx (Root Layout)
  - src/components/layout/app-sidebar.tsx (Navigation)
  - src/components/layout/app-header.tsx (Header)
  - {children} (Page Content)

Existing Pages:
- / (Interactive Configuration)
- /architecture-patterns
- /build-docs
- /implementation-plan

Existing Genkit Flows:
- generateTermuxKotlinFramework
- suggestArchitecturePatterns
- generateBuildDocumentation
- generateImplementationPlan`;

export function ImplementationPlanDisplay() {
  const [featureDescription, setFeatureDescription] = useState(initialFeatureDescription);
  const [currentArchitecture, setCurrentArchitecture] = useState(initialArchitecture);
  const [plan, setPlan] = useState<GenerateImplementationPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePlan = async () => {
    if (!featureDescription.trim()) {
      toast({
        title: "Feature Description Required",
        description: "Please describe the feature you want to build.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setPlan(null);
    toast({
      title: "Generating Plan...",
      description: "Crafting a detailed implementation plan. This might take a moment.",
    });

    try {
      const result = await generateImplementationPlan({
        featureDescription,
        currentArchitecture: currentArchitecture || "Standard Next.js with Genkit, ShadCN, and Tailwind CSS.",
      });
      setPlan(result);
      toast({
        title: "Plan Generated Successfully!",
        description: "Your detailed implementation plan is ready.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating implementation plan:", error);
      toast({
        title: "Generation Failed",
        description: `An error occurred: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Implementation Planner</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Describe a feature, and I'll generate a detailed, placeholder-free implementation plan. 
            This embodies a robust development process by turning abstract requirements into concrete, actionable steps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="feature-description" className="font-semibold">Feature Description</Label>
            <Textarea
              id="feature-description"
              placeholder="e.g., 'Implement a user authentication system using email and password. Users should be able to sign up, log in, and log out. Add a profile page to display user information.'"
              value={featureDescription}
              onChange={(e) => setFeatureDescription(e.target.value)}
              className="min-h-[120px]"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="current-architecture" className="font-semibold">Current Architecture (Optional)</Label>
            <Textarea
              id="current-architecture"
              placeholder="Defaults to a standard Next.js, Genkit, ShadCN stack. Provide specifics if your setup is different."
              value={currentArchitecture}
              onChange={(e) => setCurrentArchitecture(e.target.value)}
              className="min-h-[80px]"
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGeneratePlan} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              "Generate Implementation Plan"
            )}
          </Button>
        </CardFooter>
      </Card>

      {plan && (
        <Card className="shadow-lg animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
                <Milestone className="h-6 w-6 text-primary"/>
                {plan.planTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Network className="h-5 w-5"/>Architectural Overview</h3>
              <p className="text-muted-foreground whitespace-pre-line">{plan.architecturalOverview}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><FileCode className="h-5 w-5"/>File Modifications</h3>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/30">
                <div className="space-y-4">
                  {plan.fileModifications.map((file, index) => (
                    <div key={index} className="p-3 rounded-md bg-background/50">
                      <p className="font-semibold text-primary">{file.filePath}</p>
                      <p className="text-sm font-medium">Reason: <span className="font-normal text-muted-foreground">{file.reason}</span></p>
                       <p className="text-sm font-medium">Summary: <span className="font-normal text-muted-foreground whitespace-pre-line">{file.contentSummary}</span></p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
             <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Database className="h-5 w-5"/>Data Schema Changes</h3>
                <p className="text-muted-foreground whitespace-pre-line">{plan.dataSchemaChanges}</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Milestone className="h-5 w-5"/>Backend Flows (Genkit)</h3>
                <p className="text-muted-foreground whitespace-pre-line">{plan.backendFlows}</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><TestTube2 className="h-5 w-5"/>Testing Strategy</h3>
                <p className="text-muted-foreground whitespace-pre-line">{plan.testingStrategy}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
