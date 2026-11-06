# Лекция 5: JavaScript

# Част 1: Въведение

## 1. Какво е JavaScript?

| | Отговаря за | Аналогия |
|---|---|---|
| **HTML** | Какво е съдържанието | Стените и стаите |
| **CSS** | Как изглежда | Боята и мебелите |
| **JavaScript** | Какво **прави** страницата | Електричеството: ключове, звънец, осветление |

- **Изпълнява се в браузъра,** на компютъра на потребителя. (Може и на сървър, с Node.js, но това не е тема днес.)
- **Динамично типизиран:** една променлива може да държи число, после текст. Типът не се пише.
- **Функциите са стойности:** може да ги пазите в променливи и да ги подавате на други функции.
- **ECMAScript** е името на стандарта. Версията от 2015 г. (ES2015, или ES6) донесе `let`, `const`, стрелкови функции, шаблонни низове и много друго. Днес всички браузъри я поддържат, и ние пишем на нея.

---

## 2. Как добавяме JavaScript

```html
<head>
    <script src="app.js" defer></script>
</head>
```

- **Външен файл,** като при CSS: един файл за всички страници, браузърът го кешира.
- **`defer`** казва: „изтегли файла веднага, но го изпълни **чак след като целият HTML е прочетен**". Без `defer` скриптът спира четенето на HTML-а и не вижда елементите под себе си.
- Може и `<script>…</script>` с кода направо в страницата, но само за малки примери.

> ⚠️ Най-честата грешка в началото: скрипт без `defer` в `<head>` търси елемент, който браузърът още не е прочел, и получава `null`.

---

## 3. Конзолата: вашата пясъчна кутия

**F12 → Console.** Тук може да пишете JavaScript и да виждате резултата веднага.

```js
console.log('Здравей!');          // извежда текст
console.log(2 + 3);                // 5
console.error('Нещо се обърка');   // червено съобщение
console.table([{ name: 'Ана', age: 20 }, { name: 'Иван', age: 22 }]);  // като таблица
```

- **Грешките** в кода ви се появяват тук в червено, с файл и номер на ред. Кликнете върху тях.
- **Sources** е таб, в който може да спрете кода на даден ред (breakpoint) и да разгледате стойностите стъпка по стъпка.

---

## 4. Променливи и типове

```js
const name = 'Мария';   // const: не може да се присвои отново
let age = 20;           // let: може да се променя
age = 21;               // ✅
// name = 'Ива';        // ❌ грешка: name е const
```

| Ключова дума | Кога |
|---|---|
| `const` | **По подразбиране.** Повечето стойности не се сменят. |
| `let` | Когато стойността ще се промени (брояч, сума). |
| `var` | ❌ Стар начин. Ще го срещнете в по-стар код, но не го ползвайте: държи се неочаквано (вижте раздел 14). |

### Типове

| Тип | Пример | `typeof` |
|---|---|---|
| Число | `42`, `3.14` | `'number'` |
| Текст (низ) | `'текст'`, `"текст"` | `'string'` |
| Логическа стойност | `true`, `false` | `'boolean'` |
| Без стойност | `let x;` | `'undefined'` |
| Нарочно празно | `null` | `'object'` (❗ стара грешка в езика) |
| Масив | `[1, 2, 3]` | `'object'` |
| Обект | `{ name: 'Ана' }` | `'object'` |
| Функция | `function () {}` | `'function'` |

```js
const course = 'Уеб технологии';
const credits = 5;

// Шаблонен низ: в обратни кавички, стойностите влизат с ${ }
console.log(`Курсът ${course} е за ${credits} кредита.`);
```

> 💡 `undefined` значи „още няма стойност", а `null` значи „нарочно е празно".

### Полезни методи за низове

```js
const text = '  Уеб Технологии  ';

text.length            // 18: брой символи, включително интервалите
text.trim()            // 'Уеб Технологии': маха интервалите в началото и края
text.toLowerCase()     // '  уеб технологии  '
text.includes('Уеб')   // true
```

---

## 5. Сравнение: `===` срещу `==`

