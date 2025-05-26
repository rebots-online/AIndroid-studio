# **App Name**: Droid Architect

## Core Features:

- Reactflow App Builder: No-code/low-code visual app builder based on reactflow wherein users build their program logic on the reactflow editor
- Map of the App-Build Pipeline: Our unique characteristic USP, though, is our "Map of the App-Build Pipeline," which is a "two-way dashboard" visualization of the Android app-building process, whereupon users can drag their no-code modules onto the corresponding segments of the visual 'app map" build pipeline, and when the complement of required components is dragged onto the map to complete an app build, our app triggers the generation by providing a script to automate an android studio CLI build of their app + library import/download scripts + their reactflow -> translated into kotlin + build files
- Interactive Configuration: begins with an Interactive Configuration: A tabbed interface with the initial/primary view/tab being a traditional forms view; another tab with a wizard step-wise multi-part form interface; and a third tab with a conversational UI using a step-by-step dialectical exploratrory approach to gather user requirements for their Android AI app, clarifying AI functionality, desired features, and platform specifics. Also, if the user submits a form missing information that would be helpful to know, then it can ask if the user would like to clarify through a few questions and flip to the dialectic exploratory mode.
- Framework Generation: Leveraging a generative AI tool to formulate a Termux-Kotlin framework based on user inputs, integrating relevant AI libraries (like TensorFlow Lite or PyTorch Mobile) tailored to the app's functionality. If the user's app does not need local inference in termux, then it can function as a regular no-code/low-code app builder with a visual drag and drop build dashboard/pipeline.
- Reactflow Editor: No-/low-code reactflow-based editor to build the app
- Build Dashboard: This can be invoked at any time by clicking on a little flowchart icon button: it pops up a modal featuring a visual schematic of the Android kotlin build process itself, realized as a 'two-way dashboard/control panel' that users can drag components they built into the corresponding view on the dash/control panel to actually carry out that part of the build so that the tool can actually build the app via the android studio CLI scripting on the user end (the tool provides the project build files, which includes scripting to use the android studio CLI in its pipeline, that users manipulate by dragging and dropping their representations of their modular components onto a visual "map" representation of the android build process
- Visual Architecture: A visual representation (such as a flowchart or a component diagram) illustrating the app's architecture, data flow, and the integration of AI modules.
- Build Documentation: Detailed build notes providing step-by-step instructions on setting up the Termux environment, compiling the Kotlin code, and deploying the AI model. Notes specifically on the Google Play store policy requirements that may intersect with the architecture in question such that the user may make design decisions sufficiently early in the process.
- Architecture Pattern Suggestions: Display of suggested architecture patterns to implement in their code base (e.g. MVVM or Clean Architecture) and a workflow visualization of a sample tech stack template it would produce
- Theming Settings: Theming settings: a toggle for light and dark and a dropdown for Brutalist, Skeuomorphic, Glassmorphic, Neumorphic, Retro

## Style Guidelines:

- Primary color: Deep Indigo (#667eea) to convey intelligence and technical expertise.
- Background color: Light gray (#f7f7fa) to maintain a professional and clean appearance.
- Accent color: Electric Violet (#825FF7) used for interactive elements and highlights.
- Clean, modern sans-serif fonts for code snippets and user interface elements, focusing on readability.
- Use minimalist line icons to represent different AI functions and architectural components.
- Modular layout with clear divisions for input forms, visual architecture, and build notes to improve user flow.