"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "./styles.css";
import { Planner } from "./components/main/Planner";
import { useState } from "react";

export default function AIPlanner() {
  const [performResearch, setPerformResearch] = useState(false);

  return (
    <CopilotKit url="/api/copilotkit/">
      <CopilotSidebar
        instructions={
          "Help the user create and edit a delicious meal plan." +
          (!performResearch
            ? " No research is needed. Do not perform any research."
            : " Perform research on the recipe.")
        }
        defaultOpen={true}
        labels={{
          title: "Planner Copilot",
          initial:
            "Hi you! 👋 I can help you create a meal plan on any recipes.",
        }}
        clickOutsideToClose={false}
      >
        <Planner
          performResearch={performResearch}
          setPerformResearch={setPerformResearch}
        />
      </CopilotSidebar>
    </CopilotKit>
  );
}
