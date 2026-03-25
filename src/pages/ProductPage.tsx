import AppLayout from "@/components/layout/AppLayout";
import { MOCK_PRODUCTS } from "@/lib/types";

const ProductPage = () => {
  return (
    <AppLayout>
      <div className="bg-card rounded-xl p-6">
        <h1 className="text-4xl mb-6">
          <span className="font-bold text-foreground">Product</span>
          <span className="font-bold text-primary">View</span>
        </h1>
        <div className="grid grid-cols-8 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square border-2 border-border rounded-2xl flex items-center justify-center bg-card hover:shadow-md transition-shadow">
                <span className="text-3xl font-bold text-foreground">{product.quantity}</span>
              </div>
              <span className="text-xs text-foreground text-center font-medium leading-tight">{product.name}</span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ProductPage;
