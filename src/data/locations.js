export const bakeryLocations = [
  {
    id: 1,
    title: 'Пекарня & Кофейня Жак-Андрэ',
    address: 'Пролетарская ул., 449, Майкоп',
    dropdownLabel: 'Пролетарская ул., 449',
    phone: '+7 (953) 093-88-34',
    hoursDetailed: 'Ежедневно с 08:00 до 20:00',
    hoursFooter: 'Пн-Вс: 08:00 — 20:00',
    image: new URL('../assets/images/proletarskaya.webp', import.meta.url).href,
    mapLink: 'https://yandex.ru/maps/?text=Майкоп+Пролетарская+449+Жак-Андрэ',
  },
  {
    id: 2,
    title: 'Пекарня & Кофейня Жак-Андрэ',
    address: 'Первомайская ул., 193, Майкоп',
    dropdownLabel: 'Первомайская ул., 193',
    phone: '+7 (900) 246-20-50',
    hoursDetailed: 'Ежедневно с 08:00 до 20:00',
    hoursFooter: 'Пн-Вс: 08:00 — 20:00',
    image: new URL('../assets/images/pervomaiskaya.webp', import.meta.url).href,
    mapLink: 'https://yandex.ru/maps/?text=Майкоп+Первомайская+193+Жак-Андрэ',
  },
  {
    id: 3,
    title: 'Пекарня & Кофейня Жак-Андрэ',
    address: 'Шоссейная ул., 1В, Майкоп (1 этаж)',
    dropdownLabel: 'Шоссейная ул., 1В (1 этаж)',
    phone: '+7 (953) 078-45-98',
    hoursDetailed: 'Ежедневно с 08:00 до 20:00',
    hoursFooter: 'Пн-Вс: 08:00 — 20:00',
    image: new URL('../assets/images/schoseinaya.webp', import.meta.url).href,
    mapLink: 'https://yandex.ru/maps/?text=Майкоп+Шоссейная+1В+Жак-Андрэ',
  },
]

export const cartAddressOptions = bakeryLocations.map((location) => location.dropdownLabel)
