import './style.scss';

import { apiKey } from './config.ts';

function init() {
	// Создание карты.
	let map: any = new ymaps.Map('map', {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		center: [43.114858, 132.356031],
		// Уровень масштабирования.
		zoom: 15,
	});
}

function loadMapScript() {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
		script.async = true;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}

(async () => {
	try {
		await loadMapScript();
		ymaps.ready(init);
	} catch (error) {
		console.error('Failed to load Yandex Maps API:', error);
	}
})();
