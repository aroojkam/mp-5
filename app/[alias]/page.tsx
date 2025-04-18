import getCollection from '@/db'
import { redirect } from 'next/navigation'

export default async function Page(props: { params: { alias: string } }) {
  // Access the params from props and await it
  const paramsObj = await props.params
  const alias = paramsObj.alias
  
  const urls = await getCollection('urls')
  const record = await urls.findOne({ alias })
  
  if (record) {
    redirect(record.url)
  }
  
  return <div className="text-center mt-10">Alias not found.</div>
}