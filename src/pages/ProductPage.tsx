import { useState, useRef, useCallback } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { MOCK_PRODUCTS, Product } from "@/lib/types";

const HoldButton = ({
  direction,
  onQuantityChange,
  disabled,
  label,
}: {
  direction: "inc" | "dec";
  onQuantityChange: (delta: number) => void;
  disabled?: boolean;
  label: string;
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const delta = direction === "inc" ? 1 : -1;

  const startHold = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        onQuantityChange(delta);
      }, 80);
    }, 800);
  }, [disabled, delta, onQuantityChange]);

  const endHold = useCallback(
    (didFire: boolean) => {
      const wasRapid = !!intervalRef.current;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      timerRef.current = null;
      intervalRef.current = null;
      if (!wasRapid && didFire && !disabled) {
        onQuantityChange(delta);
      }
    },
    [disabled, delta, onQuantityChange],
  );

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onMouseDown={startHold}
      onMouseUp={() => endHold(true)}
      onMouseLeave={() => endHold(false)}
      onTouchStart={(e) => {
        e.preventDefault();
        startHold();
      }}
      onTouchEnd={() => endHold(true)}
      className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-35 disabled:cursor-not-allowed select-none"
    >
      <span className="text-base leading-none font-light">
        {direction === "inc" ? "+" : "−"}
      </span>
    </button>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product,
      ),
    );
  }, []);

  return (
    <AppLayout>
      <div className="bg-card rounded-xl p-6">
        <h1 className="text-4xl mb-6">
          <span className="font-bold text-foreground">Product</span>
          <span className="font-bold text-primary">View</span>
        </h1>

        <div className="grid grid-cols-8 gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square border-2 border-border rounded-2xl bg-card hover:shadow-md transition-shadow p-3 flex flex-col items-center justify-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  {product.quantity}
                </span>
                <div className="inline-flex items-center rounded-full border border-border bg-muted/50 p-1 shadow-sm">
                  <HoldButton
                    direction="dec"
                    onQuantityChange={(d) => updateQuantity(product.id, d)}
                    disabled={product.quantity === 0}
                    label={`Decrease ${product.name}`}
                  />
                  <div className="w-px h-5 bg-border/70" />
                  <HoldButton
                    direction="inc"
                    onQuantityChange={(d) => updateQuantity(product.id, d)}
                    label={`Increase ${product.name}`}
                  />
                </div>
              </div>
              <span className="text-xs text-foreground text-center font-medium leading-tight">
                {product.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ProductPage;
