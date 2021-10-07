import React from 'react'
import Link from 'next/link'

const BlogList = ({ post }) => {
    const { title, slug } = post.fields

    return (
        <>
            <Link passHref href = { `/blog/${ slug }` }>
                <p style = {{ cursor : "pointer" }}>{ title }</p>
            </Link>
        </>
        
    )
}

export default BlogList;