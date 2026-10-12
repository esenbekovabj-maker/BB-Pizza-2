import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, X, ShieldCheck } from 'lucide-react';

export interface CustomerReview {
  id: string;
  name: string;
  district: string;
  rating: number;
  date: string;
  text: string;
  favoriteItem: string;
  verifiedOrder: boolean;
  likes: number;
}

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Айдар Т.',
    district: 'Центр (Чуй / Раззакова)',
    rating: 5,
    date: 'Вчера, 19:40',
    text: 'Заказывали с коллегами на вечер в офис. Оплатил картой прямо на сайте за секунду через 3D-Secure. Живой трекинг на карте Бишкека — супер фишка: видно, как курьер едет по Советской. Пицца приехала обжигающе горячей!',
    favoriteItem: 'Фирменная «BB Бишкек»',
    verifiedOrder: true,
    likes: 18,
  },
  {
    id: 'rev-2',
    name: 'Динара Б.',
    district: 'мкр. Асанбай (Южная Магистраль)',
    rating: 5,
    date: '3 дня назад',
    text: 'Впервые заказали пиццу с курицей и ананасом плюс облепиховый морс. До Асанбая довезли всего за 31 минуту. Бортики хрустящие, сыр тянется, а морс с натуральным вкусом ягод. Теперь только у вас!',
    favoriteItem: 'Курица с Ананасом',
    verifiedOrder: true,
    likes: 24,
  },
  {
    id: 'rev-3',
    name: 'Улан К.',
    district: 'мкр. Джал (Тыналиева)',
    rating: 5,
    date: 'На этой неделе',
    text: 'Очень порадовала моментальная оплата через Элкарт на сайте — не надо искать мелочь курьеру или переводить на чужие номера. Пепперони сочная, мясо халяль отличного качества, корочка поджаристая. Твердая пятерка.',
    favoriteItem: 'Пепперони Халяль Премиум',
    verifiedOrder: true,
    likes: 15,
  },
  {
    id: 'rev-4',
    name: 'Камила М.',
    district: 'мкр. Восток-5',
    rating: 5,
    date: '5 дней назад',
    text: 'Брали комбо-сет «Дуэт Бишкек» на семейный ужин. Шампиньоны с курицей просто тают во рту! Сырный борт отдельная любовь. Курьер Бакыт приехал вовремя, упаковано аккуратно в термосумку.',
    favoriteItem: 'Комбо «Дуэт Бишкек»',
    verifiedOrder: true,
    likes: 11,
  },
];

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [filterRating, setFilterRating] = useState<'all' | '5' | 'verified'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // New review form state
  const [newName, setNewName] = useState('');
  const [newDistrict, setNewDistrict] = useState('Центр');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newFavorite, setNewFavorite] = useState('Фирменная «BB Бишкек»');

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === '5') return r.rating === 5;
    if (filterRating === 'verified') return r.verifiedOrder;
    return true;
  });

  const handleLike = (id: string) => {
    if (likedReviews[id]) return;
    setLikedReviews((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      district: newDistrict,
      rating: newRating,
      date: 'Только что',
      text: newText.trim(),
      favoriteItem: newFavorite,
      verifiedOrder: true,
      likes: 1,
    };

    setReviews([newRev, ...reviews]);
    setIsModalOpen(false);
    setNewName('');
    setNewText('');
  };

  return (
    <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200">
      {/* Section Header with Trust Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            Честные отзывы бишкекчан
          </div>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight">
            Что говорят клиенты о BB Pizza
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-xl">
            Более 1 480 довольных доставок по Бишкеку. Реальные отзывы о скорости доставки,
            онлайн-оплате картой и вкусе наших горячих пицц.
          </p>
        </div>

        {/* Aggregate Trust Score Card */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-black text-stone-900 tabular-nums">4.9</div>
            <div>
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Рейтинг сервиса</div>
            </div>
          </div>

          <div className="h-8 w-px bg-stone-200 hidden sm:block" />

          <div className="text-xs text-stone-600">
            <span className="font-bold text-stone-900 block">32–38 минут</span>
            <span>среднее время доставки</span>
          </div>

          <div className="h-8 w-px bg-stone-200 hidden sm:block" />

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
            <span>Оставить отзыв</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setFilterRating('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterRating === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          Все отзывы ({reviews.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterRating('5')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterRating === '5'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          Только 5 ★ звезд
        </button>

        <button
          type="button"
          onClick={() => setFilterRating('verified')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterRating === 'verified'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          Проверенные заказы
        </button>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <article
            key={rev.id}
            className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-stone-300 transition-colors"
          >
            <div className="space-y-3">
              {/* Header of review: Author, district, date */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-stone-900 text-sm">
                      {rev.name}
                    </span>
                    {rev.verifiedOrder && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Заказ подтвержден</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                    <span>{rev.district}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rev.date}</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center text-amber-500 shrink-0">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-stone-700 text-sm leading-relaxed">
                «{rev.text}»
              </p>
            </div>

            {/* Bottom Meta & Likes */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <div className="truncate max-w-[240px]">
                <span className="text-stone-400">Заказывал: </span>
                <span className="font-semibold text-stone-800">{rev.favoriteItem}</span>
              </div>

              <button
                type="button"
                onClick={() => handleLike(rev.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  likedReviews[rev.id]
                    ? 'text-amber-800 bg-amber-50 font-bold'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                }`}
                aria-label="Полезный отзыв"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span className="tabular-nums">{rev.likes}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal: Write Review */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900">Оставить отзыв о BB Pizza</h3>
                <div className="text-xs text-stone-500">Поделитесь вашим впечатлением о доставке</div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например: Азамат"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Район доставки
                  </label>
                  <select
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full py-2.5 px-3 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Центр (Чуй / Раззакова)">Центр Бишкека</option>
                    <option value="мкр. Асанбай">мкр. Асанбай</option>
                    <option value="мкр. Джал">мкр. Джал</option>
                    <option value="мкр. Восток-5">мкр. Восток-5</option>
                    <option value="мкр. 7-10">мкр. 7, 8, 9, 10</option>
                    <option value="Политех">Политех / Мира</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Оценка
                  </label>
                  <div className="flex items-center gap-1 py-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNewRating(s)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            s <= newRating
                              ? 'fill-amber-400 stroke-amber-400'
                              : 'stroke-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Любимая пицца
                </label>
                <input
                  type="text"
                  value={newFavorite}
                  onChange={(e) => setNewFavorite(e.target.value)}
                  placeholder="Например: Пепперони Халяль или 4 Сыра"
                  className="w-full py-2.5 px-3.5 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Текст отзыва *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Напишите о вкусе, скорости доставки курьером или оплате картой..."
                  className="w-full py-2.5 px-3.5 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Опубликовать отзыв
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
