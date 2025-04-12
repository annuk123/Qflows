// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { motion } from "framer-motion";
// import { ScrollArea } from "@/components/ui/scroll-area";

// const rules = [
//   {
//     title: "🔍 Step-by-Step Code Execution",
//     description:
//       "Watch your code execute one line at a time. Each step highlights the executing line, current memory, heap, and event queue state.",
//   },
//   {
//     title: "🧠 Memory Viewer",
//     description:
//       "Visualize how variables are stored and updated. This section reflects all current variable values in memory.",
//   },
//   {
//     title: "📦 Heap Visualization",
//     description:
//       "Functions (like setTimeout callbacks) are stored in the heap. Understand closures and memory allocation.",
//   },
//   {
//     title: "📥 Event Queue",
//     description:
//       "Asynchronous tasks like setTimeout are added here. Track when callbacks are pushed and when they execute.",
//   },
//   {
//     title: "🧪 Supported JavaScript",
//     description:
//       "Supports basic JavaScript: variable declarations, binary expressions, setTimeout, function callbacks.",
//   },
//   {
//     title: "⚠️ Limitations",
//     description:
//       "Doesn’t simulate real-time execution or async callbacks. The event queue is visual only – actual execution not triggered.",
//   },
// ];

// export default function RuleBookPage() {
//   return (
//     <ScrollArea className="h-[calc(100vh-4rem)] p-6">
//       <motion.div
//         className="max-w-3xl mx-auto"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h1 className="text-4xl font-bold mb-2 text-center">📘 Rule Book</h1>
//         <p className="text-muted-foreground text-center mb-6">
//           A quick guide to understand and use the Code Visualizer efficiently.
//         </p>

//         <Separator className="my-4" />

//         <div className="grid gap-6">
//           {rules.map((rule, index) => (
//             <motion.div
//               key={index}
//               className="rounded-2xl shadow-md border bg-background p-4"
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Card>
//                 <CardContent className="p-4">
//                   <h2 className="text-xl font-semibold flex items-center gap-2">
//                     <Badge variant="outline" className="text-sm px-2">
//                       Step {index + 1}
//                     </Badge>
//                     {rule.title}
//                   </h2>
//                   <p className="text-muted-foreground mt-2">{rule.description}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </ScrollArea>
//   );
// }


"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

const rules = [
  {
    title: "💻 Write or Paste TypeScript Code",
    description:
      "Start by writing or pasting your TypeScript code into the editor. The visualizer supports variable declarations, function expressions, binary operations, and setTimeout callbacks.",
  },
  {
    title: "🧾 AST Viewer (Abstract Syntax Tree)",
    description:
      "As you type, the code is parsed into an AST (Abstract Syntax Tree) using `@typescript-eslint/typescript-estree`. This helps break down your code into its syntactic structure.",
  },
  {
    title: "🧠 Step-by-Step Execution",
    description:
      "Your code is executed virtually, one line at a time. Each step shows the executed line, current memory, event queue, and heap.",
  },
  {
    title: "🔍 Memory Tracking",
    description:
      "Every variable and its value is stored in the memory section. Watch how values change over time as your code progresses.",
  },
  {
    title: "📥 Event Queue Simulation",
    description:
      "Functions like `setTimeout` are tracked and added to the Event Queue. This visualizes how async operations are queued for later execution.",
  },
  {
    title: "📦 Heap Representation",
    description:
      "Heap stores references to functions and objects like callbacks. Each heap entry includes a unique ID and the function code.",
  },
  {
    title: "🎯 Error Highlighting",
    description:
      "If your code has parsing errors or syntax issues, they will be highlighted. Fix them to simulate and visualize properly.",
  },
  {
    title: "💡 Tip",
    description:
      "Only synchronous flow and `setTimeout`-based async simulation are supported for now. Support for promises, async/await, and loops will be added soon.",
  },
];

export default function TypeScriptVisualizerRuleBook() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)] p-6">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-center">
          📘 TypeScript Visualizer Rule Book
        </h1>
        <p className="text-muted-foreground text-center mb-6">
          Learn how to use the visualizer to explore and debug your TypeScript
          code.
        </p>

        <Separator className="my-4" />

        <div className="grid gap-6">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              className="rounded-2xl shadow-md border bg-background p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Badge variant="outline" className="text-sm px-2">
                      Step {index + 1}
                    </Badge>
                    {rule.title}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {rule.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </ScrollArea>
  );
}
