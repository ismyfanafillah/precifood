import { useCallback, useRef, useState } from "react";

import { Button, Dialog } from "@mui/material";

import OrderDialogContent from "@/components/order/OrderDialogContent";
import { Order } from "@/interfaces/order";
import { getDataAuthenticated } from "@/utils/http";

export default function InfoOrderDialog({
  id,
  onRemove,
}: {
  id: number;
  onRemove: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const orderFetched = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      if (orderFetched.current) return;
      const data = await getDataAuthenticated(`/consumers/orders/${id}`);
      setOrder(data);
      orderFetched.current = true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [id]);

  const openInfoOrderDialog = () => {
    setOpen(true);
    fetchData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onRemove(id);
    handleClose();
  };

  return (
    <div>
      <Button
        className="rounded-3xl"
        size="small"
        variant="contained"
        onClick={openInfoOrderDialog}
      >
        Lihat
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {order ? (
          <OrderDialogContent order={order} onDelete={handleDelete} />
        ) : null}
      </Dialog>
    </div>
  );
}
