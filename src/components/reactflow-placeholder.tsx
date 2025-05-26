
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlayCircle, Save, UploadCloud } from "lucide-react";

export function ReactflowPlaceholder() {
  return (
    <Card className="w-full h-full shadow-xl flex flex-col">
      <CardHeader>
        <CardTitle>Reactflow App Builder</CardTitle>
        <CardDescription>
          Visually design your application's logic and UI flow using a drag-and-drop interface.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center bg-muted/30 p-6 rounded-b-lg border-t">
        <Image 
          src="https://placehold.co/800x500.png" 
          alt="Reactflow Placeholder" 
          width={800} 
          height={500}
          className="rounded-lg shadow-md mb-6 border"
          data-ai-hint="flowchart diagram"
        />
        <p className="text-center text-muted-foreground mb-6 max-w-md">
          This is where the Reactflow editor will be integrated. You'll be able to connect nodes, define actions, and build your app's structure visually.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" disabled>
            <PlayCircle className="mr-2 h-4 w-4" /> Run Simulation
          </Button>
          <Button variant="outline" disabled>
            <Save className="mr-2 h-4 w-4" /> Save Project
          </Button>
          <Button disabled>
            <UploadCloud className="mr-2 h-4 w-4" /> Export Kotlin Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
