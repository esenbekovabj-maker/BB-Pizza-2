import React from 'react';
import {
  ArrowDown,
  ShieldCheck,
  Clock,
  Flame,
  CreditCard,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import heroPizzaImg from '../assets/images/hero_bb_crispy_pizza_1791722246313.jpg';
import { WHATSAPP_PHONE_RAW, WHATSAPP_PHONE_FORMATTED } from '../utils/whatsapp';

interface HeroProps {
  onScrollToMenu: () => void;
  onOpenTracker: () => void;
  onOpenPaymentRequisites: () => void;
  onOpenZones: () => void;
  hasActiveOrder: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToMenu,
  onOpenTracker,
  onOpenPaymentRequisites,
  onOpenZones,
  hasActiveOrder,
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 pt-8 pb-14 lg:py-20">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <span>Бишкек</span>
              <span aria-hidden="true">·</span>
              <span>пер. Геологический, 3</span>
              <span aria-hidden="true">·</span>
              <span>48 часов ферментации</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight lg:leading-tight">
              Горячая неаполитанская пицца в Бишкеке
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-xl font-normal leading-relaxed">
              Выпекаем при 380°C по авторским итальянским рецептам. Тянущаяся фермерская моцарелла,
              хрустящий пышный бортик и моментальная доставка до двери с живой картой курьера.
            </p>

            {/* CTAs - All fully clickable */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onScrollToMenu}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                <span>Выбрать в меню</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenPaymentRequisites}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-stone-900 bg-amber-200 hover:bg-amber-100 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
                title="Оплата картой на счёт 4169 5853 5008 9446"
              >
                <CreditCard className="w-4 h-4 text-stone-900" />
                <span>Оплата онлайн (4169...9446)</span>
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(
                  'Здравствуйте! Хочу сделать заказ пиццы BB Pizza.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Заказ в WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenTracker}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors cursor-pointer"
              >
                <span>{hasActiveOrder ? 'Где мой курьер?' : 'Отследить заказ'}</span>
              </button>
            </div>

            {/* Payment & Trust Trustmarks - All Clickable and opening requisites */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-stone-400">
              <span className="text-stone-300 font-medium">Принимаем к оплате:</span>
              <button
                type="button"
                onClick={onOpenPaymentRequisites}
                className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold border border-stone-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                title="Оплата картой Элкарт на счёт 4169 5853 5008 9446"
              >
                🇰🇬 Элкарт
              </button>
              <button
                type="button"
                onClick={onOpenPaymentRequisites}
                className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold border border-stone-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                title="Оплата картой Visa на счёт 4169 5853 5008 9446"
              >
                Visa
              </button>
              <button
                type="button"
                onClick={onOpenPaymentRequisites}
                className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold border border-stone-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                title="Оплата картой Mastercard"
              >
                Mastercard
              </button>
              <button
                type="button"
                onClick={onOpenPaymentRequisites}
                className="px-2.5 py-1 rounded bg-sky-950/80 hover:bg-sky-900 text-sky-300 font-semibold border border-sky-800/80 transition-colors cursor-pointer flex items-center gap-1"
                title="Перевод на счёт 4169 5853 5008 9446 через Оптима Банк"
              >
                <span>Оптима Банк · 4169...9446</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Media Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-square border border-stone-800 shadow-2xl bg-stone-950">
              <img
                src={heroPizzaImg}
                alt="BB Pizza Bishkek свежевыпеченная пицца из печи"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Highlight Card - Clickable to scroll to menu */}
              <button
                type="button"
                onClick={onScrollToMenu}
                className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/90 hover:bg-stone-900 backdrop-blur-md border border-stone-800 hover:border-amber-500/40 flex items-center justify-between text-left transition-all active:scale-98 cursor-pointer shadow-lg"
              >
                <div>
                  <div className="text-xs text-amber-400 font-medium">Фирменный стандарт BB</div>
                  <div className="text-sm font-bold text-white">Доставка в термосумке за 30-40 мин</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-400">от</span>
                  <div className="text-lg font-extrabold text-amber-400 tabular-nums">480 сом</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Feature Strip - All clickable cards */}
        <div className="mt-14 pt-8 border-t border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onScrollToMenu}
            className="flex items-start gap-3 p-3 rounded-xl bg-stone-800/40 hover:bg-stone-800/80 border border-stone-800 hover:border-stone-700 transition-all text-left cursor-pointer active:scale-98"
          >
            <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-700 text-amber-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Горячая печь 380°C</div>
              <div className="text-xs text-stone-400 mt-0.5">Выпекаем свежую за 90 сек → Меню</div>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenZones}
            className="flex items-start gap-3 p-3 rounded-xl bg-stone-800/40 hover:bg-stone-800/80 border border-stone-800 hover:border-stone-700 transition-all text-left cursor-pointer active:scale-98"
          >
            <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-700 text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">30–40 мин доставка</div>
              <div className="text-xs text-stone-400 mt-0.5">Все районы Бишкека → Зоны</div>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenPaymentRequisites}
            className="flex items-start gap-3 p-3 rounded-xl bg-amber-950/20 hover:bg-amber-950/40 border border-amber-900/40 hover:border-amber-600/50 transition-all text-left cursor-pointer active:scale-98"
          >
            <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-700 text-amber-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Оплата онлайн</div>
              <div className="text-xs text-amber-300/80 mt-0.5">На счёт 4169...9446 → Оплатить</div>
            </div>
          </button>

          <button
            type="button"
            onClick={onScrollToMenu}
            className="flex items-start gap-3 p-3 rounded-xl bg-stone-800/40 hover:bg-stone-800/80 border border-stone-800 hover:border-stone-700 transition-all text-left cursor-pointer active:scale-98"
          >
            <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-700 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Халяль стандарт</div>
              <div className="text-xs text-stone-400 mt-0.5">Только свежее местное мясо</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
