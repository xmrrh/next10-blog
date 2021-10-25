import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { withSSRContext } from 'aws-amplify'
import { Post } from '../src/models'

export default function Home ({ posts }) {
  return (
    <div>
      <Head>
        <title>Amplify + Next</title>
        <meta name='description' content='Amplify + Next!' />
      </Head>

      <main>
      {console.log("posts = " , posts )}
        {
          
          posts&&posts.map(post => (
          <div key={post.id}>
            <a href={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </a>
          </div>
        ))}
      </main>
    </div>
  )
}

export async function getServerSideProps (context) {
  const SSR = withSSRContext(context.req)
  const posts = await SSR.DataStore.query(Post)
  console.log("models = " , posts )
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
