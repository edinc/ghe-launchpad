import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { Window } from 'happy-dom';

export type Lang = 'en' | 'de';
type Component = Parameters<AstroContainer['renderToString']>[0];

let container: AstroContainer | undefined;

/** Render an Astro component to HTML as if it sat on a page in the given language. */
export async function render(
	component: Component,
	{ lang = 'en', props = {}, slots = {} }: { lang?: Lang; props?: Record<string, unknown>; slots?: Record<string, string> } = {}
) {
	container ??= await AstroContainer.create();
	const page = lang === 'de' ? '/ghe-launchpad/de/steps/prepare/' : '/ghe-launchpad/steps/prepare/';
	return container.renderToString(component, { props, slots, request: new Request(`http://localhost${page}`) });
}

/** Render and parse into a DOM for structural assertions. */
export async function renderDom(...args: Parameters<typeof render>) {
	const html = await render(...args);
	const { document } = new Window();
	document.body.innerHTML = html;
	return document;
}
