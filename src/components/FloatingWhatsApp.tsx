import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CartItem } from '../types';
import { createWhatsAppOrderUrl, WHATSAPP_PHONE_FORMATTED, WHATSAPP_PHONE_RAW } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  cart: CartItem[];
  cartTotal: number;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ cart, cartTotal }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const deliveryFee = cartTotal >= 500 ? 0 : 70;
  const targetUrl = createWhatsAppOrderUrl(cart, cartTotal, deliveryFee);

  return (
    <aside aria-label="Быстрый заказ через WhatsApp" className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsTooltipOpen(true)}
        onMouseLeave={() => setIsTooltipOpen(false)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer border border-emerald-400/30"
        aria-label="Приём заказов в WhatsApp"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-white/20 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
        </span>

        <span className="text-xs sm:text-sm font-extrabold whitespace-nowrap">
          Заказ в WhatsApp
        </span>

        {cart.length > 0 && (
          <span className="px-2 py-0.5 text-[11px] font-black bg-stone-900 text-amber-400 rounded-full tabular-nums">
            {cart.reduce((a, b) => a + b.quantity, 0)} шт
          </span>
        )}
      </a>

      {/* Tooltip on desktop */}
      {isTooltipOpen && (
        <div className="hidden sm:block absolute left-full ml-3 px-3.5 py-2 bg-stone-900/95 backdrop-blur-md text-white text-xs rounded-xl shadow-lg border border-stone-800 whitespace-nowrap animate-fade-in">
          <div className="font-bold text-emerald-400">Прямой приём заказов</div>
          <div className="text-[11px] text-stone-300 mt-0.5">
            {WHATSAPP_PHONE_FORMATTED} · оператор на связи
          </div>
        </div>
      )}
    </aside>
  );
};
