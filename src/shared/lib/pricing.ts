export function formatCurrency(amount: number | string): string {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

export function calculateTax(amount: number, rate = 0.08): number {
  return Math.round(amount * rate * 100) / 100;
}

export function calculateShipping(total: number): number {
  if (total >= 100) return 0;
  return 9.99;
}

export function calculateTotal(items: Array<{ price: string | number; quantity: number }>): number {
  const subtotal = items.reduce((sum, item) => {
    const price = typeof item.price === "string" ? Number.parseFloat(item.price) : item.price;
    return sum + price * item.quantity;
  }, 0);
  return Math.round(subtotal * 100) / 100;
}
