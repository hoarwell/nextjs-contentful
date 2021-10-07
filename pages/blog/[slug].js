import { getPost } from '../../utils/function';
import { ContentRender } from '../../utils/renderer';
import Router from 'next/router'

export const getServerSideProps = async (context) => {
    const slug = context.query.slug;
    const post = await getPost(slug);
    if(!post) {
    return {
        redirect: {
                permanent: false,
                destination: '../404'
            }
        }
    }
    return {
        props: {
            post,
        }   
    }
}

const BlogDetail = ({ post }) => {
    const { title, content, thumbnail } = post.fields;
    const { createdAt, id } = post.sys
    return (
        <div>
            <div className = "post-container">
                <p className = "post-title">{ title }</p>
                <p className = "post-date">
                    <small>
                        <i>{ new Date(createdAt).toLocaleString() }</i>
                    </small>
                </p>
                <div className = "post-content">
                    <ContentRender content = { content } />
                </div>
            </div>
        </div>
    )
}

export default BlogDetail;