import { useState, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { MOCK_PRODUCTS, Product } from "@/lib/types";
import { Calendar, Camera, Lightbulb, Volume2, Wrench } from "lucide-react";

const categoryIcons: Record<string, typeof Camera> = {
  Camera: Camera,
  Lighting: Lightbulb,
  Sound: Volume2,
  Gear: Wrench,
};

const ProductPage = () => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);

  // Calculate stats by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      const cat = p.category || "Other";
      counts[cat] = (counts[cat] || 0) + p.quantity;
    });
    return counts;
  }, [products]);

  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);

  const statCards = [
    { label: "On Rent", value: 6, icon: Calendar },
    { label: "In Store", value: totalItems, icon: Calendar },
    { label: "Rented Today", value: 6, icon: Calendar },
    { label: "Returned Today", value: 6, icon: Calendar },
  ];

  return (
    <AppLayout>
      <div className="bg-card rounded-xl p-6">
        <h1 className="text-4xl mb-6">
          <span className="font-bold text-foreground">Product</span>
          <span className="font-bold text-primary">View</span>
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border-2 border-border p-4 flex items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <card.icon size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
                  <p className="text-3xl font-bold text-foreground">{card.value}</p>
                </div>
              </div>
              <div className="ml-auto flex flex-col gap-0.5 text-[10px] text-muted-foreground">
                {Object.entries(categoryCounts).slice(0, 4).map(([cat, count]) => {
                  const Icon = categoryIcons[cat] || Camera;
                  return (
                    <div key={cat} className="flex items-center gap-1">
                      <Icon size={10} />
                      <span>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-8 gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square border-2 border-border rounded-2xl bg-card hover:shadow-md transition-shadow p-3 flex flex-col items-center justify-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  {product.quantity}
                </span>
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
