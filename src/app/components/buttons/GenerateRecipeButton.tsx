import { CopilotContextParams, CopilotTask } from "@copilotkit/react-core";
import { useState } from "react";
import { ActionButton } from "./ActionButton";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface GenerateRecipeButtonProps {
  context: CopilotContextParams;
}

export function GenerateRecipeButton({ context }: GenerateRecipeButtonProps) {
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  return (
    <ActionButton
      inProgress={isGeneratingRecipe}
      onClick={async () => {
        try {
          let recipeContent = prompt("What should the new recipe be?");
          if (recipeContent === null) {
            return;
          }
          setIsGeneratingRecipe(true);
          const generateRecipeTask = new CopilotTask({
            instructions:
              "Make a new recipe given this user input: " +
              recipeContent +
              "\n DO NOT carry out research",
          });
          await generateRecipeTask.run(context);
        } finally {
          setIsGeneratingRecipe(false);
        }
      }}
    >
      <SparklesIcon className={"h-5 w-5"} />
    </ActionButton>
  );
}
