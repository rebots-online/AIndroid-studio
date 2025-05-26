
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TraditionalFormValues } from "./traditional-form"; // Assuming this type covers all fields
import { Loader2 } from "lucide-react";

const STEPS = [
  { id: "appName", label: "App Name", fields: ["appName"] },
  { id: "functionality", label: "Functionality", fields: ["appFunctionality"] },
  { id: "aiFeatures", label: "AI Features", fields: ["aiFeatures"] },
  { id: "platform", label: "Platform Specifics", fields: ["platformSpecifics"] },
  { id: "review", label: "Review & Submit" },
];

interface WizardFormProps {
  onSubmit: (values: TraditionalFormValues) => Promise<void>;
  isLoading: boolean;
}

export function WizardForm({ onSubmit, isLoading }: WizardFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<TraditionalFormValues>>({});

  const handleNext = () => {
    // Add validation logic here if needed per step
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await onSubmit(formData as TraditionalFormValues);
  };

  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>App Configuration Wizard</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].label}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={progressValue} className="w-full mb-6" />
        
        {STEPS[currentStep].id === "appName" && (
          <div className="space-y-2">
            <Label htmlFor="appName">Application Name</Label>
            <Input 
              id="appName" 
              name="appName" 
              placeholder="e.g., Smart Notes AI" 
              value={formData.appName || ""} 
              onChange={handleChange} 
            />
            <p className="text-sm text-muted-foreground">The public display name for your application.</p>
          </div>
        )}

        {STEPS[currentStep].id === "functionality" && (
          <div className="space-y-2">
            <Label htmlFor="appFunctionality">App Functionality</Label>
            <Textarea 
              id="appFunctionality" 
              name="appFunctionality" 
              placeholder="Describe the core functionality..." 
              className="resize-y min-h-[100px]"
              value={formData.appFunctionality || ""} 
              onChange={handleChange} 
            />
          </div>
        )}

        {STEPS[currentStep].id === "aiFeatures" && (
          <div className="space-y-2">
            <Label htmlFor="aiFeatures">AI Features</Label>
            <Textarea 
              id="aiFeatures" 
              name="aiFeatures" 
              placeholder="Detail the specific AI features..." 
              className="resize-y min-h-[100px]"
              value={formData.aiFeatures || ""} 
              onChange={handleChange} 
            />
          </div>
        )}

        {STEPS[currentStep].id === "platform" && (
          <div className="space-y-2">
            <Label htmlFor="platformSpecifics">Platform Specifics (Optional)</Label>
            <Input 
              id="platformSpecifics" 
              name="platformSpecifics" 
              placeholder="e.g., Target Android versions..." 
              value={formData.platformSpecifics || ""} 
              onChange={handleChange} 
            />
            <p className="text-sm text-muted-foreground">Any specific platform considerations or constraints.</p>
          </div>
        )}

        {STEPS[currentStep].id === "review" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Review Your Configuration</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>App Name:</strong> {formData.appName || "Not set"}</li>
              <li><strong>Functionality:</strong> {formData.appFunctionality || "Not set"}</li>
              <li><strong>AI Features:</strong> {formData.aiFeatures || "Not set"}</li>
              <li><strong>Platform Specifics:</strong> {formData.platformSpecifics || "N/A"}</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Please review the information above. Click "Generate" to proceed.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || isLoading}>
          Previous
        </Button>
        {currentStep < STEPS.length - 1 ? (
          <Button onClick={handleNext} disabled={isLoading}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isLoading}>
             {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Framework & Docs"
              )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
