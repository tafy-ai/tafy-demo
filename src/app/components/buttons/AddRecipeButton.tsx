import { RecipeModel } from "@/app/types";
import { ActionButton } from "./ActionButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface AddRecipeButtonProps {
  currentRecipeIndex: number;
  setCurrentRecipeIndex: (fn: (i: number) => number) => void;
  setRecipes: (fn: (recipes: RecipeModel[]) => RecipeModel[]) => void;
}

export function AddRecipeButton({
  currentRecipeIndex,
  setCurrentRecipeIndex,
  setRecipes,
}: AddRecipeButtonProps) {
  return (
    <ActionButton
      onClick={() => {
        const newRecipe: RecipeModel = {
          content: "",
          backgroundImageDescription: "random",
          spokenNarration: "",
        };
        setRecipes((recipes) => [
          ...recipes.slice(0, currentRecipeIndex + 1),
          newRecipe,
          ...recipes.slice(currentRecipeIndex + 1),
        ]);
        setCurrentRecipeIndex((i) => i + 1);
      }}
    >
      <PlusCircleIcon className="h-5 w-5" />
    </ActionButton>
  );
}
