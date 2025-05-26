
"use client";

import * as React from "react";
import Link from "next/link";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Workflow, BotMessageSquare } from "lucide-react";
import { BuildPipelineModal } from "@/components/build-pipeline-modal";

export function AppHeader() {
  const { isMobile, openMobile } = useSidebar();
  const [isBuildPipelineModalOpen, setIsBuildPipelineModalOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
        {isMobile && <SidebarTrigger className="md:hidden" />}
        
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <BotMessageSquare className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">Droid Architect</h1>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsBuildPipelineModalOpen(true)}
            aria-label="Open Build Pipeline Dashboard"
          >
            <Workflow className="h-5 w-5" />
          </Button>
          <ThemeSwitcher />
        </div>
      </header>
      <BuildPipelineModal 
        isOpen={isBuildPipelineModalOpen} 
        onClose={() => setIsBuildPipelineModalOpen(false)} 
      />
    </>
  );
}
