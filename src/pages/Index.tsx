
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';

const Index: React.FC = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || selectedCategory === 'All' || 
                           product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-12 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sage/90 to-sage/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1581093649669-91f1eba2f144?q=80&w=1920" 
          alt="Modern home interior" 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Elevate Your Space
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
            Discover unique home goods crafted for modern living.
          </p>
          <div className="relative max-w-md">
            <Input 
              type="text" 
              placeholder="Search products..."
              className="pl-10 bg-white/90 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      {/* Filters and Products */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <p className="text-muted-foreground mr-2">Filter by:</p>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category || (category === 'All' && selectedCategory === null) ? "default" : "outline"}
            size="sm"
            className={selectedCategory === category || (category === 'All' && selectedCategory === null) 
              ? "bg-sage hover:bg-sage/90" 
              : ""}
            onClick={() => setSelectedCategory(category === 'All' ? null : category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
