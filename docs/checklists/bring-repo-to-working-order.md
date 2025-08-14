# Droid Architect – Bring Repository to Working Order Checklist

Project UUID: c365a748-e2de-81ea-a6e3-4d7402a882d5

## Reactflow App Builder
- [ ] Install Reactflow dependency: `npm install reactflow`
- [ ] Create page `src/app/app-builder/page.tsx` exporting component `AppBuilderPage`
  - [ ] Render `<AppBuilderClient />`
- [ ] Create component directory `src/components/app-builder`
  - [ ] Implement `src/components/app-builder/app-builder-client.tsx`
    - [ ] Import `{ ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge }` from `reactflow`
    - [ ] Define `const initialNodes: Node[] = []` and `const initialEdges: Edge[] = []`
    - [ ] Use hooks `const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)`
    - [ ] Use hooks `const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)`
    - [ ] Define `const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [])`
    - [ ] Return `<ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}>` with `<Background />`, `<Controls />`, `<MiniMap />`
    - [ ] Export default `AppBuilderClient`
- [ ] Update `src/components/layout/app-sidebar.tsx`
  - [ ] Add navigation item `{ href: "/app-builder", label: "App Builder", icon: WrenchIcon }` to sidebar menu array `appSidebarItems`

## Genkit Flow: translateReactflowToKotlin
- [ ] Create file `src/ai/flows/translate-reactflow-to-kotlin.ts`
  - [ ] Import `{ z }` from `zod`
  - [ ] Import `{ defineFlow }` from `genkit`
  - [ ] Define and export `translateReactflowToKotlin`:
    ```ts
    export const translateReactflowToKotlin = defineFlow({
      name: "translateReactflowToKotlin",
      inputSchema: z.object({ graph: z.any() }),
      outputSchema: z.object({ kotlinCode: z.string() }),
      run: async ({ graph }) => {
        // TODO: implement Google AI call
        return { kotlinCode: "" };
      },
    });
    ```
- [ ] Register flow in `src/ai/dev.ts`
  - [ ] Import `{ translateReactflowToKotlin }`
  - [ ] Add to `export const flows = [...]`
- [ ] Update `src/ai/genkit.ts`
  - [ ] Import and include `translateReactflowToKotlin` in `flows`

## Build Dashboard / BuildPipelineModal
- [ ] Create directory `src/components/build-dashboard`
  - [ ] Implement `src/components/build-dashboard/build-pipeline-modal.tsx`
    - [ ] Import ShadCN `Dialog` components
    - [ ] Export `BuildPipelineModal` component with props `{ open: boolean; onOpenChange: (open: boolean) => void }`
    - [ ] Define interface `BuildStage { id: string; label: string; icon: LucideIcon }`
    - [ ] Render draggable zones for stages: `configure`, `generate-code`, `compile`, `package-apk`
- [ ] Modify `src/components/layout/app-header.tsx`
  - [ ] `import { BuildPipelineModal } from "../build-dashboard/build-pipeline-modal"`
  - [ ] Add state `const [pipelineOpen, setPipelineOpen] = useState(false)`
  - [ ] Insert button `<Button id="build-pipeline-button" onClick={() => setPipelineOpen(true)}><PipelineIcon /></Button>`
  - [ ] Mount `<BuildPipelineModal open={pipelineOpen} onOpenChange={setPipelineOpen} />`

## Result Display Pages
- [ ] `src/components/architecture-patterns-display.tsx` reads `architecturePatternsResult` from `localStorage`
- [ ] `src/components/build-docs-display.tsx` reads `buildDocumentationResult` and `termuxFrameworkResult` from `localStorage`
- [ ] `src/components/implementation-plan-display.tsx` reads `implementationPlanResult` from `localStorage`

## Interactive Configuration
- [ ] In `src/components/interactive-configuration/interactive-config-client.tsx`
  - [ ] Use `Promise.allSettled` to invoke flows `generateTermuxKotlinFramework`, `suggestArchitecturePatterns`, `generateBuildDocumentation`, `generateImplementationPlan`
  - [ ] Save outputs to `localStorage` keys exactly: `"termuxFrameworkResult"`, `"architecturePatternsResult"`, `"buildDocumentationResult"`, `"implementationPlanResult"`
  - [ ] Assign form IDs: `traditional-form`, `wizard-form`, `conversational-ui`

## Theme Presets
- [ ] Extend `src/components/theme-switcher.tsx`
  - [ ] Provide dropdown `themeSelect` with options: `"brutalist"`, `"skeuomorphic"`, `"glassmorphic"`, `"neumorphic"`, `"retro"`

## Persistence Layer
- [ ] After committing code changes, write file contents to Postgres table `repo_snapshots(uuid_v8, file_path, content, parent_uuid_v8, ts)`
- [ ] Generate 1024-dim embedding using `mxbai-embed-large`; upsert into Qdrant collection `repo_embeddings` with payload `{ uuid_v8, file_path, parent_uuid_v8 }`

## Documentation
- [ ] Update `docs/architecture/overview.mmd` after code changes to match new structure
- [ ] Maintain Neo4j node `(:Project { uuid: "c365a748-e2de-81ea-a6e3-4d7402a882d5" })` with edges `(:File {path})` representing code relationships

## Verification
- [ ] Run `npm run lint`
- [ ] Run `npm run typecheck`
- [ ] Run `npm test`
