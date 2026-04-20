import { Button } from "@/shared/components/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-md text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-4 text-3xl font-bold">Order Confirmed!</h1>
      <p className="mt-2 text-gray-600">
        Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
      </p>
      <div className="mt-8 flex gap-3 justify-center">
        <Link href="/dashboard/orders">
          <Button>View Orders</Button>
        </Link>
        <Link href="/products">
          <Button variant="secondary">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
