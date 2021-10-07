import BlogList from '../components/BlogList'
import { getPosts } from '../utils/function'

export const getStaticProps = async () => {
    const posts = await getPosts()
    return {
        props: {
            posts: posts
        },
        revalidate: 1,
    }
}

export default function Home({ posts }) { 
    return (
        <div>
            <div>
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
        </div>
        
    )
}