```js
5 === 5      // true
5 === '5'    // false: различни типове
5 == '5'     // true  (!): == превръща типовете, преди да сравни
0 == ''      // true  (!)
null == undefined  // true (!)
```

> ✅ **Винаги използвайте `===` и `!==`.** `==` прави скрити преобразувания, които водят до странни грешки.

### Truthy и falsy

В `if` всяка стойност се превръща в `true` или `false`. Тези са **falsy** (броят се за `false`):

```js
false, 0, '', null, undefined, NaN
```

Всичко останало е **truthy**, включително `'0'`, `'false'`, `[]` и `{}`.

```js
const username = '';
if (!username) {
    console.log('Въведете потребителско име');  // изпълнява се: '' е falsy
}
```

---

## 6. Масиви

```js
const fruits = ['ябълка', 'банан', 'круша'];

fruits[0]           // 'ябълка' (броенето започва от 0)
fruits.length       // 3
fruits.push('киви')       // добавя в края → ['ябълка', 'банан', 'круша', 'киви']
fruits.pop()              // маха последния и го връща → 'киви'
fruits.includes('банан')  // true
fruits.indexOf('круша')   // 2 (или -1, ако го няма)
```

| Метод | Какво прави | Променя ли масива? |
|---|---|---|
| `push(x)` / `pop()` | Добавя / маха **в края** | ✅ |
| `unshift(x)` / `shift()` | Добавя / маха **в началото** | ✅ |
| `slice(start, end)` | Копие на част от масива (без `end`) | ❌ |
| `splice(start, count)` | **Изрязва** `count` елемента от `start` | ✅ |
| `includes(x)` | Има ли го? `true` / `false` | ❌ |
| `join(', ')` | Слепва елементите в низ | ❌ |
| `sort()` | Подрежда | ✅ |

### Обхождане и преобразуване

```js
const prices = [3.20, 3.80, 2.50];

prices.forEach(price => console.log(price));        // за всеки елемент

const withVat = prices.map(price => price * 1.2);    // нов масив: [3.84, 4.56, 3]
const cheap = prices.filter(price => price < 3);     // нов масив: [2.5]
const first = prices.find(price => price > 3);       // първият, който отговаря: 3.2
const total = prices.reduce((sum, price) => sum + price, 0);  // сбор: 9.5
```

> 💡 `map`, `filter`, `find` и `reduce` **не променят** оригиналния масив, а връщат нов резултат.

---

## 7. Обекти

Двойки **ключ → стойност**:

```js
const student = {
    name: 'Иван',
    fn: '0MI0600123',
    year: 2,
    courses: ['Уеб технологии', 'Бази данни']
};

student.name          // 'Иван' (за предпочитане)
student['fn']         // '0MI0600123' (когато ключът е в променлива)
student.year = 3;     // промяна
student.email = 'ivan@example.com';  // нов ключ

Object.keys(student)     // ['name', 'fn', 'year', 'courses', 'email']
Object.values(student)   // ['Иван', '0MI0600123', 3, [...], 'ivan@example.com']

for (const [key, value] of Object.entries(student)) {
    console.log(`${key}: ${value}`);
}
```

> 💡 `const` на обект значи, че **не може да присвоите нов обект** на променливата. Ключовете вътре **може** да се променят.

---

## 8. Функции

```js
// Декларация
function add(a, b) {
    return a + b;
}

// Стрелкова функция: кратък запис
const multiply = (a, b) => a * b;

// Стойност по подразбиране
function greet(name = 'гост') {
    return `Здравей, ${name}!`;
}

add(1, 2)        // 3
add(1, 2, 5)     // 3: допълнителните аргументи се игнорират
add(1)           // NaN: b е undefined, а 1 + undefined не е число
greet()          // 'Здравей, гост!'
```

**Функциите са стойности.** Затова може да подадете функция на друга функция, както при `forEach` и `map` горе, и при събитията долу.

---

## 9. Условия и цикли

```js
const grade = 5;

if (grade >= 5.5) {
    console.log('Отличен');
} else if (grade >= 4.5) {
    console.log('Много добър');
} else {
    console.log('Продължавай');
}

// Тернарен оператор: кратко if/else, което връща стойност
const result = grade >= 3 ? 'взет' : 'невзет';

switch (grade) {
    case 6: console.log('Отличен'); break;
    case 5: console.log('Много добър'); break;
    default: console.log('Друго');
}
```

