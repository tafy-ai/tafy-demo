import { useCopilotAction } from "@copilotkit/react-core";
import { RecipeModel } from "../types";
import { RecipePreview } from "../components/misc/RecipePreview";

interface UpdateRecipeParams {
  partialUpdateRecipe: (partialRecipe: Partial<RecipeModel>) => void;
}

export default function useUpdateRecipe({
  partialUpdateRecipe,
}: UpdateRecipeParams) {
  useCopilotAction({
    name: "updateRecipe",
    description: "Update the current recipe.",
    parameters: [
      {
        name: "content",
        description:
          "The content of the recipe should generally consist of a list of ingredients and a set of instructions.",
      },
      {
        name: "backgroundImageDescription",
        description:
          "What to display in the background of the recipe. For example, 'lettuce', 'herbs', 'spices', 'table', etc.",
      },
      {
        name: "spokenNarration",
        description:
          "The spoken narration for the recipe. This is what the user will hear when the recipe is shown.",
      },
    ],
    handler: async ({
      content,
      backgroundImageDescription,
      spokenNarration,
    }) => {
      partialUpdateRecipe({
        content,
        backgroundImageDescription,
        spokenNarration,
      });
    },
    render: (props) => {
      return (
        <RecipePreview {...props.args} done={props.status === "complete"} />
      );
    },
  });
}
