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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {[
            { title: "On Rent", count: "6" },
            { title: "In Store", count: "14" },
            { title: "Rented Today", count: "6" },
            { title: "Returned Today", count: "6" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-emiru-black text-white rounded-xl p-4 flex items-center justify-between">
              <div className="bg-white rounded-lg p-3 shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <span className="text-xs text-white/80">{stat.title}</span>
                <span className="text-4xl font-bold mt-1">{stat.count}</span>
              </div>
              <div className="flex flex-col gap-1 text-[10px] items-end justify-center">
                <div className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> 2</div>
                <div className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> 1</div>
                <div className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg> 1</div>
                <div className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> 1</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-y-6 gap-x-2">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center gap-1.5">
              <div className="w-[72px] h-[72px] bg-emiru-black rounded-[14px] flex flex-col items-center justify-center">
                <span className="text-[28px] font-bold text-white leading-none">
                  {product.quantity}
                </span>
              </div>
              <span className="text-[9px] text-foreground text-center font-bold px-1 whitespace-nowrap overflow-hidden text-ellipsis w-full">
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
