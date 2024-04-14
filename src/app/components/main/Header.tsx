import clsx from "clsx";
import { RecipeModel } from "@/app/types";
import { useMemo } from "react";
import { useCopilotContext } from "@copilotkit/react-core";
import { RecipeNumberIndicator } from "../misc/RecipeNumberIndicator";
import { GenerateRecipeButton } from "../buttons/GenerateRecipeButton";
import { SpeakCurrentRecipeButton } from "../buttons/SpeakCurrentRecipeButton";
import { DeleteRecipeButton } from "../buttons/DeleteRecipeButton";
import { NavButton } from "../buttons/NavButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PerformResearchSwitch } from "../buttons/PerformResearchSwitch";
import { AddRecipeButton } from "../buttons/AddRecipeButton";

interface HeaderProps {
  currentRecipeIndex: number;
  setCurrentRecipeIndex: (fn: (i: number) => number) => void;
  recipes: RecipeModel[];
  setRecipes: (fn: (recipes: RecipeModel[]) => RecipeModel[]) => void;
  performResearch: boolean;
  setPerformResearch: (fn: (b: boolean) => boolean) => void;
}

export function Header({
  currentRecipeIndex,
  setCurrentRecipeIndex,
  recipes,
  setRecipes,
  performResearch,
  setPerformResearch,
}: HeaderProps) {
  const currentRecipe = useMemo(
    () => recipes[currentRecipeIndex],
    [recipes, currentRecipeIndex]
  );

  /**
   * We need to get the context here to run a Copilot task for generating a recipe
   **/
  const context = useCopilotContext();

  return (
    <header className={clsx("bg-customBlack text-white items-center flex p-4")}>
      <div className="flex-0 flex space-x-1">
        {/* Back */}
        <NavButton
          disabled={currentRecipeIndex == 0}
          onClick={() => setCurrentRecipeIndex((i) => i - 1)}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </NavButton>

        {/* Forward */}
        <NavButton
          disabled={currentRecipeIndex == recipes.length - 1}
          onClick={() => setCurrentRecipeIndex((i) => i + 1)}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </NavButton>

        {/* Perform Research */}
        <PerformResearchSwitch
          isEnabled={performResearch}
          setIsEnabled={setPerformResearch}
        />
      </div>

      <RecipeNumberIndicator
        {...{ currentRecipeIndex, totalRecipes: recipes.length }}
      />

      <div className="flex-0 flex space-x-1">
        <AddRecipeButton
          {...{ currentRecipeIndex, setCurrentRecipeIndex, setRecipes }}
        />

        <GenerateRecipeButton context={context} />

        <SpeakCurrentRecipeButton
          spokenNarration={currentRecipe.spokenNarration}
        />

        <DeleteRecipeButton
          {...{ currentRecipeIndex, setCurrentRecipeIndex, recipes, setRecipes }}
        />
      </div>
    </header>
  );
}
