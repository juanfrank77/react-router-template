import { useState } from 'react'
import { Input } from '~/components/input'
import { getCommon } from '~/utils/.common/common'
import { getSecret } from '~/utils/.server/secret'
import { getPublic } from '~/utils/.client/public'
import { getEnv } from '~/utils/env.server'
import type { Route } from './+types/sub_app'

export function loader({ context }: Route.LoaderArgs) {
  console.log(context, getSecret(), getCommon())
  return {
    env: getEnv(),
  }
}

export async function ClientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  console.log(getPublic(), getCommon())
  return {
    ...(await serverLoader),
  }
}

export default function SubApp({ loaderData: info }: Route.ComponentProps) {
  const [data, setData] = useState('')

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Input value={data} onChange={(e) => setData(e.target.value)} />
      <div className="mt-8 w-full max-w-4xl overflow-x-auto">
        <table className="w-full border-collapse bg-gray-100 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(info.env).map(([key, value]) => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="px-6 py-4">{key}</td>
                <td className="px-6 py-4">{value ?? '-'}</td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4">{data}</td>
              <td className="px-6 py-4">{data}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
