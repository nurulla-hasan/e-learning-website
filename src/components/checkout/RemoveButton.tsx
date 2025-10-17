import { Button } from "@/components/ui/button";
import { useRemoveFromCheckoutMutation } from "@/redux/feature/checkout/checkoutApi";
interface RemoveButtonProps {
    id: string;
}

const RemoveButton = ({ id }: RemoveButtonProps) => {
      const [removeFromCheckout, { isLoading: isDeleting }] = useRemoveFromCheckoutMutation();
  return (
    <Button
      variant="outline"
      loading={isDeleting}
      size="sm"
      className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
      onClick={() => removeFromCheckout(id)}
      disabled={isDeleting}
    >
      Remove
    </Button>
  );
};

export default RemoveButton;
