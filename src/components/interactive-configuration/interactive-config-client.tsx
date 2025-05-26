
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TraditionalForm, TraditionalFormValues } from "./traditional-form";
import { WizardForm } from "./wizard-form";
import { ConversationalUi } from "./conversational-ui";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { generateTermuxKotlinFramework, GenerateTermuxKotlinFrameworkInput } from "@/ai/flows/generate-termux-kotlin-framework";
import { suggestArchitecturePatterns, SuggestArchitecturePatternsInput } from "@/ai/flows/suggest-architecture-patterns";
import { generateBuildDocumentation, GenerateBuildDocumentationInput } from "@/ai/flows/generate-build-documentation";
import { Card, CardContent } from "../ui/card";

export function InteractiveConfigClient() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Store results in localStorage to be picked up by other pages
  const storeAiResults = (data: any, key: string) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error storing ${key} in localStorage:`, error);
      toast({
        title: "Storage Error",
        description: `Could not save ${key} results locally.`,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (values: TraditionalFormValues) => {
    setIsLoading(true);
    toast({
      title: "Processing Request",
      description: "Generating framework, architecture patterns, and documentation. This may take a moment...",
    });

    // Clear previous results
    localStorage.removeItem("architecturePatternsResult");
    localStorage.removeItem("buildDocumentationResult");
    localStorage.removeItem("termuxFrameworkResult");

    try {
      const frameworkInput: GenerateTermuxKotlinFrameworkInput = {
        appFunctionality: values.appFunctionality,
        aiFeatures: values.aiFeatures,
        platformSpecifics: values.platformSpecifics || "Not specified",
      };
      const frameworkPromise = generateTermuxKotlinFramework(frameworkInput).then(result => {
        storeAiResults(result, "termuxFrameworkResult");
        return result;
      });

      const archInput: SuggestArchitecturePatternsInput = {
        appFeatures: `${values.appName}: ${values.appFunctionality}. AI Features: ${values.aiFeatures}`,
        appComplexity: "Medium to High, involves AI integration and potentially Termux.",
      };
      const archPromise = suggestArchitecturePatterns(archInput).then(result => {
        storeAiResults(result, "architecturePatternsResult");
        return result;
      });

      const docsInput: GenerateBuildDocumentationInput = {
        appName: values.appName,
        targetPlatform: values.platformSpecifics || "Android (General)",
        aiFeatures: values.aiFeatures,
        // Architecture pattern could be dynamically set if known, or generalized
        architecturePattern: "To be determined (or common patterns like MVVM/Clean Architecture)",
      };
      const docsPromise = generateBuildDocumentation(docsInput).then(result => {
        storeAiResults(result, "buildDocumentationResult");
        return result;
      });

      await Promise.all([frameworkPromise, archPromise, docsPromise]);

      toast({
        title: "Generation Successful!",
        description: "Framework, patterns, and docs generated. Check respective pages.",
        variant: "default",
      });
      
      // Optionally navigate to a results overview page or a specific page
      // router.push('/architecture-patterns'); // Example navigation

    } catch (error) {
      console.error("Error during AI generation:", error);
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
    <Tabs defaultValue="traditional" className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
        <TabsTrigger value="traditional">Traditional Form</TabsTrigger>
        <TabsTrigger value="wizard">Wizard Form</TabsTrigger>
        <TabsTrigger value="conversational">Conversational UI</TabsTrigger>
      </TabsList>
      <TabsContent value="traditional">
        <TraditionalForm onSubmit={handleSubmit} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="wizard">
        <WizardForm onSubmit={handleSubmit} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="conversational">
        <div className="flex justify-center">
         <ConversationalUi onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
