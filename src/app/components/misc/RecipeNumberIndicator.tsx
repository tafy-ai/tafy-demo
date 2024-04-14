interface RecipeNumberIndicatorProps {
  currentRecipeIndex: number;
  totalRecipes: number;
}

export function RecipeNumberIndicator({
  currentRecipeIndex,
  totalRecipes,
}: RecipeNumberIndicatorProps) {
  return (
    <div className="flex-1 items-center justify-center flex uppercase text-xs font-bold tracking-widest">
      <span className="mr-3">{RECIPES_ICON}</span>
      Recipe {currentRecipeIndex + 1} of {totalRecipes}
    </div>
  );
}

const RECIPES_ICON = (
  <svg
    width="10px"
    height="10px"
    viewBox="0 0 42 42"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <rect x="0" y="0" width="10" height="10" />
    <rect x="16" y="0" width="10" height="10" />
    <rect x="32" y="0" width="10" height="10" />
    <rect x="0" y="16" width="10" height="10" />
    <rect x="16" y="16" width="10" height="10" />
    <rect x="32" y="16" width="10" height="10" />
    <rect x="0" y="32" width="10" height="10" />
    <rect x="16" y="32" width="10" height="10" />
    <rect x="32" y="32" width="10" height="10" />
  </svg>
);
