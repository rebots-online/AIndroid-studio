
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Network, AlertTriangle } from "lucide-react";
import type { SuggestArchitecturePatternsOutput } from "@/ai/flows/suggest-architecture-patterns";
import Image from "next/image";

export function ArchitecturePatternsDisplay() {
  const [patternsData, setPatternsData] = useState<SuggestArchitecturePatternsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("architecturePatternsResult");
      if (storedData) {
        setPatternsData(JSON.parse(storedData));
      } else {
        setError("No architecture pattern suggestions found. Please generate them first from the Interactive Configuration page.");
      }
    } catch (e) {
      console.error("Error parsing architecture patterns from localStorage:", e);
      setError("Failed to load architecture pattern suggestions.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
          </CardHeader>
          <CardContent>
             <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!patternsData) {
    return (
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>
          No architecture pattern suggestions available. Please configure your app on the main page first.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Network className="h-6 w-6 text-primary" />
            Suggested Architecture Patterns
          </CardTitle>
          <CardDescription>
            Based on your app's requirements, here are some suitable architecture patterns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Recommended Patterns:</h3>
            {patternsData.suggestedPatterns && patternsData.suggestedPatterns.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 pl-4">
                {patternsData.suggestedPatterns.map((pattern, index) => (
                  <li key={index} className="text-md">{pattern}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No specific patterns were suggested.</p>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Rationale:</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {patternsData.rationale || "No rationale provided."}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Sample Tech Stack Workflow</CardTitle>
          <CardDescription>
            A visual representation of a typical workflow using one of the suggested patterns.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
           <Image 
            src="https://placehold.co/700x400.png" // Placeholder for workflow diagram
            alt="Sample Tech Stack Workflow"
            width={700}
            height={400}
            className="rounded-md shadow-md border"
            data-ai-hint="workflow diagram"
          />
          <p className="mt-4 text-sm text-muted-foreground text-center">
            This diagram illustrates how components might interact in an architecture like MVVM or Clean Architecture.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
