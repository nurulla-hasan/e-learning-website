// import { useToggleFavoriteRecipeMutation } from "@/redux/feature/recipe/recipeApi";
import { useEffect, useState } from "react";

interface UseFavoriteReturn {
  isFavorite: boolean;
  onFavoriteToggle: (id: string | number) => Promise<void>;
}

const useFavorite = (initialState: boolean): UseFavoriteReturn => {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialState);
//   const [toggleFavoriteRecipe] = useToggleFavoriteRecipeMutation(isFavorite);

  useEffect(() => {
    setIsFavorite(initialState || false);
  }, [initialState]);

  const onFavoriteToggle = async (id: string | number): Promise<void> => {
    setIsFavorite(!isFavorite);
    try {
    //   await toggleFavoriteRecipe(id);
    } catch (error) {
      console.log(error);
    }
  };

  return { isFavorite, onFavoriteToggle };
};

export default useFavorite;