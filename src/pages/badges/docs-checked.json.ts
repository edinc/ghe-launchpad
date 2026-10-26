import { getCollection } from 'astro:content';
import { docsCheckedBadge } from '../../lib/badges';

/** shields.io endpoint badge for the README: the oldest "last checked" date across all pages. */
export async function GET() {
	const pages = await getCollection('docs');
	const dates = pages.flatMap((page) => (page.data.lastVerified ? [page.data.lastVerified] : []));
	return Response.json(docsCheckedBadge(dates));
}
