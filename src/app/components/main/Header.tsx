import clsx from "clsx";
import { redirect } from 'next/navigation';
import { RecipeModel } from "@/app/types";
import { useMemo } from "react";
import { useCopilotContext } from "@copilotkit/react-core";
import { RecipeNumberIndicator } from "../misc/RecipeNumberIndicator";
import { GenerateRecipeButton } from "../buttons/GenerateRecipeButton";
import { SpeakCurrentRecipeButton } from "../buttons/SpeakCurrentRecipeButton";
import { DeleteRecipeButton } from "../buttons/DeleteRecipeButton";
import { LogoButton } from "../buttons/LogoButton";
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

        {/* Logo */}
        <LogoButton onClick={() => redirect("/", 'replace')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 375 375" class="mx-auto h-20 w-auto"><path fill="#fff" d="M96.196 183.677c-7.469 20.539-19.23 30.433-30.058 30.433-6.723 0-10.829-4.105-10.829-9.148 0-1.305.375-2.801.747-4.106l18.296-52.094H86.49c9.524 0 14.563-6.718 14.563-12.882 0-4.852-3.172-9.149-10.27-9.149H82.38l12.512-36.406c.37-1.305.558-2.426.558-3.547 0-6.906-4.855-12.508-13.07-12.508-6.16 0-11.387 4.293-13.63 10.828l-14.933 41.633h-7.843c-10.082 0-14.375 6.352-14.375 12.324 0 5.227 3.171 9.707 8.214 9.707h6.16L30.29 193.76v-.184c-1.492 4.48-2.238 8.586-2.238 12.508 0 19.043 16.988 30.246 36.218 30.246 23.899 0 43.875-17.738 54.52-48.356.371-1.308.746-2.613.746-3.734 0-5.602-5.414-9.148-11.203-9.148-4.668 0-9.895 2.613-12.137 8.586Zm0 0"></path><path fill="#fff" d="M207.658 173.223c-5.226 0-11.015 3.172-13.254 10.27-7.28 22.965-19.043 30.617-27.445 30.617-3.176 0-5.043-1.68-5.043-4.668 0-1.492.375-3.36.934-5.414l20.91-60.492c.75-2.238 1.121-4.293 1.121-6.16 0-8.215-6.719-12.508-13.629-12.508-5.226 0-10.64 2.426-13.629 7.094-3.922-2.43-11.203-5.23-20.722-5.23-12.325 0-25.766 6.722-30.81 21.097l-17.55 50.226c-1.121 3.36-1.867 6.72-1.867 10.082 0 15.497 12.512 28.192 28.941 28.192 8.774 0 17.735-3.922 24.645-10.082 5.973 8.59 19.23 10.082 24.832 10.082 15.496 0 36.219-7.84 48.168-38.086 2.613-7.285 4.668-11.95 4.668-15.313 0-6.347-4.856-9.707-10.27-9.707Zm-61.61-1.867-8.964 27.82c-3.918 12.133-11.016 14.934-14.933 14.934-4.11 0-6.165-2.613-6.165-6.906 0-2.43.563-4.668 1.122-6.348l11.949-37.527c3.547-11.39 8.777-12.883 11.761-12.883 3.547 0 7.47 3.547 7.47 9.895 0 2.8-.747 6.347-2.24 11.015Zm0 0"></path><path fill="#fff" d="M206.912 148.95 157.06 289.352c-.746 2.055-1.117 4.11-1.117 5.977 0 7.84 6.531 12.883 13.442 12.883 5.789 0 11.761-3.547 14.75-12.325l51.53-146.937 13.63-.188c8.773-.183 12.882-6.53 12.882-11.949 0-5.226-3.921-10.082-10.828-10.082h-7.656L254.15 97.42c1.492-4.48 5.04-7.282 8.215-7.282 3.918 0 5.414 2.243 5.414 5.415 0 1.12-.187 2.242-.562 3.55-.934 1.868-1.305 3.547-1.305 5.227 0 6.535 6.348 11.016 12.883 11.016 5.972 0 12.132-3.735 14.187-12.883.563-2.614.934-5.043.934-7.47 0-16.429-12.696-28.753-28.938-28.753-15.87 0-31.742 8.965-38.648 28.379l-11.39 32.113h-4.852c-11.578 0-16.43 6.535-16.43 12.512 0 5.227 3.547 9.707 9.332 9.707Zm0 0"></path><path fill="#fff" d="m274.126 204.216 20.722-58.813c.75-2.055 1.121-3.922 1.121-5.789 0-7.652-6.722-12.883-13.629-12.883-5.226 0-10.828 3.176-13.44 10.645l-22.595 64.226a30.244 30.244 0 0 0-1.867 10.453c0 12.7 8.965 21.848 21.098 24.274-22.778 5.043-45.367 14.375-45.367 37.34 0 18.113 16.8 30.062 35.097 30.062 18.485 0 35.848-9.898 43.692-31.554 2.613-7.844 5.601-16.06 8.402-23.711 26.7-8.403 54.145-22.965 67.027-62.172.559-1.496.746-2.989.746-4.297 0-6.348-4.855-10.082-10.457-10.082-5.039 0-10.453 3.176-13.07 10.457-6.906 19.043-19.414 30.246-33.98 37.715l26.328-75.989c.558-1.683.746-3.175.746-4.484 0-7.652-6.723-12.883-13.629-12.883-5.227 0-10.828 3.176-13.445 10.645l-21.47 63.105c-5.976 10.082-12.507 13.817-17.55 13.817-3.36 0-5.414-2.055-5.414-5.414 0-1.309.375-2.989.934-4.668Zm-.934 52.836-4.48 12.699c-2.614 6.906-8.403 10.453-14.004 10.453-4.293 0-6.16-2.613-6.16-5.973 0-1.12.187-2.613.746-3.922 2.613-6.535 11.761-10.082 23.898-13.257Zm0 0"></path></svg>
        </LogoButton>

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
