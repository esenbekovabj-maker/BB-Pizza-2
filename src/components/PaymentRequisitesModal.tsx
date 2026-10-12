import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Building2,
  Lock,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { RECIPIENT_CARD_NUMBER, RECIPIENT_CARD_FORMATTED, RECIPIENT_NAME } from './PaymentModal';
import { WHATSAPP_PHONE_RAW, WHATSAPP_PHONE_FORMATTED } from '../utils/whatsapp';

interface PaymentRequisitesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrder: () => void;
  onOpenPayment: () => void;
}

export const PaymentRequisitesModal: React.FC<PaymentRequisitesModalProps> = ({
  isOpen,
  onClose,
  onOpenOrder,
  onOpenPayment,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(RECIPIENT_CARD_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsAppRequisitesUrl = `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(
    `Здравствуйте, BB Pizza! Я перевожу оплату на счёт ${RECIPIENT_CARD_FORMATTED}. Пожалуйста, подтвердите получение!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">Приём оплаты онлайн</h3>
              <div className="text-xs text-stone-500">BB Pizza Bishkek · пер. Геологический, 3</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200/50 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {/* Main Account Card with 1-click copy */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-white space-y-3.5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Счёт / карта для оплаты
              </span>
              <span className="text-stone-400 text-[11px] bg-stone-800 px-2 py-0.5 rounded">
                Бишкек · Сом (KGS)
              </span>
            </div>

            <div className="p-3.5 bg-stone-800/90 rounded-xl border border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-stone-400">Номер карты / счёта:</div>
                <div className="text-xl sm:text-2xl font-mono font-black tracking-wider text-white select-all">
                  {RECIPIENT_CARD_FORMATTED}
                </div>
                <div className="text-xs text-amber-300/90 mt-0.5 font-medium">{RECIPIENT_NAME}</div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="py-2.5 px-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Скопировать счёт</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
              <span>Банк зачисления: <strong className="text-sky-400">ОАО «Оптима Банк»</strong></span>
              <span className="text-emerald-400 font-semibold">● Зачисление мгновенно (0%)</span>
            </div>
          </div>

          {/* Direct Online Pay Action Button */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-amber-950">
                Оплата через Оптима24 или банковской картой онлайн:
              </div>
              <span className="text-[10px] bg-sky-200 text-sky-900 font-bold px-2 py-0.5 rounded">
                Оптима Банк
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Вы можете оплатить напрямую переводом через приложение <strong>Optima24</strong> на счёт {RECIPIENT_CARD_NUMBER} или любой картой Visa / Элкарт.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPayment();
              }}
              className="w-full mt-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              <CreditCard className="w-4 h-4" />
              <span>Оплатить через Оптиму / картой ({RECIPIENT_CARD_NUMBER.slice(-4)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Supported Banks */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-stone-900">
              Способы оплаты и банки в Кыргызстане:
            </div>
            <div className="grid grid-cols-2 gap-2 text-stone-700">
              <div className="p-2.5 rounded-lg border border-sky-300 bg-sky-50/80 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-bold text-sky-950">Оптима Банк / Optima24</span>
              </div>
              <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-medium">Visa & Mastercard</span>
              </div>
              <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Элкарт (все банки)</span>
              </div>
              <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-stone-600 shrink-0" />
                <span className="font-medium">Другие банки КР</span>
              </div>
            </div>
          </div>

          {/* WhatsApp confirmation */}
          <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
            <div className="space-y-0.5">
              <div className="font-bold text-emerald-950">Подтверждение через WhatsApp:</div>
              <div className="text-emerald-700">{WHATSAPP_PHONE_FORMATTED}</div>
            </div>
            <a
              href={whatsAppRequisitesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
              <span>Написать оператору</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Платёж зачисляется мгновенно на счёт BB Pizza. После оплаты курьер сразу выезжает с горячей пиццей!
            </span>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenOrder();
              }}
              className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-black rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-center text-xs"
            >
              Перейти в меню и выбрать пиццу
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition-colors cursor-pointer text-xs"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
