import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+919329028062';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    "Hello Mahima! I'm interested in a custom resin art creation from Resin Artwork Creations."
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-20 md:bottom-6 left-5 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        title="Chat with Mahima on WhatsApp"
        aria-label="Chat with Mahima on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-200 rounded-full" />
        </div>
        <div className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-[11px] uppercase tracking-wider text-emerald-100 font-medium">Bespoke Inquiries</span>
          <span className="text-xs font-semibold">WhatsApp Mahima</span>
        </div>
      </a>
    </aside>
  );
};

export default WhatsAppFloat;
