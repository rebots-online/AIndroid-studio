
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BuildPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BuildPipelineModal({ isOpen, onClose }: BuildPipelineModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Map of the App-Build Pipeline</DialogTitle>
          <DialogDescription>
            Visualize and interact with your Android app build process. Drag modules onto corresponding pipeline segments.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-auto p-1">
          {/* Placeholder for the visual pipeline */}
          <div className="bg-muted/50 rounded-lg p-6 min-h-[400px] flex flex-col items-center justify-center border border-dashed">
            <Image
              src="https://placehold.co/600x400.png" // Replace with actual pipeline visualization
              alt="Build Pipeline Placeholder"
              width={600}
              height={400}
              className="rounded-md shadow-md"
              data-ai-hint="pipeline flowchart"
            />
            <p className="mt-4 text-muted-foreground text-center">
              This is a placeholder for the interactive build pipeline map. <br />
              Future implementation will allow dragging components and visualizing the build flow.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border p-4 rounded-lg bg-card">
              <h3 className="font-semibold mb-2">Available Modules</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>User Interface Module</li>
                <li>AI Logic Core</li>
                <li>Data Storage Unit</li>
                <li>API Connector</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg bg-card col-span-2">
              <h3 className="font-semibold mb-2">Pipeline Stages</h3>
              <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                <li>Requirement Gathering (Configuration)</li>
                <li>UI Design (Reactflow Editor)</li>
                <li>Logic Implementation (Kotlin Translation)</li>
                <li>AI Model Integration</li>
                <li>Compilation &amp; Build (Android Studio CLI)</li>
                <li>Testing &amp; QA</li>
                <li>Deployment Preparation</li>
              </ol>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Close</Button>
          <Button disabled>Trigger Build (Coming Soon)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
