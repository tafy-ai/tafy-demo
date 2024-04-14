"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import useUpdateRecipe from "../../actions/useUpdateRecipe";
import { RecipeModel } from "@/app/types";

export interface RecipeProps {
  recipe: RecipeModel;
  partialUpdateRecipe: (partialRecipe: Partial<RecipeModel>) => void;
}

export const Recipe = (props: RecipeProps) => {
  const backgroundImage =
    'url("https://source.unsplash.com/featured/?' +
    encodeURIComponent(props.recipe.backgroundImageDescription) +
    '")';

  /**
   * This action allows the Copilot to update the current recipe.
   */
  useUpdateRecipe({ partialUpdateRecipe: props.partialUpdateRecipe });

  return (
    <div className="w-full h-full flex flex-row bg-white">
      <div className="flex-grow h-full flex flex-col" style={{flex: "2"}}>
        <RecipeContent
          content={props.recipe.content}
          onChange={(newContent) => {
            props.partialUpdateRecipe({ content: newContent });
          }}
        />
        <RecipeSpeakerNotes
          spokenNarration={props.recipe.spokenNarration}
          onChange={(newSpokenNarration) => {
            props.partialUpdateRecipe({ spokenNarration: newSpokenNarration });
          }}
        />
      </div>
      <RecipeImage backgroundImage={backgroundImage} />
    </div>
  );
};

function RecipeImage({ backgroundImage }: { backgroundImage: string }) {
  return (
    <div
      className="flex-grow h-full bg-slate-200"
      style={{
        flex: "1",
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

interface SpeakerNotesProps {
  spokenNarration: string;
  onChange: (newSpokenNarration: string) => void;
}

function RecipeSpeakerNotes({ spokenNarration, onChange }: SpeakerNotesProps) {
  return (
    <div className="bg-gray-200 relative h-20 flex flex-col">
      <textarea
        className="w-full h-full bg-transparent p-2 text-base"
        style={{
          border: "none",
          outline: "none",
          lineHeight: "1.5",
          resize: "none",
        }}
        placeholder="Speaker notes..."
        value={spokenNarration}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

interface RecipeContentProps {
  content: string;
  onChange: (newContent: string) => void;
}

function RecipeContent({ content, onChange }: RecipeContentProps) {
  return (
    <textarea
      className="flex-1 w-full text-gray-800 p-4 px-10 font-bold flex items-center line-clamp-6"
      style={{
        border: "none",
        outline: "none",
        resize: "none",
        fontSize: "2vw",
      }}
      value={content}
      placeholder="Recipe content..."
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
