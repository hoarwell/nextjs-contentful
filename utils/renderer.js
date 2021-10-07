import Image from 'next/image'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const ContentRender = ({ content }) => {
    const renderOptions = {
        renderNode: {
            [INLINES.EMBEDDED_ENTRY]: (node, children) => {
                if (node.data.target.sys.contentType.sys.id === "blogPost") {
                    return (
                        <a href={`/blog/${node.data.target.fields.slug}`} 
                            style = {{ cursor: "pointer" }}
                        >            
                            { node.data.target.fields.title }
                        </a>
                    );
                }
            },
            
            [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
                const { data : { target : { fields : { file, title } } } } = node;
                return (
                        <img
                            className = "img"
                            alt = { title }
                            src = { `https:${ file.url }`}
                        />                    
                );
            },
        },
    };
    
    return documentToReactComponents(content, renderOptions)
}
