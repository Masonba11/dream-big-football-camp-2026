import { PageLayout } from '../layouts/PageLayout'
import { VolunteersSection } from '../components/VolunteersSection'

export function VolunteersPage() {
  return (
    <PageLayout title="Volunteers" eyebrow="Join the team behind the team">
      <p className="max-w-2xl text-lg text-neutral-300">
        Clear roles, early arrival, and organized communication keep the day smooth for athletes and families. Volunteer
        roles are especially geared toward high school students earning service hours for graduation.
      </p>
      <VolunteersSection embedded />
    </PageLayout>
  )
}
