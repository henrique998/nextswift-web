import { ProfileForm } from './components/ProfileForm'

export default function Profile() {
  return (
    <div className="flex h-full flex-col items-center px-4 py-4 lg:mx-auto lg:w-full lg:max-w-[1126px] lg:px-0">
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
        Atualize seus dados
      </h1>

      <div className="mx-auto w-full max-w-3xl">
        <ProfileForm />
      </div>
    </div>
  )
}
