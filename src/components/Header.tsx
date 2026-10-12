import React, { useState } from 'react';
import {
  ShoppingBag,
  Flame,
  MessageCircle,
  CreditCard,
  MapPin,
  Clock,
  Menu as MenuIcon,
  X,
  Star,
} from 'lucide-react';
import { WHATSAPP_PHONE_RAW, WHATSAPP_PHONE_FORMATTED } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
  hasActiveOrder: boolean;
  onOpenTracker: () => void;
  onOpenZones: () => void;
  onOpenPaymentRequisites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onNavigateSection,
  hasActiveOrder,
  onOpenTracker,
  onOpenZones,
  onOpenPaymentRequisites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню навигации"
            className="md:hidden w-9 h-9 rounded-lg text-stone-700 hover:bg-stone-100 flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-2xl font-black tracking-tight text-stone-900 whitespace-nowrap shrink-0"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-600 text-white font-black text-xl shadow-xs">
              BB
            </span>
            <span className="font-extrabold text-stone-900">PIZZA</span>
          </a>
        </div>

        {/* Zone 2: Concise single-line nav links with Payment Reception & Zones */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-stone-600">
          <button
            type="button"
            onClick={() => onNavigateSection('menu')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer font-semibold"
          >
            Меню
          </button>

          <button
            type="button"
            onClick={onOpenPaymentRequisites}
            className="hover:text-stone-900 text-amber-700 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80"
            title="Приём оплаты на счёт 4169 5853 5008 9446"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-600" />
            <span>Оплата онлайн</span>
          </button>

          <button
            type="button"
            onClick={onOpenZones}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Зоны доставки
          </button>

          <button
            type="button"
            onClick={() => onNavigateSection('reviews')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Отзывы
          </button>

          <button
            type="button"
            onClick={() => onNavigateSection('about')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            О пекарне
          </button>

          <button
            type="button"
            onClick={onOpenTracker}
            className="relative hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>Отследить заказ</span>
            {hasActiveOrder && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action & WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(
              'Здравствуйте, BB Pizza! Хочу сделать заказ.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
            <span>WhatsApp: {WHATSAPP_PHONE_FORMATTED}</span>
          </a>

          {hasActiveOrder && (
            <button
              type="button"
              onClick={onOpenTracker}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
              <span>Заказ в пути</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Открыть корзину"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-xs active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>
              {cartCount > 0 ? (
                <>
                  Корзина · <span className="tabular-nums font-bold">{cartTotal} сом</span>
                </>
              ) : (
                'Корзина'
              )}
            </span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-amber-500 text-stone-950 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 animate-fade-in shadow-xl">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateSection('menu');
            }}
            className="w-full text-left py-2.5 px-3 text-sm font-bold text-stone-900 hover:bg-stone-50 rounded-lg cursor-pointer flex items-center justify-between"
          >
            <span>Меню пиццы</span>
            <span className="text-xs text-amber-600">Перейти →</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPaymentRequisites();
            }}
            className="w-full text-left py-2.5 px-3 text-sm font-bold text-amber-900 bg-amber-50/80 hover:bg-amber-100/80 rounded-lg cursor-pointer flex items-center justify-between border border-amber-200/60"
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-700" />
              <span>Оплата онлайн (счёт 4169...9446)</span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-800">0%</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenZones();
            }}
            className="w-full text-left py-2.5 px-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 rounded-lg cursor-pointer flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-stone-400" />
            <span>Зоны доставки в Бишкеке</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="w-full text-left py-2.5 px-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 rounded-lg cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>Отследить курьера на карте</span>
            </div>
            {hasActiveOrder && (
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                Активен
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateSection('reviews');
            }}
            className="w-full text-left py-2.5 px-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 rounded-lg cursor-pointer flex items-center gap-2"
          >
            <Star className="w-4 h-4 text-stone-400" />
            <span>Отзывы клиентов</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateSection('about');
            }}
            className="w-full text-left py-2.5 px-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 rounded-lg cursor-pointer flex items-center gap-2"
          >
            <span>О пекарне (пер. Геологический, 3)</span>
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(
              'Здравствуйте, BB Pizza! Хочу сделать заказ.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-2.5 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Заказ в WhatsApp ({WHATSAPP_PHONE_FORMATTED})</span>
          </a>
        </div>
      )}
    </header>
  );
};
