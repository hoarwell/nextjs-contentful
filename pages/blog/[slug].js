import Image from 'next/image'
import { createClient } from 'contentful'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const { CONTENTFUL_SPACE, CONTENTFUL_ACCESS_TOKEN } = process.env;

const client = createClient({
    space: CONTENTFUL_SPACE,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
})

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'blogPost'
    })

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const { items } = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': params.slug 
    })

    return {
        props: {
            post: items[0]
        }
    }
}

const renderOptions = {
    renderNode: {
        [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
            if (node.data.target.sys.contentType.sys.id === "blogPost") {
                return (
                    <a href={`/blog/${node.data.target.fields.slug}`}>            
                        {node.data.target.fields.title}
                    </a>
                );
            }
        },

        [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
            const { data : { target : { fields : { file, title } } } } = node;
            console.log(file, title)
            return (
                <img
                    src={ `https:${ file.url }`}
                    height={ file.details.image.height / 10}
                    width={ file.details.image.width / 10}
                    alt={node.data.target.fields.title}
                    title={node.data.target.fields.title}
                />
            );
        },
    },
};

const BlogDetail = ({ post }) => {
    const { title, content, thumbnail } = post.fields;
    return (
        <div>
            {/* <Image src = { 'https:' + thumbnail.fields.file.url } 
                    width = { thumbnail.fields.file.details.image.width / 10 }
                    height = { thumbnail.fields.file.details.image.height / 10 } 
                    alt = { thumbnail.fields.title }
            /> */}
            <div>
            { documentToReactComponents(content, renderOptions) }
            </div>
        </div>
    )
}

export default BlogDetail;