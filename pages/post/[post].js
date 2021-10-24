import { withSSRContext } from 'aws-amplify'
import { useRouter } from 'next/router'

import { Post } from '../../src/models'

export async function getStaticPaths() {
    const SSR = withSSRContext()
    const posts = await SSR.DataStore.query(Post)
    const paths = posts.map(post => ({
      params: { post: post.id }
    }))
  
    return {
      paths, fallback: true
    }
  }

  export async function getStaticProps(context) {
    const SSR = withSSRContext(context.req)
    const post = await SSR.DataStore.query(Post, context.params.post)
    return {
      props: {
        post: JSON.parse(JSON.stringify(post))
      },
      revalidate: 10
    }
  }

  export default function PostPage({ post }) {
    const router = useRouter()
  
    if (router.isFallback) {
      return <div>Loading...</div>
    }
  
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    )
  }