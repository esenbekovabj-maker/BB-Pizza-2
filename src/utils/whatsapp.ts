import { CartItem, OrderCustomer } from '../types';

export const WHATSAPP_PHONE_RAW = '996559444996';
export const WHATSAPP_PHONE_FORMATTED = '+996 (559) 444-996';

export const createWhatsAppOrderUrl = (
  items: CartItem[],
  total: number,
  deliveryFee: number,
  customer?: Partial<OrderCustomer> | null
): string => {
  if (items.length === 0) {
    const defaultText = `Здравствуйте, BB Pizza! 🍕 Хочу оформить заказ пиццы с доставкой по Бишкеку.`;
    return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(defaultText)}`;
  }

  let message = `Здравствуйте, BB Pizza! 🍕 Хочу сделать заказ:\n\n`;

  items.forEach((item, index) => {
    const sizeLabel =
      item.size === '25cm' ? '25 см (Стандарт)' : item.size === '30cm' ? '30 см (Средняя)' : '35 см (Большая)';
    const crustLabel = item.crust === 'cheese_crust' ? ' + Сырный борт' : '';
    message += `${index + 1}. *${item.menuItem.name}* (${sizeLabel}${crustLabel})\n`;
    message += `   Количество: ${item.quantity} шт. · ${item.totalPrice} сом\n`;

    if (item.addedToppings.length > 0) {
      message += `   Доп. топпинги: ${item.addedToppings.map((t) => t.name).join(', ')}\n`;
    }
    if (item.removedIngredients.length > 0) {
      message += `   Без: ${item.removedIngredients.join(', ')}\n`;
    }
    message += `\n`;
  });

  message += `━━━━━━━━━━━━━━━\n`;
  message += `💰 *Сумма к оплате:* ${total} сом\n`;
  message += `🚚 *Доставка:* ${deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} сом`}\n`;

  if (customer && (customer.name || customer.street || customer.district)) {
    message += `\n📍 *Данные для доставки в Бишкеке:*\n`;
    if (customer.name) message += `• Имя: ${customer.name}\n`;
    if (customer.phone) message += `• Телефон: ${customer.phone}\n`;
    if (customer.district) message += `• Район: ${customer.district}\n`;
    if (customer.street) message += `• Улица, дом: ${customer.street}\n`;
    if (customer.apartment) message += `• Кв/офис: ${customer.apartment}\n`;
    if (customer.intercom) message += `• Домофон: ${customer.intercom}\n`;
    if (customer.comment) message += `• Примечание: ${customer.comment}\n`;
  }

  message += `\nПожалуйста, подтвердите заказ! 🙏`;

  return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(message)}`;
};
