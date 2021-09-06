<h1 align="center">SoccerStat</h1>

<p align="center">
<img src="https://img.shields.io/badge/react-17.0.2-blue">
<img src="https://img.shields.io/badge/made%20by-EmonamontE-green">
<img src="https://img.shields.io/badge/version-1.0.0-brightgreen">
<a href="https://codeclimate.com/github/EmonamontE/SoccerStat/maintainability"><img src="https://api.codeclimate.com/v1/badges/699b23798865795cbafc/maintainability" /></a>
</p>

## Описание:

Приложение SoccerStat с нуля реализовано на **React**. Оно включает в себя 4 страницы:

- Список лиг
- Список команд
- Календарь лиги
- Календарь команды

Данные для каждой страницы получаются после обращения к публичному API.

**Важно:** Используется бесплатный тариф API. Имеется доступ только к 12 лигам, а количество обращений составляет 10 штук в минуту.

**Кроме того:** Для использования окружения используется файл `.env`. Для корректной работы скачайте проект и в корневой
директории создайте файл `.env` с парой `REACT_APP_API_KEY=ВАШ_ИНДИВИДУАЛЬНЫЙ_КЛЮЧ`.

# Страницы

## Список лиг

![picture](https://github.com/EmonamontE/SoccerStat/blob/main/readme_assets/ListOfLeagues.PNG)

## Список команд

На данной странице приведен список команд Английской премьер-лиги:

![picture](https://github.com/EmonamontE/SoccerStat/blob/main/readme_assets/ListOfTeams.PNG)

## Календарь лиги

![picture](https://github.com/EmonamontE/SoccerStat/blob/main/readme_assets/LeagueCalendar_1.PNG)
![picture](https://github.com/EmonamontE/SoccerStat/blob/main/readme_assets/LeagueCalendar_2.PNG)

## Календарь одной команды

![picture](https://github.com/EmonamontE/SoccerStat/blob/main/readme_assets/TeamCalendar.PNG)

## Возможные ошибки

При попытке получить данные о лиге, не предусмотренной в бесплатной версии используемого API:

![picture](https://github.com/EmonamontE/SoccerStat/blob/main/readme_assets/LeaguesError.PNG)

Ошибка о превышении количества запросов:

![picture](https://github.com/EmonamontE/SoccerStat/blob/main/readme_assets/RequestError.PNG)

## Установка и запуск

- Скачайте репозиторий;
- Создайте файл `.env` в корневой директории с парой `REACT_APP_API_KEY=ВАШ_ИНДИВИДУАЛЬНЫЙ_КЛЮЧ`;
- Из корневой директории проекта запустите:
```
npm start
```