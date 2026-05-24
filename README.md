# lab-8

## Виконані вправи
1. **STREAM FILE TO RESPONSE** (`stream_response.js`) - Маршрут `GET /file`. Створення Readable Stream за допомогою `fs.createReadStream()` для прямої передачі локального файлу у HTTP-відповідь через `pipe`.
2. **STREAM UPLOAD** (`stream_upload.js`) - Маршрут `POST /upload`. Використання Writable Stream (`fs.createWriteStream()`) для збереження тіла вхідного запиту безпосередньо у локальний файл `upload.txt`.
3. **STREAM TRANSFORM** (`stream_transform.js`) - Маршрут `GET /upper`. Створення кастомного `Transform` стріму для маніпуляції даними "на льоту". Скріпт читає текстовий файл і переводить його вміст у верхній регістр під час передачі клієнту.
4. **STREAM COUNTER** (`stream_counter.js`) - Маршрут `POST /count`. Аналіз подій стріму (`data` та `end`). Скріпт рахує кількість отриманих чанків (chunks) та загальний розмір тіла запиту в байтах.
5. **STREAM ERRORS** (`stream_errors.js`) - Маршрут `GET /missing-file`. Реалізація безпечної обробки помилок стріму через слухач `readStream.on('error')`. Сервер коректно повертає `500 Internal Server Error`, уникаючи падіння процесу у випадку відсутності запитуваного файлу.

## Як запускати рішення

Всі сервери використовують вбудовані модулі Node.js (`http`, `fs`, `stream`). Для запуску відкрийте термінал у папці з проєктом та виконайте:

```bash
node <назва_файлу> <порт>
