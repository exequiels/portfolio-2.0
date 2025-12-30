'use client'

import Curriculum from '@/components/tables/Curriculum'
import { miData } from '@/data/miData'
import { Button } from 'primereact/button'

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between align-middle">
        <h1 className="text-3xl font-bold">Exequiel Sabatié</h1>
        <Button
          onClick={() =>
            window.open(
              `https://${miData.contact.linkedin}`,
              '_blank',
              'noopener,noreferrer'
            )
          }
          outlined
          text
          raised
          className="linkedin-button"
        >
          <i className="pi pi-linkedin" style={{ fontSize: '2rem' }} />
        </Button>
      </div>
      <div className="space-y-6 p-2">
        <Curriculum className="mt-5 mb-5" />
      </div>
    </main>
  )
}
