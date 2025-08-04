
import { InteractiveConfigClient } from "@/components/interactive-configuration/interactive-config-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { List, ListItem } from "@/components/ui/list";
import { Puzzle } from "lucide-react";

export default function InteractiveConfigurationPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 bg-card/70 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome to Droid Architect</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Configure your Android AI application using one of the methods below. 
            Provide details about your app, and we'll help generate a foundational framework,
            suggest architecture patterns, and create build documentation.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <InteractiveConfigClient />
        </div>
        
        <Card className="shadow-lg h-fit">
          <CardHeader className="flex flex-row items-center gap-2">
            <Puzzle className="h-6 w-6 text-primary" />
            <CardTitle>Placeholder Features</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              The following features are currently placeholders and not yet functional. We can build them out together!
            </CardDescription>
            <List>
              <ListItem>App Builder (Visual Design)</ListItem>
              <ListItem>Visual Architecture Diagram</ListItem>
              <ListItem>Build Pipeline Visualization</ListItem>
              <ListItem>Triggering Builds</ListItem>
              <ListItem>Settings and About Pages</ListItem>
            </List>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
