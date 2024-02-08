import './style.scss';

import { apiKey } from './config.ts';

// Указание координат моего местоположения
let center = [43.114858, 132.356031];
function init() {
	// Создание карты.
	// @ts-ignore
	let map: any = new ymaps.Map('map', {
		// Координаты центра карты.
		center: center,
		// Уровень масштабирования.
		zoom: 15,
		controls: ['routePanelControl'],
	});
	// Указание метки
	// @ts-ignore
	let placemark = new ymaps.Placemark(
		[43.114858, 132.356031],
		{
			balloonContentHeader: 'Мой дом',
			balloonContentBody: 'Здесь я живу',
		},
		{}
	);
	map.geoObjects.add(placemark);

	let control = map.controls.get('routePanelControl');
	control.routePanel.state.set({
		type: 'masstransit',
		fromEnabled: false,
		from: center,
	});
}
// map.geoObjects.add(placemark)
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
		// @ts-ignore
		ymaps.ready(init);
	} catch (error) {
		console.error('Failed to load Yandex Maps API:', error);
	}
})();
