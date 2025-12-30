'use client'
import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'
import CertificationTable from './tables/CetificationTable'
import { miData } from '@/data/miData'
import GeminiForm from './forms/GeminiForm'
import { Image } from 'primereact/image'
import { Dialog } from 'primereact/dialog'
import { useState } from 'react'
import { Button } from 'primereact/button'

const Curriculum = ({ className }: { className: string }) => {
  const [visibleForm, setVisibleForm] = useState(false)

  return (
    <div className={`${className} flex flex-col gap-6`}>
      <Card subTitle={miData.role} className="">
        <div className="flex flex-row justify-center md:justify-between flex-wrap gap-4">
          <div>
            <p>{miData.contact.location}</p>
            <ul className="list-disc pl-5">
              <li>{miData.contact.email}</li>
              <li>
                <a
                  href={`https://${miData.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {miData.contact.linkedin}
                </a>
              </li>
              <li>
                <a
                  href={`https://${miData.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {miData.contact.github}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="border border-gray-300 shadow-md">
              <Image src={miData.picture} alt={miData.name} width="130" />
            </div>
          </div>
        </div>
      </Card>

      <Card title="Certifications" className="min-h-[400px]">
        <CertificationTable />
      </Card>

      <Card title="Skills">
        <div className="flex flex-wrap gap-2">
          {miData.skills.map((skill, i) => (
            <Tag key={i} value={skill} />
          ))}
        </div>
      </Card>

      <Card title="Some Projects">
        {miData.projects.map((project, i) => (
          <div key={i} className="mb-4">
            <h3 className="font-bold">{project.name}</h3>
            <p>{project.summary}</p>
            <p className="text-sm text-gray-600">
              <strong>Stack:</strong> {project.stack}
            </p>
            <p className="text-sm">
              <strong>Impact:</strong> {project.impact}
            </p>
          </div>
        ))}
      </Card>

      <Card title="Experience">
        {miData.experience.map((job, i) => (
          <div key={i} className="mb-3">
            <h3 className="font-bold">
              {job.role} – {job.company}
            </h3>
            <p className="text-sm italic">{job.period}</p>
            <ul className="list-disc ml-5 text-sm">
              {job.impact.map((line, j) => (
                <li key={j}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </Card>

      <Card title="Bidirectional Role Fit Agent">
        This is a proof of concept. It sends structured information to an AI
        service to generate a preliminary compatibility insight. Nothing
        definitive and nothing out of the ordinary, just a modern workflow
        prototype.
        <ul className="list-disc mt-5 pl-5">
          <li>You submit role details (tasks, stack, salary range). </li>
          <li>I match them against my skills and experience.</li>
          <li>
            The system returns a preliminary fit summary (strengths, gaps,
            alignment).
          </li>
        </ul>
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => setVisibleForm(true)}
            label="Set it UP!!"
            outlined
            raised
            className="flex justify-center align-middle p-0"
          />
        </div>
        <Dialog
          header="Compatibility Mediator"
          visible={visibleForm}
          style={{ width: '50vw' }}
          breakpoints={{ '1280px': '75vw', '600px': '100vw' }}
          onHide={() => {
            if (!visibleForm) return
            setVisibleForm(false)
          }}
          className="m-2"
        >
          <GeminiForm />
        </Dialog>
      </Card>
    </div>
  )
}

export default Curriculum
