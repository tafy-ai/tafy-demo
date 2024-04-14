"use client";
import { useMakeCopilotReadable } from "@copilotkit/react-core";
import { useCallback, useMemo, useState } from "react";
import { Recipe } from "./Recipe";
import { Header } from "./Header";
import useAppendRecipe from "../../actions/useAppendRecipe";
import { RecipeModel } from "@/app/types";

interface PlannerProps {
  performResearch: boolean;
  setPerformResearch: (fn: (b: boolean) => boolean) => void;
}

export const Planner = ({
  performResearch,
  setPerformResearch,
}: PlannerProps) => {
  const [recipes, setRecipes] = useState<RecipeModel[]>([
    {
      content: "This is the first recipe.",
      backgroundImageDescription: "hello",
      spokenNarration: "This is the first recipe. Welcome to our meal planner!",
    },
  ]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const currentRecipe = useMemo(
    () => recipes[currentRecipeIndex],
    [recipes, currentRecipeIndex]
  );

  /**
   * This makes all recipes available to the Copilot.
   */
  useMakeCopilotReadable("These are all the recipes: " + JSON.stringify(recipes));

  /**
   * This makes the current recipe available to the Copilot.
   */
  useMakeCopilotReadable(
    "This is the current recipe: " + JSON.stringify(currentRecipe)
  );

  /**
   * This action allows the Copilot to append a new recipe to the meal plan.
   */
  useAppendRecipe({
    setRecipes,
    setCurrentRecipeIndex,
    recipes,
  });

  const updatecurrentRecipe = useCallback(
    (partialRecipe: Partial<RecipeModel>) => {
      setRecipes((recipes) => [
        ...recipes.slice(0, currentRecipeIndex),
        { ...recipes[currentRecipeIndex], ...partialRecipe },
        ...recipes.slice(currentRecipeIndex + 1),
      ]);
    },
    [currentRecipeIndex, setRecipes]
  );

  return (
    <div
      style={{
        height: `100vh`,
      }}
      className="flex flex-col"
    >
      <Header
        currentRecipeIndex={currentRecipeIndex}
        setCurrentRecipeIndex={setCurrentRecipeIndex}
        recipes={recipes}
        setRecipes={setRecipes}
        performResearch={performResearch}
        setPerformResearch={setPerformResearch}
      />
      <div
        className="flex items-center justify-center flex-1"
        style={{ backgroundColor: "#414247", overflow: "auto" }}
      >
        <div
          className="aspect-ratio-box bg-white flex shadow-2xl"
          style={{ margin: "5rem", maxHeight: "70vh" }}
        >
          <Recipe recipe={currentRecipe} partialUpdateRecipe={updatecurrentRecipe} />
        </div>
      </div>
    </div>
  );
};
