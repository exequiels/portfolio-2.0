import { certifications } from '@/data/certifications'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

const CertificationTable = () => {
  return (
    <>
      <DataTable
        value={certifications}
        tableStyle={{ minWidth: '100%' }}
        emptyMessage="No certifications found."
        size="small"
        sortField="name"
        sortOrder={1}
        rowHover
      >
        <Column
          field="name"
          header="Certification"
          style={{ width: '75%', minWidth: '200px' }}
        />
        <Column
          field="url"
          header="Check"
          style={{ width: '25%', minWidth: '50px' }}
          body={(rowData) => (
            <a
              href={rowData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Link
            </a>
          )}
        />
      </DataTable>
    </>
  )
}

export default CertificationTable
