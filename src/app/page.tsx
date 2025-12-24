'use client'

import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

export default function Home() {
  const certifications = [
    {
      id: 1,
      name: 'Meta Certificate - Introduction to Front-End Development',
      url: 'https://coursera.org/share/cfb0c8b52052dd643e73f5b3fc02c8ce',
    },
    {
      id: 2,
      name: 'Meta Certificate - Programming with JavaScript',
      url: 'https://coursera.org/share/5c5eb8ea29062bfa555004e1fc9950c9',
    },
    {
      id: 3,
      name: 'Meta Certificate - React Basics',
      url: 'https://coursera.org/share/471cae12bbc54ef8b6abe1af8ab3482e',
    },
    {
      id: 4,
      name: 'Meta Certificate - Version Control',
      url: 'https://coursera.org/share/bb6595dffb7948034a23090792247817',
    },
    {
      id: 5,
      name: 'Meta Certificate - Advanced React',
      url: 'https://coursera.org/share/daa7e11a7856e23cd3b9ba805dd6d686',
    },
    {
      id: 6,
      name: 'UNLPAM Certificate - Web Layout with HTML 5 and CSS',
      url: 'url1',
    },
    {
      id: 7,
      name: 'UNLPAM Certificate - Advanced JavaScript Developer',
      url: 'url2',
    },
    {
      id: 8,
      name: 'UNLPAM Certificate - Web Programming with PHP and MySQL',
      url: 'url3',
    },
    {
      id: 9,
      name: 'AWS Educate Getting Started with Storage - Training Badge',
      url: 'https://www.credly.com/badges/3bde96a6-1324-4c21-8f38-5d25b022ce6b/public_url',
    },
    {
      id: 10,
      name: 'AWS Educate Getting Started with Security - Training Badge',
      url: 'https://www.credly.com/earner/earned/badge/f88f27d7-2a30-4692-9527-0488d75bb788',
    },
    {
      id: 11,
      name: 'AWS Educate Getting Started with Serverless - Training Badge',
      url: 'https://www.credly.com/earner/earned/badge/50a97fca-e4b8-4c3b-99af-73d339f4fe52',
    },
    {
      id: 12,
      name: 'AWS Educate Getting Started with Databases - Training Badge',
      url: 'https://www.credly.com/earner/earned/share/facf6fc0-82ae-4ef7-a3e0-bc609b7e7daf',
    },
    {
      id: 13,
      name: 'AWS Educate Getting Started with Networking - Training Badge',
      url: 'https://www.credly.com/earner/earned/badge/183b948d-c53c-480a-a970-c15f0a94aa7a',
    },
    {
      id: 14,
      name: 'AWS Educate Getting Started with Cloud Ops - Training Badge',
      url: 'https://www.credly.com/earner/earned/badge/d4e7dd4f-67b4-4c45-ae16-aacf3324c372',
    },
    {
      id: 15,
      name: 'AWS Educate Getting Started with Compute - Training Badge',
      url: 'https://www.credly.com/earner/earned/badge/ee9e1a39-06d4-4fb4-b188-e195b0a6c469',
    },
  ]

  return (
    <main className="flex justify-center">
      <div className="mt-5 border border-red-500">
        <h1 className="text-3xl font-bold">Portfolio 2.0</h1>
        <DataTable
          value={certifications}
          header={<h2 className="text-2xl font-semibold">Certifications</h2>}
          className="mt-5 mb-5"
        >
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column
            field="url"
            header="Link"
            body={(rowData) => (
              <a href={rowData.url} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            )}
          />
        </DataTable>
        <Button label="Guardar" />
      </div>
    </main>
  )
}
