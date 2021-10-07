import { createClient } from 'contentful'

const { CONTENTFUL_SPACE, CONTENTFUL_ACCESS_TOKEN } = process.env;

const client = createClient({
    space: CONTENTFUL_SPACE,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
})

export const getPosts = async () => {
    const res = await client.getEntries({ content_type: 'blogPost' })

    return res.items
}

export const getPost = async (slug) => {
    const { items } = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug
    })
    if(items.length > 0) return items[0]
}