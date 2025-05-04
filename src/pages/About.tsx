
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Info, Mail, Phone } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">About HomeGoods</h1>
      
      <div className="max-w-3xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-sage flex items-center gap-2">
            <Info className="h-5 w-5" />
            Our Story
          </h2>
          <p className="text-muted-foreground">
            HomeGoods offers a carefully curated collection of high-quality home products designed to enhance your living spaces. 
            From elegant furniture to stylish decor, our products blend functionality with aesthetic appeal to transform your house into a home.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-sage">How It Works</h2>
          <div className="grid gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-1">1. Browse Products</h3>
              <p className="text-sm text-muted-foreground">Explore our collection of home products across various categories.</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-1">2. Add to Cart</h3>
              <p className="text-sm text-muted-foreground">Select items you love and add them to your shopping cart.</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-1">3. Checkout via WhatsApp</h3>
              <p className="text-sm text-muted-foreground">Complete your purchase by sending your order details via WhatsApp for a personalized shopping experience.</p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-sage flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Us
          </h2>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-sage" />
              <span>+91 8886113839</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-sage" />
              <span>support@homegoods.com</span>
            </p>
          </div>
        </section>

        <div className="flex justify-center pt-4">
          <Link to="/">
            <Button variant="default" className="bg-sage hover:bg-sage/90">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
