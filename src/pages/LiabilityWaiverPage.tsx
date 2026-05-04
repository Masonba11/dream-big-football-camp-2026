import type { ReactNode } from 'react'
import { PageLayout } from '../layouts/PageLayout'
import { WAIVER_VERSION } from '../config/waiver'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 sm:p-8">
      <h2 className="font-display text-2xl tracking-wide text-white sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-300">{children}</div>
    </section>
  )
}

export function LiabilityWaiverPage() {
  return (
    <PageLayout title="Liability waiver & release" eyebrow="Please read carefully">
      <p className="max-w-3xl rounded-xl border border-amber-500/30 bg-amber-950/30 p-4 text-sm text-amber-100">
        <strong className="text-amber-50">For minors:</strong> A parent or legal guardian must read and agree to this
        waiver before the camper participates. If the camper is under 18, the registering adult certifies they have
        legal authority to sign on the camper&apos;s behalf.
      </p>

      <p className="max-w-3xl text-sm text-neutral-400">
        <strong className="text-neutral-200">Document version:</strong> {WAIVER_VERSION}
      </p>

      <Section title="1. Assumption of risk">
        <p>
          Participation in Dream Big Football Camp 2026 (the &quot;Camp&quot;) involves inherent risks associated with
          youth athletics, including but not limited to contact with other participants, equipment, and playing
          surfaces; slips, trips, and falls; heat-related illness; dehydration; sprains, strains, fractures, and other
          musculoskeletal injuries; and rare catastrophic injury. I understand these risks cannot be eliminated
          without altering the nature of the activity.
        </p>
        <p>
          I voluntarily assume full responsibility for any and all risks of loss, property damage, or personal injury
          (including death) that my child or ward (&quot;Participant&quot;) or I may sustain as a result of
          participating in or being present at the Camp, whether occurring on or off the field, during drills,
          warm-ups, competitions, awards, social activities, or travel related to the Camp.
        </p>
      </Section>

      <Section title="2. Release of liability">
        <p>
          On behalf of myself, the Participant, and our heirs, assigns, and next of kin, I hereby release, waive,
          discharge, and covenant not to sue Dream Big Football Camp, its organizers, hosts, sponsors, volunteers,
          staff, coaches, facility operators (including Benton Athletic Complex and related entities), insurers, and
          their respective officers, directors, employees, agents, and representatives (collectively, the
          &quot;Released Parties&quot;) from any and all liability, claims, demands, actions, or causes of action
          arising out of or related to the Camp, including negligence of the Released Parties, to the fullest extent
          permitted by law.
        </p>
        <p>
          I agree that if any portion of this release is held invalid, the remainder shall continue in full force and
          effect. I intend this release to be as broad and inclusive as permitted under applicable state law.
        </p>
      </Section>

      <Section title="3. Medical treatment consent">
        <p>
          I certify that the Participant is physically able to participate and that I have disclosed any relevant
          medical conditions, allergies, medications, or restrictions to Camp organizers as requested on the
          registration form.
        </p>
        <p>
          In the event of an injury or illness, I authorize Camp staff and volunteers to obtain or provide emergency
          medical care for the Participant, including transport to a medical facility, and I agree to be responsible
          for any medical expenses incurred. I understand Camp personnel are not physicians and that this authorization
          is not a substitute for professional medical advice.
        </p>
      </Section>

      <Section title="4. Photo & video release">
        <p>
          I grant the Camp and its designees the irrevocable right to photograph, film, livestream, or otherwise record
          the Participant during Camp activities and to use such images or recordings in any media (including websites,
          social media, and promotional materials) for educational, archival, or promotional purposes without payment
          or further notice.
        </p>
        <p>If you require an exception, you must notify the Camp in writing before check-in.</p>
      </Section>

      <Section title="5. Parent / guardian agreement (minors)">
        <p>
          If the Participant is under the age of eighteen (18), I represent and warrant that I am the Participant&apos;s
          parent or legal guardian, or that I have obtained all necessary legal authority to execute this agreement on
          behalf of the Participant. I have explained the risks of the Camp to the Participant to the best of my
          ability.
        </p>
      </Section>

      <Section title="6. Fees, cancellation & no-refund acknowledgment">
        <p>
          I understand that camp fees are collected to reserve a spot, secure supplies, and plan staffing. Unless
          required by law or expressly stated otherwise in Camp communications, payments may be non-refundable after a
          stated deadline, and the Camp may retain administrative fees for late cancellations. I agree to review
          registration and refund policies published at the time of payment.
        </p>
        <p>
          The Camp reserves the right to modify, postpone, or cancel activities for weather, safety, attendance, or
          operational reasons. In such cases, reasonable accommodations may be offered but are not guaranteed.
        </p>
      </Section>

      <Section title="7. Conduct & equipment">
        <p>
          I agree that the Participant will follow instructions from coaches and staff, treat others respectfully, and
          use equipment only as directed. The Camp may remove any participant whose behavior endangers safety or
          disrupts the experience, without refund, at the organizers&apos; discretion.
        </p>
      </Section>

      <div className="max-w-3xl rounded-2xl border border-red-500/25 bg-red-950/20 p-6 text-sm leading-relaxed text-neutral-200">
        <p className="font-semibold text-white">Legal review required</p>
        <p className="mt-2">
          This waiver text is provided for website setup only. It should be reviewed and approved by the camp owner
          and/or a licensed attorney in your jurisdiction before you rely on it for liability protection.
        </p>
      </div>
    </PageLayout>
  )
}