```js
const cars = ['Audi', 'BMW', 'Opel'];

for (let i = 0; i < cars.length; i++) {   // класически цикъл с брояч
    console.log(i, cars[i]);
}

for (const car of cars) {                  // за всеки елемент
    console.log(car);
}

let count = 3;
while (count > 0) {
    console.log(count);
    count--;
}
```

> 💡 `for...of` обхожда **стойностите** на масив. `for...in` обхожда **ключовете** на обект. За масиви използвайте `for...of` или `forEach`.

---

## 10. DOM: JavaScript и HTML

Браузърът превръща HTML-а в **DOM** дърво, а `document` е входът към него. Чрез него JavaScript може да чете и променя страницата.

### Избиране на елементи

```html
<h1 id="title">Меню</h1>
<ul>
    <li class="food">Пица</li>
    <li class="drink">Вода</li>
    <li class="drink">Чай</li>
</ul>
```

```js
const title = document.querySelector('#title');          // ПЪРВИЯТ елемент по CSS селектор
const drinks = document.querySelectorAll('.drink');      // ВСИЧКИ: списък (NodeList)
const byId = document.getElementById('title');           // по id (стар, но бърз начин)

drinks.forEach(drink => console.log(drink.textContent)); // Вода, Чай
```

> 💡 `querySelector` приема **същите селектори като CSS**: `'#id'`, `'.class'`, `'ul > li'`, `'input[type="email"]'`.

### Промяна на елементи

```js
title.textContent = 'Нашето меню';        // сменя текста
title.classList.add('highlight');          // добавя клас
title.classList.remove('highlight');       // маха клас
title.classList.toggle('highlight');       // добавя, ако го няма; маха, ако го има
title.style.color = 'red';                 // inline стил (по-добре чрез клас)

const input = document.querySelector('#email');
input.value                                // какво е написано в полето
```

```html
<button data-filter="done">Изпълнени</button>
```

```js
button.dataset.filter                      // 'done': стойността на атрибута data-filter
```

### Създаване и махане

```js
const item = document.createElement('li');    // нов <li>, още не е на страницата
item.textContent = 'Кафе';
item.classList.add('drink');
document.querySelector('ul').append(item);    // вече е на страницата

item.remove();                                 // маха го
```

> 🔒 **`textContent` срещу `innerHTML`:** `innerHTML` чете текста като **HTML**. Ако там влезе нещо, въведено от потребител, той може да вкара собствен `<script>` или `<img onerror="…">` в страницата (XSS). **За текст от потребител винаги използвайте `textContent`.**

---

## 11. Събития

Браузърът постоянно „съобщава", че нещо се е случило: клик, натиснат клавиш, изпратена форма. Може да закачите функция, която да се изпълни при това.

```js
const button = document.querySelector('#hello');

button.addEventListener('click', function (event) {
    console.log('Кликнато!', event);   // event съдържа подробности за събитието
});
```

| Събитие | Кога |
|---|---|
| `click` | Клик (и Enter/Space на бутон) |
| `input` | Всяка промяна на стойността на поле, докато пишете |
| `change` | Промяна, след като полето загуби фокус (или избор в `<select>`) |
| `submit` | Изпращане на форма |
| `keydown` | Натиснат клавиш |
| `DOMContentLoaded` | HTML-ът е прочетен изцяло (с `defer` не ви трябва) |

### Спиране на действието по подразбиране

```js
const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();   // формата НЕ се изпраща и страницата не се презарежда
    console.log('Ще проверим данните първо');
});
```

---

## 12. JSON

**JSON** е **текстов** формат за данни, който изглежда почти като JavaScript обект. Така се обменят данни между браузъра и сървъра.

```json
{
    "name": "Иван",
    "year": 2,
    "courses": ["Уеб технологии", "Бази данни"],
    "graduated": false,
    "email": null
}
```

**Правила:**
- Ключовете и низовете са **задължително в двойни кавички.**
- Стойностите може да са само: низ, число, обект, масив, `true`, `false`, `null`. **Без функции.**

