document.addEventListener('DOMContentLoaded', () => {
    const contentBox = document.getElementById('dynamic-content');
    const navButtons = document.querySelectorAll('.nav-tab-btn');

    // Базы данных контента разделов
    const contentData = {
        marketplaces: `
            <section class="hero">
                <mark class="hero-tag">ИНФОГРАФИКА ВЫСШЕГО УРОВНЯ</mark>
                <h1>ДИЗАЙН, КОТОРЫЙ <span>ПРОДАЕТ</span> НА WB</h1>
                <p>Выжимаю максимум CTR из обложки. Перевожу характеристики товара в визуальные смыслы.</p>
                <a href="#calc" class="cta-btn"><span>Рассчитать проект</span></a>
            </section>
            <section class="pricing">
                <div class="grid">
                    <div class="card"><div class="card-title">Главный слайд</div><div class="price">1 500 <span>₽</span></div><ul class="features"><li>Обложка для высокого CTR</li><li>Анализ конкурентов</li><li>2 круга правок бесплатно</li><li class="paid-fix">Правки далее — 200 ₽</li></ul></div>
                    <div class="card featured"><div class="card-title">Пак 5 слайдов</div><div class="price">4 300 <span>₽</span></div><ul class="features"><li>1 Главный + 4 Доп. слайда</li><li>Полная воронка продаж</li><li>Выгода 700 ₽</li><li>По 2 круга правок бесплатно</li><li class="paid-fix" style="color:#00ff66">Правки далее — 200 ₽</li></ul></div>
                    <div class="card"><div class="card-title">Доп. слайд</div><div class="price">700 <span>₽</span></div><ul class="features"><li>Свойства и детали товара</li><li>Строго в общем стиле</li><li>2 круга правок бесплатно</li><li class="paid-fix">Правки далее — 200 ₽</li></ul></div>
                </div>
                <div class="calculator" id="calc">
                    <div class="calc-title">КОНСТРУКТОР СТОИМОСТИ</div>
                    <div class="calc-tabs">
                        <button class="tab-btn active" data-tab="single">Поштучно</button>
                        <button class="tab-btn" data-tab="package">Карточками (1+4)</button>
                    </div>
                    <div class="calc-content active" id="tab-single">
                        <div class="calc-inputs">
                            <div class="input-group"><label>Главные</label><div class="counter"><button class="minus">—</button><input id="mainCount" value="1" readonly><button class="plus">+</button></div></div>
                            <div class="input-group"><label>Дополнительные</label><div class="counter"><button class="minus">—</button><input id="subCount" value="4" readonly><button class="plus">+</button></div></div>
                        </div>
                        <div class="input-group extra-fixes-group"><label>Доп. правки (сверх 2-х)</label><div class="counter"><button class="minus">—</button><input id="fixCount" value="0" readonly><button class="plus">+</button></div></div>
                    </div>
                    <div class="calc-content" id="tab-package">
                        <div class="calc-inputs"><div class="input-group" style="max-width:320px;margin:0 auto;"><label>Количество карточек</label><div class="counter"><button class="minus">—</button><input id="packCount" value="1" readonly><button class="plus">+</button></div></div></div>
                    </div>
                    <div class="total-box"><p>Итого:</p><div class="total-price"><span id="totalPrice">4300</span> ₽</div></div>
                </div>
            </section>`,
        gamedev: `
            <section class="hero">
                <mark class="hero-tag" style="color:#00e5ff">UNITY 6 + C# DEVELOPER</mark>
                <h1>ИГРЫ ПОД КЛЮЧ: <span>ОТ ИДЕИ</span> ДО РЕЛИЗА</h1>
                <p>Middle Unity разработчик, опыт 2+ года. Создаю очень реалистичную картинку, чистый код и отдаю исходники.</p>
            </section>
            <section class="pricing">
                <div class="grid">
                    <div class="card"><div class="card-title" style="color:#00e5ff">Платформы</div><div class="price" style="font-size:1.8rem">PC & MOBILE</div><ul class="features"><li>Оптимизация iOS / Android</li><li>Стабильный FPS на ПК</li><li>Адаптивный UI под экраны</li></ul></div>
                    <div class="card" style="border-color:#00e5ff"><div class="card-title" style="color:#00e5ff">Графика</div><div class="price" style="font-size:1.8rem">РЕАЛИЗМ</div><ul class="features"><li>Очень реалистичный визуал</li><li>Настройка света и шейдеров</li><li>Высокая производительность</li></ul></div>
                    <div class="card"><div class="card-title" style="color:#00e5ff">Сервис</div><div class="price" style="font-size:1.8rem">ПОД КЛЮЧ</div><ul class="features"><li>Полный цикл разработки</li><li>Чистый исходник на руки</li><li>Полноценное тестирование механик</li></ul></div>
                </div>
                <div class="game-price-notice">
                    <div class="notice-badge">ИНФО</div><h3>Стоимость разработки</h3>
                    <p>ОБСУЖДАЕТСЯ ОТДЕЛЬНО</p><span>Цена зависит строго от вашего технического задания (ТЗ).</span>
                </div>
            </section>`
    };

    let currentMode = 'single';

    function initCalculator() {
        const totalPriceEl = document.getElementById('totalPrice');
        if (!totalPriceEl) return;

        const mainCount = document.getElementById('mainCount');
        const subCount = document.getElementById('subCount');
        const fixCount = document.getElementById('fixCount');
        const packCount = document.getElementById('packCount');

        function calc() {
            let total = 0;
            if (currentMode === 'single') {
                const m = parseInt(mainCount.value) || 0;
                const s = parseInt(subCount.value) || 0;
                const f = parseInt(fixCount.value) || 0;
                total = (m === 1 && s === 4) ? 4300 : (m * 1500) + (s * 700);
                total += (f * 200);
            } else {
                total = (parseInt(packCount.value) || 0) * 4300;
            }
            totalPriceEl.innerText = total;
        }

        // Переключение под-вкладок поштучно/пакетно внутри маркетплейсов
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.calc-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                currentMode = btn.getAttribute('data-tab');
                document.getElementById(`tab-${currentMode}`).classList.add('active');
                calc();
            });
        });

        // Плюс / Минус логика
        document.querySelectorAll('.counter').forEach(cnt => {
            const input = cnt.querySelector('input');
            cnt.querySelector('.minus').onclick = () => { if(input.value > 0) { input.value--; calc(); }};
            cnt.querySelector('.plus').onclick = () => { input.value++; calc(); };
        });
    }

    function switchTab(target) {
        contentBox.innerHTML = contentData[target];
        
        if (target === 'gamedev') {
            document.documentElement.style.setProperty('--accent', '#00e5ff');
            document.documentElement.style.setProperty('--accent-rgb', '0, 229, 255');
        } else {
            document.documentElement.style.setProperty('--accent', '#00ff66');
            document.documentElement.style.setProperty('--accent-rgb', '0, 255, 102');
            initCalculator();
        }
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            switchTab(btn.getAttribute('data-target'));
        });
    });

    // Запуск первой вкладки по умолчанию
    switchTab('marketplaces');
});
