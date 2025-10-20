import { Button } from "@/components/ui/button";
import { useRemoveFromCartMutation } from "@/redux/feature/cart/cartApi";
import { SuccessToast } from "@/lib/utils";

const RemoveButton = ({
  courseId,
}: {
  courseId: string;
}) => {

    const [removeFromCart, { isLoading }] =
    useRemoveFromCartMutation();

      const handleRemoveFromCart = async (id: string) => {
    try {
      await removeFromCart(id).unwrap();
      SuccessToast("Course removed from cart");
    } catch {
      // console.log(error);
    }
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full sm:w-auto text-sm"
      onClick={() => handleRemoveFromCart(courseId)}
      loading={isLoading}
    >
      Remove
    </Button>
  );
};

export default RemoveButton;
