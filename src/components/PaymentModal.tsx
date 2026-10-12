import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  RefreshCw,
  Copy,
  Check,
  Smartphone,
  Share2,
  MessageCircle,
  ArrowRight,
  Receipt,
  Download,
} from 'lucide-react';
import { CardBrand } from '../types';
import { WHATSAPP_PHONE_RAW, WHATSAPP_PHONE_FORMATTED } from '../utils/whatsapp';

export const RECIPIENT_CARD_NUMBER = '4169585350089446';
export const RECIPIENT_CARD_FORMATTED = '4169 5853 5008 9446';
export const RECIPIENT_NAME = 'BB Pizza Bishkek (ИП «BB Пицца»)';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  initialTab?: 'card' | 'transfer';
  onPaymentSuccess: (paymentInfo: {
    brand: CardBrand;
    last4: string;
    transactionId: string;
    amount: number;
    payerName?: string;
  }) => void;
}

interface PaymentReceiptData {
  transactionId: string;
  amount: number;
  recipientCard: string;
  date: string;
  time: string;
  payerName: string;
  method: string;
  status: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  initialTab = 'card',
  onPaymentSuccess,
}) => {
  if (!isOpen) return null;

  // Custom amount handling if opened standalone (amount === 0)
  const [effectiveAmount, setEffectiveAmount] = useState<number>(amount > 0 ? amount : 750);
  const [customAmountInput, setCustomAmountInput] = useState<string>(
    amount > 0 ? amount.toString() : '750'
  );

  useEffect(() => {
    if (amount > 0) {
      setEffectiveAmount(amount);
      setCustomAmountInput(amount.toString());
    }
  }, [amount]);

  const [activeTab, setActiveTab] = useState<'card' | 'transfer'>(initialTab);

  // Card form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [is3DSActive, setIs3DSActive] = useState(false);
  const [otpCode, setOtpCode] = useState('7492');
  const [errorMessage, setErrorMessage] = useState('');

  // Transfer states
  const [copiedCard, setCopiedCard] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('+996 ');
  const [isTransferChecking, setIsTransferChecking] = useState(false);

  // Digital Receipt state after successful transaction
  const [receipt, setReceipt] = useState<PaymentReceiptData | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  // Detect card brand
  const detectBrand = (num: string): CardBrand => {
    const clean = num.replace(/\s+/g, '');
    if (clean.startsWith('9417') || clean.startsWith('5049') || clean.startsWith('9')) {
      return 'elcard';
    }
    if (clean.startsWith('4')) {
      return 'visa';
    }
    if (clean.startsWith('5')) {
      return 'mastercard';
    }
    return 'visa';
  };

  const currentBrand = detectBrand(cardNumber);

  // Format card number with spaces
  const handleCardNumberChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    setCardNumber(formatted);
    setErrorMessage('');
  };

  // Format expiry MM/YY
  const handleExpiryChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      setExpiry(`${digits.slice(0, 2)}/${digits.slice(2, 4)}`);
    } else {
      setExpiry(digits);
    }
    setErrorMessage('');
  };

  // Format CVC
  const handleCvcChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 3);
    setCvc(digits);
  };

  // Quick test fill
  const handleQuickFill = (brand: CardBrand) => {
    if (brand === 'elcard') {
      setCardNumber('9417 8820 4519 7382');
      setExpiry('12/28');
      setCvc('884');
      setCardholder('NURBEK ASANKULOV');
    } else if (brand === 'visa') {
      setCardNumber('4111 2222 3333 4444');
      setExpiry('08/29');
      setCvc('421');
      setCardholder('AIDA ALIEVA');
    } else {
      setCardNumber('5105 1051 0510 5100');
      setExpiry('11/27');
      setCvc('312');
      setCardholder('BB PIZZA CLIENT');
    }
    setErrorMessage('');
  };

  const copyToClipboard = (text: string, type: 'card' | 'amount' | 'receipt') => {
    navigator.clipboard?.writeText(text);
    if (type === 'card') {
      setCopiedCard(true);
      setTimeout(() => setCopiedCard(false), 2500);
    } else if (type === 'amount') {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2500);
    } else {
      setCopiedReceipt(true);
      setTimeout(() => setCopiedReceipt(false), 2500);
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) {
      setErrorMessage('Укажите корректную сумму к оплате');
      return;
    }
    const cleanNum = cardNumber.replace(/\s+/g, '');
    if (cleanNum.length < 16) {
      setErrorMessage('Введите полный 16-значный номер карты');
      return;
    }
    if (expiry.length < 5) {
      setErrorMessage('Укажите срок действия карты в формате ММ/ГГ');
      return;
    }
    if (cvc.length < 3) {
      setErrorMessage('Укажите 3-значный CVC/CVV код');
      return;
    }
    if (!cardholder.trim()) {
      setErrorMessage('Укажите имя держателя карты');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsProcessing(false);
      setIs3DSActive(true);
    }, 800);
  };

  const handleConfirm3DS = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIs3DSActive(false);

      const cleanNum = cardNumber.replace(/\s+/g, '');
      const last4 = cleanNum.slice(-4) || '7382';
      const txId = `TX-BB-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();

      const receiptData: PaymentReceiptData = {
        transactionId: txId,
        amount: effectiveAmount,
        recipientCard: RECIPIENT_CARD_FORMATTED,
        date: now.toLocaleDateString('ru-RU'),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        payerName: cardholder || 'Клиент BB Pizza',
        method: `Банковская карта ${currentBrand.toUpperCase()} (*${last4})`,
        status: 'Успешно зачислено',
      };

      setReceipt(receiptData);

      onPaymentSuccess({
        brand: currentBrand,
        last4,
        transactionId: txId,
        amount: effectiveAmount,
        payerName: cardholder,
      });
    }, 800);
  };

  const handleConfirmTransfer = () => {
    if (effectiveAmount <= 0) {
      setErrorMessage('Укажите сумму перевода');
      return;
    }

    setIsTransferChecking(true);
    setTimeout(() => {
      setIsTransferChecking(false);

      const txId = `TRANSFER-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();

      const receiptData: PaymentReceiptData = {
        transactionId: txId,
        amount: effectiveAmount,
        recipientCard: RECIPIENT_CARD_FORMATTED,
        date: now.toLocaleDateString('ru-RU'),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        payerName: senderName || 'Клиент BB Pizza',
        method: 'Перевод через Оптима24 / Оптима Банк',
        status: 'Успешно зачислено',
      };

      setReceipt(receiptData);

      onPaymentSuccess({
        brand: 'visa',
        last4: RECIPIENT_CARD_NUMBER.slice(-4),
        transactionId: txId,
        amount: effectiveAmount,
        payerName: senderName,
      });
    }, 1000);
  };

  const handleCustomAmountChange = (val: string) => {
    const num = parseInt(val.replace(/\D/g, ''), 10) || 0;
    setCustomAmountInput(val.replace(/\D/g, ''));
    setEffectiveAmount(num);
  };

  const handleQuickAmountSelect = (val: number) => {
    setEffectiveAmount(val);
    setCustomAmountInput(val.toString());
  };

  const getWhatsAppReceiptUrl = () => {
    if (!receipt) return '#';
    const text = `Здравствуйте, BB Pizza! Я оплатил заказ на счёт ${receipt.recipientCard}.\n\n📄 Чек об оплате:\n• Номер транзакции: ${receipt.transactionId}\n• Сумма: ${receipt.amount} сом\n• Плательщик: ${receipt.payerName}\n• Дата и время: ${receipt.date} ${receipt.time}\n• Статус: ${receipt.status}\n\nПожалуйста, проверьте и доставьте пиццу! 🍕`;
    return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-stone-900">
                Приём оплаты · BB Pizza Bishkek
              </h2>
              <div className="text-xs text-stone-500">
                Счёт зачисления: <span className="font-mono font-bold text-stone-900">{RECIPIENT_CARD_FORMATTED}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200/50 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount & Account Banner */}
        <div className="px-5 py-3.5 bg-amber-500/10 border-b border-amber-200/60">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-amber-900">Сумма к оплате:</div>
              <div className="text-xs text-stone-600">
                Получатель: <strong className="text-stone-900">{RECIPIENT_NAME}</strong>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              {amount === 0 ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customAmountInput}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="w-24 text-right py-1 px-2 text-xl font-black text-stone-900 bg-white rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 tabular-nums"
                  />
                  <span className="text-sm font-bold text-amber-800">сом</span>
                </div>
              ) : (
                <div className="text-2xl font-black text-stone-900 tabular-nums">
                  {effectiveAmount} <span className="text-sm font-bold text-amber-800">сом</span>
                </div>
              )}
            </div>
          </div>

          {/* If opened directly with no predefined amount, offer fast pills */}
          {amount === 0 && (
            <div className="mt-2 pt-2 border-t border-amber-200/40 flex items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-stone-500 text-[11px] shrink-0">Выбрать сумму:</span>
              {[500, 750, 1000, 1500, 2000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAmountSelect(val)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    effectiveAmount === val
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  {val} сом
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab Switcher: Card Gateway vs Direct Transfer (hidden if receipt or 3DS) */}
        {!receipt && !is3DSActive && (
          <div className="px-5 pt-3 bg-white border-b border-stone-100 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'card'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span>Оплата картой онлайн</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('transfer')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'transfer'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Smartphone className="w-4 h-4 text-sky-600" />
              <span>Перевод через Оптима Банк (счёт {RECIPIENT_CARD_NUMBER.slice(-4)})</span>
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1">
          {receipt ? (
            /* Digital Receipt Screen */
            <div className="space-y-5 animate-fade-in">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-black text-stone-900">
                  Оплата успешно принята!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Денежные средства в размере <strong>{receipt.amount} сом</strong> успешно зачислены на счёт{' '}
                  <span className="font-mono font-bold text-stone-900">{receipt.recipientCard}</span>
                </p>
              </div>

              {/* Receipt Ticket Box */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2.5 font-mono shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200 font-sans">
                  <div className="flex items-center gap-1.5 text-stone-900 font-bold">
                    <Receipt className="w-4 h-4 text-amber-600" />
                    <span>Электронный чек транзакции</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    ОПЛАЧЕНО
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-500">Транзакция:</span>
                  <span className="font-bold text-stone-900">{receipt.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Счёт зачисления:</span>
                  <span className="font-bold text-stone-900">{receipt.recipientCard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Получатель:</span>
                  <span className="font-bold text-stone-900 font-sans">{RECIPIENT_NAME}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Плательщик:</span>
                  <span className="font-bold text-stone-900 font-sans">{receipt.payerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Способ:</span>
                  <span className="font-bold text-stone-900 font-sans">{receipt.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Дата и время:</span>
                  <span className="font-bold text-stone-900">{receipt.date} в {receipt.time}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-sans font-black text-stone-900">
                  <span>Итого зачислено:</span>
                  <span className="text-emerald-700 font-mono text-base">{receipt.amount} сом</span>
                </div>
              </div>

              {/* Receipt Actions */}
              <div className="space-y-2 pt-1 font-sans">
                <a
                  href={getWhatsAppReceiptUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Отправить чек в WhatsApp оператору BB Pizza</span>
                </a>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `Чек BB Pizza: Транзакция ${receipt.transactionId}, Сумма ${receipt.amount} сом на счёт ${receipt.recipientCard}. Статус: ${receipt.status}.`,
                        'receipt'
                      )
                    }
                    className="flex-1 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition-colors cursor-pointer text-xs flex items-center justify-center gap-1.5"
                  >
                    {copiedReceipt ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Чек скопирован!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Скопировать чек</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl transition-colors cursor-pointer text-xs"
                  >
                    Готово
                  </button>
                </div>
              </div>
            </div>
          ) : is3DSActive ? (
            /* 3D Secure Step */
            <div className="space-y-5 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  3D-Secure 2.0 Проверка
                </div>
                <h3 className="text-lg font-black text-stone-900 mt-1">
                  Подтверждение зачисления {effectiveAmount} сом
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 max-w-sm mx-auto">
                  Перевод на счёт BB Pizza:{' '}
                  <strong className="text-stone-900 font-mono">{RECIPIENT_CARD_FORMATTED}</strong>.
                  Мы отправили SMS-код на номер вашей карты.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-3">
                <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-500 block mb-0.5">Тестовый SMS-код:</span>
                  <span className="text-xl font-black tracking-widest text-stone-900 tabular-nums">
                    7492
                  </span>
                </div>

                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={4}
                  className="w-full text-center py-2.5 px-4 text-lg font-bold tracking-widest rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <button
                  type="button"
                  onClick={handleConfirm3DS}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Зачисление на счёт 4169...9446...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Зачислить {effectiveAmount} сом на счёт BB Pizza</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : activeTab === 'transfer' ? (
            /* Direct Transfer to 4169 5853 5008 9446 */
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-stone-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Реквизиты для перевода (Оптима Банк)
                  </span>
                  <span className="text-xs font-mono text-sky-300 font-bold bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                    Optima24 · Оптима Банк
                  </span>
                </div>

                {/* Card Number Box with 1-Click Copy */}
                <div className="p-3.5 bg-stone-800/90 rounded-xl border border-stone-700 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-stone-400">Счёт / карта получателя в Оптима Банке:</div>
                    <div className="text-lg sm:text-xl font-black tracking-wider text-white font-mono select-all">
                      {RECIPIENT_CARD_FORMATTED}
                    </div>
                    <div className="text-xs text-amber-300/80 mt-0.5">{RECIPIENT_NAME} · ОАО «Оптима Банк»</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(RECIPIENT_CARD_NUMBER, 'card')}
                    className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    {copiedCard ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Скопировано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Скопировать</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Exact Amount Box */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-stone-300">Точная сумма к переводу:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(effectiveAmount.toString(), 'amount')}
                    className="font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{effectiveAmount} сом</span>
                    {copiedAmount ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Step-by-step instructions for Optima */}
              <div className="space-y-2 text-xs text-stone-700 bg-sky-50/60 p-4 rounded-xl border border-sky-200">
                <div className="font-bold text-stone-900 mb-1 flex items-center justify-between">
                  <span>Как быстро оплатить через Оптима Банк:</span>
                  <span className="text-[10px] bg-sky-200 text-sky-900 font-bold px-2 py-0.5 rounded">Без комиссии</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-900 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    1
                  </span>
                  <span>
                    Откройте приложение <strong>Optima24</strong> (или любой другой банк Кыргызстана)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-900 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    2
                  </span>
                  <span>
                    Перейдите в меню <strong>«Переводы» → «Клиенту Оптима Банка»</strong> или <strong>«По номеру карты»</strong>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-900 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    3
                  </span>
                  <span>
                    Вставьте счёт <strong className="font-mono">{RECIPIENT_CARD_FORMATTED}</strong> и переведите{' '}
                    <strong>{effectiveAmount} сом</strong>
                  </span>
                </div>
              </div>

              {/* Confirmation Action */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Ваше имя или номер телефона (для моментальной сверки платежа)
                  </label>
                  <input
                    type="text"
                    placeholder="Например: Азамат (+996 555 12-34-56)"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full py-2.5 px-3.5 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleConfirmTransfer}
                  disabled={isTransferChecking}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isTransferChecking ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Сверка зачисления на счёт {RECIPIENT_CARD_FORMATTED}...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Я перевел(а) {effectiveAmount} сом на счёт {RECIPIENT_CARD_NUMBER.slice(-4)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Card Online Form */
            <form onSubmit={handlePay} className="space-y-4">
              {/* Recipient Account Trust Notice */}
              <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-stone-500">Зачисление на счёт:</span>
                  <div className="font-mono font-bold text-stone-900">{RECIPIENT_CARD_FORMATTED}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Активен · 0% комиссия
                  </span>
                </div>
              </div>

              {/* Quick Fill Test Buttons */}
              <div>
                <div className="text-xs font-semibold text-stone-500 mb-1.5 flex items-center justify-between">
                  <span>Быстрое заполнение тестовой карты:</span>
                  <span className="text-[11px] text-amber-700">1 клик для проверки</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('elcard')}
                    className="py-1.5 px-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg border border-stone-200 transition-colors cursor-pointer text-center"
                  >
                    🇰🇬 Элкарт
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('visa')}
                    className="py-1.5 px-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg border border-stone-200 transition-colors cursor-pointer text-center"
                  >
                    Visa Gold
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('mastercard')}
                    className="py-1.5 px-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg border border-stone-200 transition-colors cursor-pointer text-center"
                  >
                    Mastercard
                  </button>
                </div>
              </div>

              {/* Card Inputs */}
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                    <span>Номер вашей карты</span>
                    <span className="text-xs font-bold text-amber-700 uppercase">
                      {currentBrand === 'elcard' ? 'Элкарт' : currentBrand.toUpperCase()}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="9417 0000 0000 0000"
                      className="w-full py-2.5 pl-3.5 pr-10 text-sm font-semibold tracking-wider rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                    <CreditCard className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">
                      Срок действия
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      placeholder="ММ/ГГ"
                      className="w-full py-2.5 px-3.5 text-sm font-semibold rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-center"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                      <span>CVC / CVV</span>
                      <span className="text-[10px] text-stone-400 font-normal">3 цифры</span>
                    </label>
                    <input
                      type="password"
                      value={cvc}
                      onChange={(e) => handleCvcChange(e.target.value)}
                      placeholder="•••"
                      maxLength={3}
                      className="w-full py-2.5 px-3.5 text-sm font-semibold rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-center tracking-widest"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    Имя на карте (латиницей)
                  </label>
                  <input
                    type="text"
                    value={cardholder}
                    onChange={(e) => setCardholder(e.target.value.toUpperCase())}
                    placeholder="IVAN IVANOV"
                    className="w-full py-2.5 px-3.5 text-sm font-semibold uppercase rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Авторизация платежа...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      Оплатить {effectiveAmount} сом на счёт {RECIPIENT_CARD_NUMBER.slice(-4)}
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  256-bit SSL
                </span>
                <span>·</span>
                <span>Элкарт / Visa / Mastercard</span>
                <span>·</span>
                <span>0% комиссия</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
