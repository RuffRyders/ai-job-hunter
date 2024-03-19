import {
  Cell,
  Column,
  Row,
  Table as AriaTable,
  TableBody,
  TableHeader,
  TableProps,
} from "react-aria-components";

interface JobApplication {
  title: string;
  company: string;
  salary: { salaryMin: number; salaryMax: number };
  status: string;
  dateUpdated: string;
  [id: string]: any;
}

const columns = [
  { name: "Job Title", id: "title", isRowHeader: true },
  { name: "Company", id: "company" },
  { name: "Salary", id: "salary" },
  { name: "Status", id: "status" },
  { name: "Last Update", id: "dateUpdated" },
];

let rows = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google, Inc.",
    salary: { salaryMin: 178000, salaryMax: 312000 },
    status: "applied",
    dateUpdated: "10/12/23",
  },
  {
    id: 2,
    title: "Software Engineer, Frontend",
    company: "Nike, Inc.",
    salary: { salaryMin: 123000, salaryMax: 224000 },
    status: "interviewing",
    dateUpdated: "10/12/23",
  },
  {
    id: "123abc",
    title: "Software Engineer",
    company: "Google, Inc.",
    salary: { salaryMin: 178000, salaryMax: 312000 },
    status: "not-yet-applied",
    dateUpdated: "10/12/23",
  },
] as JobApplication[];

function SalaryCell({
  salary,
}: {
  salary: { salaryMin: number; salaryMax: number };
}) {
  return (
    <Cell className="px-6 py-4">
      <span>
        {`${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(salary.salaryMin)} - ${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(salary.salaryMax)}`}
      </span>
    </Cell>
  );
}

export function Table({ onRowAction }: TableProps) {
  return (
    <AriaTable
      onRowAction={onRowAction}
      className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <TableHeader
        columns={columns}
        className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        {(column) => (
          <Column isRowHeader={column.isRowHeader} className="px-6 py-3">
            {({ allowsSorting, sortDirection }) => (
              <>
                {column.name}
                {allowsSorting && (
                  <span aria-hidden="true" className="sort-indicator">
                    {sortDirection === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </>
            )}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <Row columns={columns} className="bg-white border-b cursor-pointer">
            {(column) => {
              if (column.id === "salary") {
                return <SalaryCell salary={item[column.id]} />;
              }
              return <Cell className="px-6 py-4">{item[column.id]}</Cell>;
            }}
          </Row>
        )}
      </TableBody>
    </AriaTable>
  );
}
