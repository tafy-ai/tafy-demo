import { RecipeModel } from "@/app/types";
import { ActionButton } from "./ActionButton";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteRecipeButtonProps {
  currentRecipeIndex: number;
  setCurrentRecipeIndex: (fn: (i: number) => number) => void;
  recipes: RecipeModel[];
  setRecipes: (fn: (recipes: RecipeModel[]) => RecipeModel[]) => void;
}

export function DeleteRecipeButton({
  currentRecipeIndex,
  setCurrentRecipeIndex,
  recipes,
  setRecipes,
}: DeleteRecipeButtonProps) {
  return (
    <ActionButton
      disabled={recipes.length == 1}
      onClick={() => {
        // delete the current slide
        setRecipes((recipes) => [
          ...recipes.slice(0, currentRecipeIndex),
          ...recipes.slice(currentRecipeIndex + 1),
        ]);
        setCurrentRecipeIndex((i) => 0);
      }}
    >
      <TrashIcon className="h-5 w-5" />
    </ActionButton>
  );
}
