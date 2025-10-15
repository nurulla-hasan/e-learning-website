
import { useAddToBookmarkMutation, useRemoveFromBookmarkMutation } from "@/redux/feature/course/courseApi";
import { useEffect, useState } from "react";

interface UseFavoriteReturn {
  isFavorite: boolean;
  onFavoriteToggle: (id: string | number) => Promise<void>;
}

const useFavorite = (initialState: boolean): UseFavoriteReturn => {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialState);
  const [addToBookmarkMutation] = useAddToBookmarkMutation();
  const [removeFromBookmarkMutation] = useRemoveFromBookmarkMutation();

  useEffect(() => {
    setIsFavorite(initialState || false);
  }, [initialState]);

  const onFavoriteToggle = async (id: string | number): Promise<void> => {
    setIsFavorite(!isFavorite);
    try {
      if (isFavorite) {
        await removeFromBookmarkMutation(id);
      } else {
        await addToBookmarkMutation({courseId: id});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { isFavorite, onFavoriteToggle };
};

export default useFavorite;