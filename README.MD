# PIANO / DJ — Minimal Portfolio

Минималистичный сайт-портфолио музыканта в стиле editorial minimalism.

## Структура

piano-dj-minimal/
├── index.html # Главная страница
├── style.css # Стили
├── script.js # JavaScript
├── assets/ # Медиафайлы
│ ├── favicon.svg
│ ├── piano-section.jpg # Замените на своё фото клавиш
│ └── dj-section.jpg # Замените на своё фото DJ-оборудования
└── README.md

## Что нужно заменить

### 1. Фотографии
- `assets/piano-section.jpg` — крупное фото клавиш пианино
- `assets/dj-section.jpg` — крупное фото DJ-оборудования

### 2. Контакты
В `index.html`, секция CONTACT:
```html
<a href="https://t.me/your_username">Telegram</a>
<a href="https://instagram.com/your_username">Instagram</a>
<a href="https://youtube.com/@your_channel">YouTube</a>

В index.html, секция ABOUT:

html
<h2 class="about-name">Ilya</h2>

Публикация на GitHub Pages
Создайте репозиторий на GitHub

Загрузите файлы проекта

Settings → Pages → Branch: main → Save

Сайт будет доступен по адресу: https://username.github.io/repo-name/

text

## Инструкция по использованию

### Замена фотографий

1. **PIANO секция**: Замените `assets/piano-section.jpg` на крупное, атмосферное фото клавиш пианино. Идеально — макросъёмка, ч/б или приглушённые тона.

2. **DJ секция**: Замените `assets/dj-section.jpg` на фото DJ-оборудования (CDJ, mixer, контроллер). Тёмное, атмосферное фото.

### Настройка цветов

Сайт почти монохромный. Чтобы изменить оттенок:

В `style.css`, секция `:root`:
```css
--color-bg: #0a0a0a;        /* Фон */
--color-text: #ffffff;       /* Текст */
--color-text-secondary: #888888;  /* Вторичный текст */
Изменение текста
Все тексты в index.html:

Hero: Learn music. Make music.

Piano: From zero to playing.

DJ: Learn to mix. Find your sound.

About: Piano since 6. DJing for 5 years.

Contact: Let's make music.

Просто найдите эти строки в HTML и замените.

Особенности дизайна
Огромная типографика: Заголовки PIANO и DJ занимают большую часть экрана

Полноэкранные фото: Изображения служат фоном секций

Минимум текста: Каждая секция — несколько слов

Монохромная палитра: Только чёрный, белый и оттенки серого

Тонкие линии: Кнопки с border-bottom вместо стандартных UI-элементов

Плавные анимации: Subtle scroll animations и hover-эффекты

Сайт полностью готов к использованию. Замените фотографии и контакты — и можно публиковать.

