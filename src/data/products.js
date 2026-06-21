export const menuProducts = [
  {
    id: 1,
    name: 'Круассан с лососем',
    description: 'Премиальный слоёный круассан с норвежским лососем, сливочным сыром и свежей зеленью',
    price: 420,
    category: 'Выпечка',
    image: 'croissant_losos',
  },
  {
    id: 2,
    name: 'Круассан с соусом песто',
    description: 'Воздушный круассан с домашним соусом песто, вялеными томатами и моцареллой',
    price: 350,
    category: 'Выпечка',
    image: 'croissant_pesto',
  },
  {
    id: 3,
    name: 'Торт "Амели"',
    description: 'Изысканный авторский торт с нежным кремом, свежими ягодами и миндальным бисквитом',
    price: 2800,
    category: 'Десерты',
    image: 'tort_ameli',
  },
  {
    id: 4,
    name: 'Торт "Карамельный"',
    description: 'Многослойный торт с солёной карамелью, шоколадным муссом и хрустящим пралине',
    price: 3200,
    category: 'Десерты',
    image: 'tort_caramel',
  },
  {
    id: 5,
    name: 'Торт "Фрезье"',
    description: 'Классический французский торт с фисташковым кремом, свежей клубникой и лёгким бисквитом',
    price: 3500,
    category: 'Десерты',
    image: 'tort_frezie',
  },
  {
    id: 6,
    name: 'Торт "Jacques André"',
    description: 'Наш фирменный торт — воплощение элегантности и вкуса с премиальными ингредиентами',
    price: 4200,
    category: 'Десерты',
    image: 'tort_zhak_andre',
  },
  {
    id: 7,
    name: 'Лимонная тарталетка',
    description: 'Хрустящая песочная корзинка с шелковистым лимонным кремом и меренгой',
    price: 280,
    category: 'Десерты',
    image: 'limon_tartaletka',
  },
  {
    id: 8,
    name: 'Тарталетка ассорти',
    description: 'Миниатюрные французские тарталетки с различными начинками — набор из 4 штук',
    price: 950,
    category: 'Десерты',
    image: 'tartaletka',
  },
  {
    id: 9,
    name: 'Макарон',
    description: 'Классические французские миндальные пирожные с нежными кремовыми начинками — набор из 6 штук',
    price: 720,
    category: 'Десерты',
    image: 'makaronc',
  },
  {
    id: 10,
    name: 'Ачма с курицей',
    description: 'Сытная грузинская выпечка со слоями теста, сочной курицей и сыром',
    price: 480,
    category: 'Выпечка',
    image: 'achma_kurica',
  },
  {
    id: 11,
    name: 'Клаб-сэндвич',
    description: 'Трёхслойный сэндвич с курицей гриль, беконом, свежими овощами и фирменным соусом',
    price: 520,
    category: 'Выпечка',
    image: 'club_sandwich',
  },
  {
    id: 12,
    name: 'Сырник',
    description: 'Воздушные сырники из фермерского творога с ванилью, подаются со сметаной и ягодным соусом',
    price: 380,
    category: 'Выпечка',
    image: 'sirnik',
  },
]

export const coffeeMenu = [
  {
    id: 'coffee-americano',
    name: 'Американо',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Классический крепкий кофе на основе эспрессо',
    image: 'americano_coffee.webp',
    variants: [
      { id: 'c1', volume: '250мл', price: 175 },
      { id: 'c2', volume: '350мл', price: 209 },
      { id: 'c3', volume: '400мл', price: 225 },
    ],
  },
  {
    id: 'coffee-cappuccino',
    name: 'Капучино',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Классический кофейный напиток с балансом эспрессо и нежной молочной пены',
    image: 'capuchino_coffee.webp',
    variants: [
      { id: 'c4', volume: '250мл', price: 209 },
      { id: 'c5', volume: '350мл', price: 245 },
      { id: 'c6', volume: '400мл', price: 275 },
    ],
  },
  {
    id: 'coffee-latte',
    name: 'Латте',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Мягкий кофейный напиток с преобладанием горячего молока и легкой пенкой',
    image: 'latte_coffee.webp',
    variants: [
      { id: 'c7', volume: '250мл', price: 209 },
      { id: 'c8', volume: '350мл', price: 245 },
      { id: 'c9', volume: '400мл', price: 275 },
    ],
  },
  {
    id: 'coffee-flat-white',
    name: 'Флэт-уайт',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Насыщенный кофейный вкус с двойной порцией эспрессо и тонким слоем бархатистой пены',
    image: 'flat_white_coffee.webp',
    variants: [
      { id: 'c10', volume: '250мл', price: 239 },
      { id: 'c11', volume: '350мл', price: 259 },
    ],
  },
  {
    id: 'coffee-raf',
    name: 'Раф',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Нежнейший кофейный десерт на основе эспрессо, сливок и ванильного сахара',
    image: 'raf_coffee.webp',
    variants: [{ id: 'c12', volume: '250мл', price: 279 }],
  },
  {
    id: 'coffee-kids-cappuccino',
    name: 'Детский капучино',
    category: 'ГОРЯЧИЕ НАПИТКИ',
    description: 'Нежное взбитое молочко с воздушной пеной без добавления кофе — специально для маленьких гостей',
    image: 'babychino_coffee.webp',
    variants: [{ id: 'c13', volume: '250мл', price: 99 }],
  },
]

const featuredProductConfig = [
  { id: 2, isNew: true },
  { id: 8, isNew: false },
  { id: 12, isNew: false },
  { id: 11, isNew: false },
  { id: 1, isNew: false },
  { id: 10, isNew: false },
  { id: 6, isNew: false },
  { id: 4, isNew: false },
]

export function getFeaturedProducts() {
  return featuredProductConfig.map(({ id, isNew }) => {
    const product = menuProducts.find((item) => item.id === id)
    return { ...product, isNew }
  })
}

export const allMenuProducts = [...menuProducts, ...coffeeMenu]
