// Объект для хранения данных графика
let chartData = {
    labels: [], // Массив для меток (подписей) по оси X
    datasets: [{ // Массив наборов данных
        label: '# of Values', // Подпись для набора данных
        data: [], // Массив значений для графика
        backgroundColor: [ // Массив цветов фона для каждого элемента графика
            'rgba(255, 99, 132, 0.5)', // Цвет для первого элемента
            'rgba(54, 162, 235, 0.5)', // Цвет для второго элемента
            'rgba(255, 206, 86, 0.5)', // Цвет для третьего элемента
            'rgba(75, 192, 192, 0.5)', // Цвет для четвертого элемента
            'rgba(153, 102, 255, 0.5)', // Цвет для пятого элемента
            'rgba(255, 159, 64, 0.5)' // Цвет для шестого элемента
        ],
        borderColor: [ // Массив цветов границ для каждого элемента графика
            'rgba(255, 99, 132, 1)', // Цвет границы для первого элемента
            'rgba(54, 162, 235, 1)', // Цвет границы для второго элемента
            'rgba(255, 206, 86, 1)', // Цвет границы для третьего элемента
            'rgba(75, 192, 192, 1)', // Цвет границы для четвертого элемента
            'rgba(153, 102, 255, 1)', // Цвет границы для пятого элемента
            'rgba(255, 159, 64, 1)' // Цвет границы для шестого элемента
        ],
        borderWidth: 1 // Ширина границы
    }]
};

// Функция для создания графика
function createChart(type, height = 400) {
    const canvasContainer = document.getElementById('canvas-container'); // Получаем контейнер для графика
    canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`; // Создаем элемент canvas для графика
    canvasContainer.style.height = `${height}px`; // Устанавливаем высоту контейнера

    const ctx = document.getElementById('myChart').getContext('2d'); // Получаем контекст рисования для canvas
    return new Chart(ctx, { // Создаем новый график
        type: type, // Тип графика (например, 'bar', 'line' и т.д.)
        data: chartData, // Данные для графика
        options: { // Опции для настройки графика
            scales: { // Настройки осей
                y: { // Настройки оси Y
                    beginAtZero: true // Начинаем ось Y с нуля
                }
            },
            onClick: (event, activeElements) => { // Обработчик клика по графику
                if (activeElements.length > 0) { // Если есть активные элементы (например, столбцы)
                    const { datasetIndex, index } = activeElements[0]; // Получаем индекс набора данных и индекс элемента
                    removeData(datasetIndex, index); // Удаляем данные по индексу
                }
            },
            tooltips: { // Настройки всплывающих подсказок
                mode: 'index', // Режим отображения подсказок по индексу
                intersect: false // Подсказки не будут пересекаться с элементами
            },
            hover: { // Настройки наведения
                mode: 'index', // Режим наведения по индексу
                intersect: false // Элементы не должны пересекаться при наведении
            }
        }
    });
}

// Создаем начальный график с типом 'bar' и высотой по умолчанию 400
let myChart = createChart('bar'); 

// Функция для добавления данных в график
function addData() {
    const labelInput = document.getElementById('labelInput'); // Получаем элемент ввода для метки
    const dataInput = document.getElementById('dataInput'); // Получаем элемент ввода для данных

    if (labelInput.value && dataInput.value) { // Проверяем, что оба поля заполнены
        chartData.labels.push(labelInput.value); // Добавляем метку в массив меток
        chartData.datasets.forEach((dataset) => { // Проходим по всем наборам данных
            dataset.data.push(dataInput.value); // Добавляем значение в массив данных текущего набора данных
        });
        myChart.update(); // Обновляем график, чтобы отобразить новые данные
        labelInput.value = ''; // Очищаем поле ввода метки
        dataInput.value = ''; // Очищаем поле ввода данных
    }
}

// Функция для обновления типа графика
function updateChartType() {
    const selectedType = document.getElementById('chartType').value; // Получаем выбранный тип графика из выпадающего списка
    myChart.destroy(); // Уничтожаем старый график, чтобы освободить ресурсы
    myChart = createChart(selectedType); // Создаем новый график с выбранным типом
}

// Функция для удаления данных из графика
function removeData(datasetIndex, index) {
    if (chartData.labels.length > index) { // Проверяем, что индекс находится в пределах массива меток
        chartData.labels.splice(index, 1); // Удаляем метку по индексу
        chartData.datasets[datasetIndex].data.splice(index, 1); // Удаляем значение из набора данных по индексу
        myChart.update(); // Обновляем график, чтобы отобразить изменения
    }
}