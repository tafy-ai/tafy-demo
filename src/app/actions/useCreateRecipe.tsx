import { useCopilotAction } from "@copilotkit/react-core";
import { RecipeModel } from "../types";
import { RecipePreview } from "../components/misc/RecipePreview";

interface AppendRecipeParams {
  setRecipes: (fn: (recipes: RecipeModel[]) => RecipeModel[]) => void;
  setCurrentRecipeIndex: (fn: (i: number) => number) => void;
  recipes: RecipeModel[];
}

export default function useAppendRecipe({
  setRecipes,
  setCurrentRecipeIndex,
  recipes,
}: AppendRecipeParams) {
  useCopilotAction({
    name: "appendRecipe",
    description:
      "Add a recipe after all the existing recipes. Call this function multiple times to add multiple recipes.",
    parameters: [
      {
        name: "content",
        description:
          "The content of the recipe. MUST consist of a title, then an empty newline, then a few bullet points. Always between 1-3 bullet points - no more, no less."
      },
      {
        name: "backgroundImageDescription",
        description:
          "What to display in the background of the recipe. For example, 'lettuce', 'spices', 'herbs', etc.",
      },
      {
        name: "spokenNarration",
        description:
          "The text to read while presenting the recipe. Should be distinct from the recipe's content, " +
          "and can include additional context, references, etc. Will be read aloud as-is. " +
          "Should be a few sentences long, clear, and smooth to read." +
          "DO NOT include meta-commentary, such as 'in this recipe', 'we explore', etc.",
      },
    ],

    handler: async ({
      content,
      backgroundImageDescription,
      spokenNarration,
    }) => {
      const newRecipe: RecipeModel = {
        content,
        backgroundImageDescription,
        spokenNarration,
      };

      setRecipes((recipes) => [...recipes, newRecipe]);
      setCurrentRecipeIndex((i) => recipes.length);
    },
    render: (props) => {
      return (
        <RecipePreview {...props.args} done={props.status === "complete"} />
      );
    },
  });
}
