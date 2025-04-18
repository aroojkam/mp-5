import getCollection from '@/db'
import { redirect } from 'next/navigation'

interface PageProps {
  params: {
    alias: string
  }
}

export default async function Page({ params }: PageProps) {
  const urls = await getCollection('urls')
  const record = await urls.findOne({ alias: params.alias })

  if (record?.url) {
    redirect(record.url)
  }

  return <div className="text-center mt-10 text-red-500">Alias not found.</div>
}