```js
const student = { name: 'Иван', year: 2 };

const text = JSON.stringify(student);   // обект → JSON текст: '{"name":"Иван","year":2}'
const back = JSON.parse(text);          // JSON текст → обект
```

---

## 13. Заявки към сървъра: `fetch`

`fetch` взима данни от сървъра **без да презарежда страницата**. Отговорът идва след известно време, затова кодът **изчаква** с `await`.

```js
// GET: взимаме данни
async function loadUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();   // JSON текст → масив от обекти
    console.log(users);
}

loadUsers();
```

```js
// POST: изпращаме данни като JSON
async function sendMessage() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Здравей', body: 'Първо съобщение' })
    });
    const result = await response.json();
    console.log(result);   // сървърът връща изпратеното + id
}
```

- **`async`** пред функцията позволява да ползвате `await` вътре.
- **`await`** казва „изчакай този резултат, преди да продължиш".
- **`response.ok`** е `true`, ако сървърът е отговорил успешно (статус 200–299).
- **JSONPlaceholder** (`jsonplaceholder.typicode.com`) е безплатен тестов сървър: връща примерни данни и „приема" POST заявки, без да ги запазва.

> 💡 Тази техника се нарича **AJAX**: страницата си говори със сървъра „на заден план".

---

## 14. Странностите на JavaScript

JavaScript е създаден за 10 дни през 1995 г., и някои решения оттогава остават завинаги, за да не се чупят стари сайтове.

```js
0.1 + 0.2              // 0.30000000000000004 (както в повечето езици)
typeof null            // 'object'
NaN === NaN            // false: NaN не е равно дори на себе си
'5' + 3                // '53': + с низ слепва
'5' - 3                // 2: - превръща в число
[] + []                // ''
[1, 2] + [3]           // '1,23'
```

**`var` и hoisting:**

```js
console.log(x);   // undefined (не грешка!): декларацията е „издигната" нагоре
var x = 5;

console.log(y);   // ❌ грешка: с let/const това не е позволено
let y = 5;
```

**Пропуснати `;`:** JavaScript сам добавя точка и запетая, където реши, че трябва. Почти винаги познава, но не винаги. Пишете ги.

> 🎬 Кратко и смешно видео за странностите: „WAT" на Гари Бърнхард (около 4 минути, частта за JavaScript е от 1:21).

---

# Част 2: Задача

## Списък със задачи

**Цел:** упражнение на `fetch`, JSON, масиви, DOM и събития.

Създайте страница, която зарежда задачи от тестовия сървър JSONPlaceholder и позволява да се отбелязват като изпълнени и да се добавят нови.

**Условия:**
- Заредете задачите от `https://jsonplaceholder.typicode.com/todos?userId=1` с `fetch()`. Всяка задача е обект със свойства `title` и `completed`.
- Изведете задачите в списък (`<ul>`) чрез `document.createElement()`.
- Изпълнените задачи (`completed: true`) получават CSS клас `done` и са зачеркнати.
- Клик върху задача сменя състоянието ѝ (изпълнена ↔ неизпълнена).
- Под списъка показвайте `Изпълнени: 5 от 20` и обновявайте след всяка промяна.
- Добавете поле и бутон за нова задача. Празна задача не се добавя.
- Новата задача се изпраща с `POST` към `https://jsonplaceholder.typicode.com/todos` като JSON и се добавя в списъка, след като сървърът отговори.

**Бонус:** бутони „Всички", „Изпълнени" и „Неизпълнени", които филтрират списъка.

**Забележки:**
- `?userId=1` в адреса казва на сървъра да върне само задачите на потребител 1 (20 броя). Отворете адреса в браузъра, за да видите как изглеждат данните.
- Заглавията на задачите са на латински (примерен текст).
- Сървърът не запазва новите задачи: след презареждане те изчезват. За всяка нова задача връща номер 201.
- Без `alert()`: съобщенията се показват на страницата.

---

## Ресурси

- 📚 Справочник за JavaScript (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript
- 📚 DOM и събития (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- 🧪 Тестов сървър с примерни данни: https://jsonplaceholder.typicode.com
