# Droid Architect - Architecture Overview

This document outlines the architecture and implementation plan for the Droid Architect application. The structure is represented in a hierarchical, tree-like format to delineate components, technologies, and data flow.

## 1. Core Technologies

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI Components**: React, ShadCN UI
- **Styling**: Tailwind CSS
- **Generative AI**: Google AI via Genkit
- **Schema Validation**: Zod
- **Icons**: Lucide React

## 2. Application Architecture (AST Form)

```
- RootLayout (src/app/layout.tsx)
  - SidebarProvider (src/components/ui/sidebar.tsx)
    - AppSidebar (src/components/layout/app-sidebar.tsx)
      - Navigation to major features.
    - AppHeader (src/components/layout/app-header.tsx)
      - ThemeSwitcher, Placeholder for Build Pipeline Modal.
    - SidebarInset
      - main
        - {children} (Page content)
```

## 3. Feature Implementation Plan

### 3.1. Interactive Configuration (Feature Complete)

- **`page.tsx` (`src/app/page.tsx`)**: Main entry point for configuration.
  - **`InteractiveConfigClient` (`src/components/interactive-configuration/interactive-config-client.tsx`)**: Manages the tabbed interface and orchestrates AI calls.
    - **Technology**: ShadCN `Tabs`.
    - **State Management**: React `useState`.
    - **Logic**:
      - Handles form submission from any of the three UI modes.
      - Invokes multiple Genkit flows in parallel (`generateTermuxKotlinFramework`, `suggestArchitecturePatterns`, `generateBuildDocumentation`).
      - Stores results in `localStorage` for other pages to consume.
    - **Components**:
      - **`TraditionalForm`**: Standard form layout.
        - **Technology**: `react-hook-form`, `zod` for validation.
      - **`WizardForm`**: Multi-step form.
        - **Technology**: ShadCN `Progress`, React `useState` for step management.
      - **`ConversationalUi`**: Chat-based configuration.
        - **Technology**: Custom chat interface using ShadCN components.

### 3.2. AI Flow Orchestration

- **`genkit.ts` (`src/ai/genkit.ts`)**: Central Genkit initialization.
- **Flows (`src/ai/flows/`)**:
  - **`generateTermuxKotlinFramework.ts`**:
    - **Input**: `appFunctionality`, `aiFeatures`, `platformSpecifics`.
    - **Output**: Kotlin code, build instructions, library scripts.
    - **Library**: `Genkit`, `zod`.
  - **`suggestArchitecturePatterns.ts`**:
    - **Input**: `appFeatures`, `appComplexity`.
    - **Output**: Array of patterns (`MVVM`, etc.) and rationale.
    - **Library**: `Genkit`, `zod`.
  - **`generateBuildDocumentation.ts`**:
    - **Input**: `appName`, `targetPlatform`, `aiFeatures`.
    - **Output**: Detailed markdown build notes.
    - **Library**: `Genkit`, `zod`.
  - **`generateImplementationPlan.ts`**:
    - **Input**: `featureDescription`, `currentArchitecture`.
    - **Output**: A structured plan with file modifications, schemas, and flow descriptions.
    - **Library**: `Genkit`, `zod`.

### 3.3. Results Display Pages

- **`architecture-patterns/page.tsx`**: Displays AI-suggested patterns.
  - **Logic**: Reads `architecturePatternsResult` from `localStorage`.
- **`build-docs/page.tsx`**: Displays generated framework and documentation.
  - **Logic**: Reads `buildDocumentationResult` and `termuxFrameworkResult` from `localStorage`.
- **`implementation-plan/page.tsx`**: UI to interact with the implementation plan generator.
  - **Logic**: Directly calls the `generateImplementationPlan` flow and displays the structured result.

### 3.4. Reactflow App Builder (Future Implementation)

- **`app-builder/page.tsx`** (New Page)
  - **`AppBuilderClient`** (New Component)
    - **Technology**: `reactflow` library (will need to be added to `package.json`).
    - **Components**:
      - **Canvas**: The main graph area where users build flows.
        - **Nodes**: Custom nodes representing app components (e.g., "UI Screen", "Data Model", "API Call").
        - **Edges**: Connections defining data flow and logic sequence.
      - **Toolbar**: Buttons for adding nodes, saving, loading, and exporting.
      - **Inspector Panel**: Displays and allows editing of properties for the selected node or edge.
    - **Logic**:
      - Manage graph state (nodes, edges) using `reactflow` hooks.
      - **(Genkit Integration)**: Create a new flow, `translateReactflowToKotlin`, that takes the Reactflow JSON state as input and generates the corresponding Kotlin application code.

### 3.5. Build Dashboard (Future Implementation)

- **`BuildPipelineModal`** (New Component)
  - **Triggered from**: `AppHeader`.
  - **Technology**: ShadCN `Dialog` or a dedicated page.
  - **Concept**: A visual representation of the Android build process (e.g., `Configure -> Generate Code -> Compile -> Package APK`).
  - **Interactivity**: Users would drag-and-drop the components they defined in the App Builder onto the corresponding pipeline stage.
  - **Logic**:
    - Each stage would trigger a corresponding script or CLI command.
    - **(Genkit Integration)**: A flow could generate the necessary `build.gradle` files and CLI scripts based on the user's configuration.

