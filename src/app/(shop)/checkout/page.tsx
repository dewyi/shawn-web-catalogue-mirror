"use client";

import { CartSummary } from "@/modules/cart/components/cart-summary";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { addressSchema } from "@/shared/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

type AddressFormValues = {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
};

export default function CheckoutPage() {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressLine2: "",
      phone: "",
      country: "US",
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Checkout failed");
      }

      const result = await res.json();
      window.location.href = result.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
        {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name" error={errors.name?.message} {...register("name")} />
          <Input
            label="Address Line 1"
            error={errors.addressLine1?.message}
            {...register("addressLine1")}
          />
          <Input label="Address Line 2 (optional)" {...register("addressLine2")} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="City" error={errors.city?.message} {...register("city")} />
            <Input label="State" error={errors.state?.message} {...register("state")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="ZIP Code" error={errors.zip?.message} {...register("zip")} />
            <Input label="Country" error={errors.country?.message} {...register("country")} />
          </div>
          <Input label="Phone (optional)" {...register("phone")} />
          <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            Continue to Payment
          </Button>
        </form>
      </div>
      <div>
        <CartSummary />
      </div>
    </div>
  );
}
