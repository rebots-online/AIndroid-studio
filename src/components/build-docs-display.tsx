
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Terminal, BookOpen, AlertTriangle, Lightbulb } from "lucide-react";
import type { GenerateBuildDocumentationOutput } from "@/ai/flows/generate-build-documentation";
import type { GenerateTermuxKotlinFrameworkOutput } from "@/ai/flows/generate-termux-kotlin-framework";

interface FullBuildInfo {
  buildDocs: GenerateBuildDocumentationOutput | null;
  frameworkDetails: GenerateTermuxKotlinFrameworkOutput | null;
}

export function BuildDocsDisplay() {
  const [buildInfo, setBuildInfo] = useState<FullBuildInfo>({ buildDocs: null, frameworkDetails: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let hasData = false;
    try {
      const storedBuildDocs = localStorage.getItem("buildDocumentationResult");
      const storedFrameworkDetails = localStorage.getItem("termuxFrameworkResult");
      
      const newBuildInfo: FullBuildInfo = { buildDocs: null, frameworkDetails: null };

      if (storedBuildDocs) {
        newBuildInfo.buildDocs = JSON.parse(storedBuildDocs);
        hasData = true;
      }
      if (storedFrameworkDetails) {
        newBuildInfo.frameworkDetails = JSON.parse(storedFrameworkDetails);
        hasData = true;
      }
      
      setBuildInfo(newBuildInfo);

      if (!hasData) {
        setError("No build documentation or framework details found. Please generate them first from the Interactive Configuration page.");
      }

    } catch (e) {
      console.error("Error parsing data from localStorage:", e);
      setError("Failed to load build documentation or framework details.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1,2,3].map(i => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
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
  
  const noBuildDocs = !buildInfo.buildDocs || !buildInfo.buildDocs.buildNotes;
  const noFrameworkDetails = !buildInfo.frameworkDetails || (!buildInfo.frameworkDetails.frameworkCode && !buildInfo.frameworkDetails.buildInstructions && !buildInfo.frameworkDetails.libraryImportScripts);

  if (noBuildDocs && noFrameworkDetails) {
     return (
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>
          No build documentation or framework details available. Please configure your app on the main page first.
        </AlertDescription>
      </Alert>
    );
  }


  return (
    <div className="space-y-8">
      {buildInfo.buildDocs && buildInfo.buildDocs.buildNotes && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-primary" />
              Build Documentation
            </CardTitle>
            <CardDescription>
              Step-by-step instructions for building and deploying your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] w-full rounded-md border p-4 bg-muted/30">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {buildInfo.buildDocs.buildNotes}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {buildInfo.frameworkDetails && (buildInfo.frameworkDetails.frameworkCode || buildInfo.frameworkDetails.buildInstructions || buildInfo.frameworkDetails.libraryImportScripts) && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Terminal className="h-6 w-6 text-primary" />
              Generated Framework Details
            </CardTitle>
            <CardDescription>
              Kotlin framework code, build instructions, and library import scripts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {buildInfo.frameworkDetails.frameworkCode && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Framework Code (Kotlin)</h3>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-muted/30">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {buildInfo.frameworkDetails.frameworkCode}
                  </pre>
                </ScrollArea>
              </div>
            )}
            {buildInfo.frameworkDetails.buildInstructions && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Build Instructions</h3>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/30">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {buildInfo.frameworkDetails.buildInstructions}
                  </pre>
                </ScrollArea>
              </div>
            )}
            {buildInfo.frameworkDetails.libraryImportScripts && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Library Import Scripts</h3>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-muted/30">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {buildInfo.frameworkDetails.libraryImportScripts}
                  </pre>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {buildInfo.buildDocs && buildInfo.buildDocs.buildNotes && (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Google Play Store Policy Notes
                </CardTitle>
                <CardDescription>
                    Important considerations regarding Google Play Store policies related to your app's architecture and AI features.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/30">
                <pre className="whitespace-pre-wrap text-sm font-mono">
                    {/* Extract this part from buildNotes if it's there, or AI should provide it distinctly */}
                    {/* For now, assuming it's part of buildNotes or needs specific AI call */}
                    Relevant sections from build notes concerning Play Store policies will appear here.
                    Example: "Ensure your app's privacy policy clearly states the use of AI and data handling. If using Termux, be mindful of its implications on app distribution channels."
                    {buildInfo.buildDocs.buildNotes.split("Google Play Store policy")[1] || "Refer to general build notes for policy considerations."}
                </pre>
                </ScrollArea>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
