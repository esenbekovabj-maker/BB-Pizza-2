import React, { useState } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  ShieldCheck,
  Copy,
  Check,
  CreditCard,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { RECIPIENT_CARD_NUMBER, RECIPIENT_CARD_FORMATTED } from './PaymentModal';
import { WHATSAPP_PHONE_RAW, WHATSAPP_PHONE_FORMATTED } from '../utils/whatsapp';

interface FooterProps {
  onOpenPaymentRequisites?: () => void;
  onOpenZones?: () => void;
  onOpenTracker?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPaymentRequisites,
  onOpenZones,
  onOpenTracker,
  onNavigateSection,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCard = () => {
    navigator.clipboard?.writeText(RECIPIENT_CARD_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="about" className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600 text-white font-black text-lg">
                BB
              </span>
              <span>PIZZA</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Пекарня горячей неаполитанской и авторской пиццы в сердце Бишкека. Итальянская мука Tipo 00,
              48 часов созревания теста и фермерские ингредиенты Кыргызстана.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Халяль сертификация · Стандарт качества</span>
            </div>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Контакты пекарни
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>г. Бишкек, пер. Геологический, 3</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${WHATSAPP_PHONE_RAW}`} className="hover:text-white transition-colors font-mono">
                  {WHATSAPP_PHONE_FORMATTED}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20 shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(
                    'Здравствуйте, BB Pizza! Хочу сделать заказ.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  WhatsApp: {WHATSAPP_PHONE_FORMATTED}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Ежедневно 10:00 — 02:00</span>
              </div>
            </div>
          </div>

          {/* Bishkek Delivery Info */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Доставка в Бишкеке
            </div>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>· Центр, Восток-5, Джал, Асанбай, 12 мкр</li>
              <li>· Экспресс-доставка от 25 минут</li>
              <li>· Бесплатно при заказе от 500 сом</li>
              <li>· Термосумки с постоянным подогревом 65°C</li>
            </ul>

            <button
              type="button"
              onClick={onOpenZones}
              className="mt-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer flex items-center gap-1"
            >
              <span>Посмотреть карту зон доставки →</span>
            </button>
          </div>

          {/* Payments & Security */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Приём оплаты онлайн
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={onOpenPaymentRequisites}
                className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded font-semibold text-stone-200 border border-stone-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                title="Оплата картой Элкарт"
              >
                🇰🇬 Элкарт
              </button>
              <button
                type="button"
                onClick={onOpenPaymentRequisites}
                className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded font-semibold text-stone-200 border border-stone-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                title="Оплата картой Visa"
              >
                Visa
              </button>
              <button
                type="button"
                onClick={onOpenPaymentRequisites}
                className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded font-semibold text-stone-200 border border-stone-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                title="Оплата картой Mastercard"
              >
                Mastercard
              </button>
              <button
                type="button"
                onClick={onOpenPaymentRequisites}
                className="px-2.5 py-1 bg-sky-950/80 hover:bg-sky-900 rounded font-semibold text-sky-300 border border-sky-800/80 hover:border-sky-500/50 transition-colors cursor-pointer"
                title="Перевод через Оптима Банк (Optima24)"
              >
                Оптима Банк
              </button>
            </div>

            {/* Account Quick Copy & Pay Button */}
            <div className="p-3 bg-stone-800/90 rounded-xl border border-stone-700 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Счёт зачисления:</span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/60">
                  KGS
                </span>
              </div>
              <div className="font-mono font-bold text-amber-400 text-sm sm:text-base select-all">
                {RECIPIENT_CARD_FORMATTED}
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyCard}
                  className="flex-1 py-1.5 px-2 bg-stone-700 hover:bg-stone-600 rounded-lg text-white font-semibold text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  title="Скопировать номер карты"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenPaymentRequisites}
                  className="flex-1 py-1.5 px-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  title="Оплатить онлайн"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Оплатить</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 leading-snug">
              Все платежи защищены 256-битным шифрованием по стандартам безопасности PCI-DSS.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © 2026 BB Pizza Bishkek. Все права защищены.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigateSection?.('menu')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Меню
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection?.('reviews')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Отзывы
            </button>
            <button
              type="button"
              onClick={onOpenZones}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Зоны доставки
            </button>
            <button
              type="button"
              onClick={onOpenTracker}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Отследить заказ
            </button>
            <button
              type="button"
              onClick={onOpenPaymentRequisites}
              className="hover:text-white text-amber-400 font-bold transition-colors cursor-pointer"
            >
              Оплата онлайн (4169...9446)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
