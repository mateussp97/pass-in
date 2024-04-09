import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { AttendeeSchema } from "../../types/types";
import { Attendee } from "../api/Attendees";
import { useQueryFilters } from "../hooks/useQueryFilters";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableCell } from "./table/table-cell";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function AttendeeList() {
  const { getFilter, setFilter } = useQueryFilters();
  const [search, setSearch] = useState(getFilter("search") || "");
  const [page, setPage] = useState(Number(getFilter("page") || 1));

  const [total, setTotal] = useState(0);
  const [attendees, setAttendees] = useState<AttendeeSchema[]>([]);
  const totalPages = Math.ceil(total / 10);

  const eventId = getFilter("eventId");

  // Updates participants based on changes in filters
  useEffect(() => {
    (async () => {
      if (eventId !== null) {
        const { attendees, total } = await Attendee.get({
          eventId,
          pageIndex: page - 1,
          query: search,
        });

        setAttendees(attendees);
        setTotal(total);
      }
    })();
  }, [page, search, eventId]);

  // Restart paging when changing the event
  useEffect(() => {
    setPage(1);
    setFilter("page", "1");
  }, [eventId]);

  function setCurrentSearch(newSearch: string) {
    setFilter("search", newSearch);
    setSearch(newSearch);
  }

  function setCurrentPage(newPage: number) {
    setFilter("page", String(newPage));
    setPage(newPage);
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    const newSearch = event.target.value;
    setCurrentSearch(newSearch);
    setCurrentPage(1); // Restarts paging when searching again
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }
  function goToLastPage() {
    setCurrentPage(totalPages);
  }
  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }
  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="max-w-xs w-full flex flex-col items-start gap-1">
          <div className="px-3 w-full border rounded-lg flex items-center gap-3 border-white/10">
            <Search className="size-4 text-emerald-300" />
            <input
              className="bg-transparent py-2.5 focus:ring-0 flex-1 outline-none border-0 p-0 text-sm placeholder:text-gray-300"
              placeholder="Buscar participante..."
              value={search}
              onChange={onSearchInputChanged}
            />
          </div>
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.map((ateendee) => {
            return (
              <TableRow key={ateendee.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-white/10"
                  />
                </TableCell>
                <TableCell>{ateendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {ateendee.name}
                    </span>
                    <span>{ateendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(ateendee.createdAt)}</TableCell>
                <TableCell>
                  {ateendee.checkedInAt === null ? (
                    <span className="text-zinc-400">Não fez check-in</span>
                  ) : (
                    dayjs().to(ateendee.checkedInAt)
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    transparent
                    className="bg-black/20 border border-white/10 rounded-md p-1.5"
                  >
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
