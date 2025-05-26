
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  appName: z.string().min(2, "App name must be at least 2 characters."),
  appFunctionality: z.string().min(10, "Please describe the app functionality in at least 10 characters."),
  aiFeatures: z.string().min(10, "Describe AI features (min 10 characters)."),
  platformSpecifics: z.string().optional(),
});

export type TraditionalFormValues = z.infer<typeof formSchema>;

interface TraditionalFormProps {
  onSubmit: (values: TraditionalFormValues) => Promise<void>;
  isLoading: boolean;
}

export function TraditionalForm({ onSubmit, isLoading }: TraditionalFormProps) {
  const form = useForm<TraditionalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appName: "",
      appFunctionality: "",
      aiFeatures: "",
      platformSpecifics: "",
    },
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>App Configuration</CardTitle>
        <CardDescription>Provide details about the Android AI app you want to build.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Smart Notes AI" {...field} />
                  </FormControl>
                  <FormDescription>
                    The public display name for your application.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appFunctionality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Functionality</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the core functionality of your app. What problem does it solve? What are its key features?"
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aiFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detail the specific AI features you want to integrate (e.g., image recognition, natural language processing, text summarization)."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platformSpecifics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform Specifics (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Target Android versions, Termux compatibility, hardware requirements."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Any specific platform considerations or constraints.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Framework & Docs"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
