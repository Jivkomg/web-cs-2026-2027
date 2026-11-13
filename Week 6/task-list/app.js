// =====================================================================
// Итерация 5 (бонус): филтри
// Ново спрямо итерация 4: currentFilter, getVisibleTodos() и бутоните за филтриране
// =====================================================================

const API = 'https://jsonplaceholder.typicode.com/todos';

// Всички задачи се пазят в този масив. Страницата се рисува по него.
let todos = [];

// НОВО: текущият филтър: 'all', 'done' или 'open'
let currentFilter = 'all';

const list = document.querySelector('#list');
const statusMessage = document.querySelector('#status');
const summary = document.querySelector('#summary');
const form = document.querySelector('#add-form');
const input = document.querySelector('#new-todo');
const formMessage = document.querySelector('#form-message');


// ---------- Зареждане ----------

async function loadTodos() {
    statusMessage.textContent = 'Зареждане…';

    try {
        // ?userId=1: само задачите на потребител 1 (20 броя)
        const response = await fetch(`${API}?userId=1`);

        if (!response.ok) {
            throw new Error(`Сървърът върна статус ${response.status}`);
        }

        todos = await response.json();   // JSON текст → масив от обекти
        statusMessage.textContent = '';
        render();
    } catch (error) {
        statusMessage.textContent = `Грешка при зареждане: ${error.message}`;
        statusMessage.classList.add('error');
    }
}


// ---------- Извеждане ----------

// НОВО: връща задачите, които трябва да се виждат според филтъра
function getVisibleTodos() {
    if (currentFilter === 'done') {
        return todos.filter(todo => todo.completed);
    }
    if (currentFilter === 'open') {
        return todos.filter(todo => !todo.completed);
    }
    return todos;
}

// Създава един <li> за една задача
function createTodoItem(todo) {
    const item = document.createElement('li');
    item.textContent = todo.title;

    // изпълнените задачи получават клас done
    if (todo.completed) {
        item.classList.add('done');
    }

    // клик сменя състоянието: изпълнена ↔ неизпълнена
    item.addEventListener('click', function () {
        todo.completed = !todo.completed;   // ! обръща true ↔ false
        render();                            // рисуваме наново
    });

    return item;
}

// Рисува списъка наново
function render() {
    list.textContent = '';   // изчиства стария списък
    // ПРОМЯНА: рисуваме само видимите задачи, а не всички
    getVisibleTodos().forEach(todo => list.append(createTodoItem(todo)));

    updateSummary();   // броячът се обновява след всяко рисуване
}

// „Изпълнени: 5 от 20"
function updateSummary() {
    const doneCount = todos.filter(todo => todo.completed).length;
    summary.textContent = `Изпълнени: ${doneCount} от ${todos.length}`;
}


// ---------- Добавяне ----------

form.addEventListener('submit', async function (event) {
    event.preventDefault();   // не презареждаме страницата

    const title = input.value.trim();   // trim: маха интервалите в началото и края
    formMessage.classList.remove('error');

    if (title === '') {
        formMessage.textContent = 'Въведете текст на задачата.';
        formMessage.classList.add('error');
        return;   // спираме тук: нищо не се добавя
    }

    formMessage.textContent = 'Изпращане…';

    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, completed: false, userId: 1 })
        });

        if (!response.ok) {
            throw new Error(`Сървърът върна статус ${response.status}`);
        }

        const created = await response.json();   // сървърът връща задачата с id

        todos.push(created);
        input.value = '';
        formMessage.textContent = `Добавена задача с номер ${created.id}.`;
        render();
    } catch (error) {
        formMessage.textContent = `Грешка при добавяне: ${error.message}`;
        formMessage.classList.add('error');
    }
});


// ---------- НОВО: Филтри ----------

document.querySelectorAll('.filter').forEach(function (button) {
    button.addEventListener('click', function () {
        currentFilter = button.dataset.filter;   // data-filter от HTML-а

        // активният бутон изглежда различно
        document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        render();
    });
});


loadTodos();
