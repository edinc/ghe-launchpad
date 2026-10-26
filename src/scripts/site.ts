// Click-to-load YouTube: nothing is requested from YouTube until the reader presses play.
for (const figure of document.querySelectorAll<HTMLElement>('[data-video-embed]')) {
	const button = figure.querySelector('.video__play');
	button?.addEventListener('click', () => {
		const iframe = document.createElement('iframe');
		iframe.src = figure.dataset.videoEmbed ?? '';
		iframe.title = figure.dataset.videoTitle ?? 'YouTube video';
		iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
		iframe.allowFullscreen = true;
		iframe.referrerPolicy = 'strict-origin-when-cross-origin';
		figure.classList.add('is-playing');
		figure.querySelector('.video__frame')?.replaceChildren(iframe);
		iframe.focus();
	});
}

for (const button of document.querySelectorAll('[data-print]')) {
	button.addEventListener('click', () => window.print());
}

// Arrows in the sketches draw themselves in once they scroll into view.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-drawn');
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.3 }
	);
	for (const svg of document.querySelectorAll('.sk-figure svg')) {
		if (!svg.querySelector('.sk-draw')) continue;
		const box = svg.getBoundingClientRect();
		if (box.top < window.innerHeight && box.bottom > 0) continue;
		svg.classList.add('will-draw');
		observer.observe(svg);
	}
}
