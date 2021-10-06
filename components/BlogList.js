import React from 'react'
import Link from 'next/link'

const BlogList = ({ post }) => {
    const { title, slug, thumbnail } = post.fields

    return (
        <div>
            <Link passHref href = { `/blog/${ slug }` }>
                <p>{ title }</p>
            </Link>
        </div>
    )
}

export default BlogList;