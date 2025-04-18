import getCollection from '@/db'
import { redirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ alias: string }>
}

export default async function Page(props: PageProps) {

  const resolvedParams = await props.params
  const alias = resolvedParams.alias
  
  const urls = await getCollection('urls')
  const record = await urls.findOne({ alias })
  
  if (record?.url) {
    redirect(record.url)
  }
  
  return <div className="text-center mt-10 text-red-500">Alias not found.</div>
}