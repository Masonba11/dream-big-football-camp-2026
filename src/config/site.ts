/**
 * Central content + media paths. Swap `src` values to your real photos
 * (place files in /public and use "/your-file.jpg").
 */

export const campDate = new Date('2026-07-18T09:00:00')

export const pricing = {
  /** Limited early window — update `earlyBirdNote` when dates are final */
  earlyBird: 35,
  online: 40,
  dayOf: 50,
} as const

export const registrationCloses = new Date('2026-07-13T23:59:59')

export const media = {
  /** Hero background video — file lives in /public */
  heroVideo: '/hero.mov',
  aboutFeature:
    'https://images.unsplash.com/photo-1552318965-ed6b1378750a?auto=format&fit=crop&w=1200&q=80',
  gallery: [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
      alt: 'Placeholder: football on field',
      caption: 'Action on the field',
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1517649763962-0c62306601b7?auto=format&fit=crop&w=1200&q=80',
      alt: 'Placeholder: team huddle',
      caption: 'Team energy',
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1461896836934-6672875c1fb8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Placeholder: stadium atmosphere',
      caption: 'Game-day atmosphere',
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
      alt: 'Placeholder: training drill',
      caption: 'Competitive drills',
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Placeholder: youth sports',
      caption: 'Camp highlights',
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
      alt: 'Placeholder: football texture',
      caption: '2025 camp memories (swap in)',
    },
  ] as const,
} as const
