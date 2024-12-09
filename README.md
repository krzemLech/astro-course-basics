# Astro Crash course

<!-- Add other descriptions -->

This is a test app for displaying all features for astro 5.

## Routing

Astro uses file-based routing, similar to next.js. All files icluded in a `src/pages` folder will be made routes. The usual thisng is to use `.astro` extensions but `.md` and `.mdx` files are also allowed. You can check these in `src/pages/info` section.

When using framework components you have to define how the are to be used: on client or on server. The most typical is to use `client:load` directive to make them load on a client side. The other options are

> [!IMPORTANT]
> For MDX support you have to add astro/mdx (using `npx astro add mdx` )

You can hide certain files inside `pages` folder by adding underscore in front on the file name. These files will not be included in astro build and will not display in routing.

## Collections

Collections are placed in `src/data` folder and the pages for them are in data route.
The config file is `src/content.config.ts` and it contains four collections:

- _authors_ with example of collection with multiple yaml files
- _posts_ with example of md files and reference to other collection
- _team_ with json data and a collection referenced by the posts collection
- _postsWithImages_ with image example and reference to authors collection
- _notes_ with notes collection (md format)

The routes in the dat folders present examples of SSR and SSG option, as well as with pagination

- _posts_ are displayed with pre-rendering, that is why they have index page for list and dynamic [slug] files
- _authors_ are Server-side rendered - this is shorter but requires some adapter (for local development node is good).
- _notes_ are statically-generated with pagination: [page] file shows the list with pagination, [note] shows single note with detStaticPaths.

For **types** in TypeScript you have to add the following in the tsconfig.json:
`strictNullChecks: true`
Then you can add types using `CollectionEntry<"collection name">`, type imported from `astro:content`
You can find full example in `src/pages/data/notes/[page].astro`, with added typing for pagination.

Rendering collection is done with a `render()` function. It returns object with `Content` and the this can be used as component to display:

```js
---
import { getEntry, render } from 'astro:content';

const entry = await getEntry('blog', 'post-1');
const { Content, headings } = await render(entry);
---
<p>Published on: {entry.data.published.toDateString()}</p>
<Content />
```

## Redirects

You can create redirects two ways:

- in a componentne using `return Astro.redirect("/404")`, but remember to **return** !
- in a config file, adding `redirects: { "/": "/blog" }` inside `defineConfig`

## Hidden routes

You can exclude files from `/pages` folder from being built by adding underscore at the beginning, e.g. `_hidden.astro`

## Images

By convention, similar to other frameworks, images are stored in `src/assets` folder. This is not required by Astro, but it is a good practice.

> You can display images optimized with astro `<Image />` component. The example is in `src/pages/posts/index.astro`.

> You can also attach images to content collestions. Check out the `content.config.file` and `postsWithImages` collection.

## Rendering strategies

You can choose between several rendering strategies:

SSG (Static Site Generation) where astro builds your html ahead of time, during build.
SSR (Server-Site Rendering) where server creates your html at request.
Client rendering - typical for SPA, by using `client:only` on a specific component.

By default Astro uses SSG. For SSR you have to:

- install an adapter (node adapter is best for local development: `npx astro add node`)
- add `export const prerender = false` in files where you nat them to be SSRed

You may switch so SSR by default for all pages, so then you:

- install adapter
- add `output: "server"` to the astro config file
- remember to add `export const prerender = true` for all sites you want to be static. You have to add these whenever you use `getStaticPaths` in a file!!!

Client rendering has three options:
`client:only` - loads when app is mounted
`client:load` - loads when a specific page is loaded
`client:visible` - loads when the component is visible on the screen
