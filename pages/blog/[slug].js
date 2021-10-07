import { getPost } from '../../utils/function';
import { ContentRender } from '../../utils/renderer';
import { useState } from 'react';

export const getServerSideProps = async (context) => {
    const slug = context.query.slug;
    const post = await getPost(slug);
    if(!post) {
    return {
        redirect: {
                permanent: false,
                destination: '/404'
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
    const [dark, setDark] = useState(false);
    const { title, content, thumbnail } = post.fields;
    const { createdAt, id } = post.sys
    
    const handleClick = () => {
        setDark(!dark);
    }
    return (
        <>
            <div className = "post-container">
                <button onClick = { handleClick }>dark</button>
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
            <style jsx>
            {`
                .post-container {
                    background-color: ${ dark ? "black" : "initial" };
                    color: ${ dark ? "white" : "black" }
                }
            `}
            </style>
        </>
    )
}

export default BlogDetail;