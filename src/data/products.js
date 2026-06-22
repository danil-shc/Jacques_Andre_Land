export const menuProducts = [
  {
    id: 1,
    name: 'Круассан с лососем',
    description: 'Круассан Жак-Андрэ, творожно-сливочный крем на основе сыра и сливок, семга слабосоленая, листья салата',
    price: 389,
    category: 'Выпечка',
    image: 'croissant_losos',
  },
  {
    id: 2,
    name: 'Круассан с соусом песто',
    description: 'Круассан Жак-Андрэ, соус песто, моцарелла, томаты, листья салата. В состав соуса песто входят пикантный сыр пармезан, орешки кешью, сок лимона, петрушка, соль, перец, чеснок',
    price: 219,
    category: 'Выпечка',
    image: 'croissant_pesto',
  },
  {
    id: 3,
    name: 'Торт "Амели"',
    description: 'Торт «Амели» от «Жак-Андрэ» представляет собой нежные медовые коржи с какао и заварным кремом, сочетая домашний уют и французскую эстетику',
    price: 1399,
    category: 'Десерты',
    image: 'tort_ameli',
  },
  {
    id: 4,
    name: 'Торт "Карамельный"',
    description: 'Нежный десерт, в котором насыщенная солоновато-сливочная карамель гармонично сочетается с хрустящим миксом обжаренных орехов (грецкий орех, фундук и кешью) на плотной песочной основе',
    price: 999,
    category: 'Десерты',
    image: 'tort_caramel',
  },
  {
    id: 5,
    name: 'Торт "Фрезье"',
    description: '«Фрезье» — классический французский десерт с воздушным бисквитом, заварным кремом и обилием свежей клубники',
    price: 2299,
    category: 'Десерты',
    image: 'tort_frezie',
  },
  {
    id: 6,
    name: 'Торт "Jacques André"',
    description: 'Фирменный торт «Жак-Андрэ» представляет собой сытный десерт на основе плотной песочной корзинки, наполненной солоно-сливочной карамелью и обильным количеством обжаренных орехов, включая фундук, кешью и грецкий орех',
    price: 949,
    category: 'Десерты',
    image: 'tort_zhak_andre',
  },
  {
    id: 7,
    name: 'Лимонная тарталетка',
    description: 'Хрустящая песочная корзинка с шелковистым лимонным кремом и меренгой',
    price: 229,
    category: 'Десерты',
    image: 'limon_tartaletka',
  },
  {
    id: 8,
    name: 'Ореховая тарталетка',
    description: 'Песочная корзинка с насыщенной плотной основой, солено-сливочная карамель, обжаренный до золотистой корочки микс грецких орехов, фундука и кешью',
    price: 219,
    category: 'Десерты',
    image: 'tartaletka',
  },
  {
    id: 9,
    name: 'Макаронс',
    description: 'Классические французские миндальные пирожные с нежными кремовыми начинками',
    price: 69,
    category: 'Десерты',
    image: 'makaronc',
  },
  {
    id: 10,
    name: 'Ачма с курицей',
    description: 'Булочка из слоеного теста, копченая куриная грудка, горчично-медовый соус, ломтик омлета с добавлением перца и соли, помидоры, соленый огурчик, моцарелла, листья салата',
    price: 249,
    category: 'Выпечка',
    image: 'achma_kurica',
  },
  {
    id: 11,
    name: 'Клаб-сэндвич',
    description: 'Поджаренные ломтики хлеба, ветчина индейки, ломтик омлета с добавлением черного перца и соли, сыр тильзитер, томаты, листья салата, горчично-медовый соус',
    price: 229,
    category: 'Выпечка',
    image: 'club_sandwich',
  },
  {
    id: 12,
    name: 'Сырники',
    description: 'Творог, манка, белки, сахарная пудра. Яркие, обладающие неповторимым шармом сырники Жак-Андрэ подаются со сметаной, джемом или сгущенкой на выбор',
    price: 189,
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
      { id: 'c1', volume: '250мл', price: 179 },
      { id: 'c2', volume: '350мл', price: 209 },
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
      { id: 'c5', volume: '350мл', price: 249 },
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
      { id: 'c8', volume: '350мл', price: 249 },
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
