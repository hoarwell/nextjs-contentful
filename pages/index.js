import styles from '../styles/Home.module.css'
import { createClient } from 'contentful'
import BlogList from '../components/BlogList'

export const getStaticProps = async () => {
    const { CONTENTFUL_SPACE, CONTENTFUL_ACCESS_TOKEN } = process.env;

    const client = createClient({
        space: CONTENTFUL_SPACE,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
    })

    const res = await client.getEntries({ content_type: 'blogPost' })
    
    return {
        props: {
            posts: res.items
        }
    }
}

export default function Home({ posts }) { 
    return (
        <div className = "blog-list">
        {
            posts.map(post => (
                <BlogList key = { post.sys.id } post = { post } />
            ))
        }
            <style jsx>{`
                .blog-list {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </div>
        
    )
}
