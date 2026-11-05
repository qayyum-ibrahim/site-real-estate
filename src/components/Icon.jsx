// Small inline SVG icon set. Stroke icons on a 24px grid.
const paths = {
  bed: 'M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M3 18v2M21 18v2M7 9V6h4v3',
  bath: 'M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2',
  size: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  pin: 'M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12.5 10 17l9-10',
  shield: 'M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4',
  tag: 'M3 12V4h8l10 10-8 8L3 12Zm5-4.5a1 1 0 1 0 0 .01',
  key: 'M14.5 9.5a4 4 0 1 1-1.2-2.8M14.5 9.5 21 16v3h-3v-2h-2v-2h-2l-1.4-1.4M7.5 9.5h.01',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  heart: 'M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z',
  sliders: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4',
  back: 'M19 12H5M11 6l-6 6 6 6',
  calc: 'M6 3h12v18H6zM9 7h6M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01M15 17h.01',
}

export default function Icon({ name, size = 18, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}
