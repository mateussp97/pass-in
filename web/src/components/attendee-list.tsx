import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Trash2,
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
import { useModalStore } from "../atoms/stores/useModalStore";
import DeleteAttendeeModal from "./modal/delete-attendee-modal";

dayjs.extend(relativeTime);
dayjs.locale("en-us");

export function AttendeeList() {
  const { getFilter, setFilter } = useQueryFilters();
  const [search, setSearch] = useState(getFilter("search") || "");
  const [page, setPage] = useState(Number(getFilter("page") || 1));

  const [total, setTotal] = useState(0);
  const [attendees, setAttendees] = useState<AttendeeSchema[]>([]);
  const totalPages = Math.ceil(total / 10);

  const {
    methods: { onOpenModal, onCloseModal },
  } = useModalStore();

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
        <h1 className="text-2xl font-bold">Attendees</h1>

        <div className="max-w-xs w-full flex flex-col items-start gap-1">
          <div className="px-3 w-full border rounded-lg flex items-center gap-3 border-white/10">
            <Search className="size-4 text-emerald-300" />
            <input
              className="bg-transparent py-2.5 focus:ring-0 flex-1 outline-none border-0 p-0 text-sm placeholder:text-gray-300"
              placeholder="Find a attendee..."
              value={search}
              onChange={onSearchInputChanged}
            />
          </div>
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader>Code</TableHeader>
            <TableHeader>Attendee</TableHeader>
            <TableHeader>Registration date</TableHeader>
            <TableHeader>Check-in date</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.map((ateendee) => {
            return (
              <TableRow key={ateendee.id}>
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
                    <span className="text-zinc-400">Not checked in</span>
                  ) : (
                    dayjs().to(ateendee.checkedInAt)
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      onOpenModal({
                        content: (
                          <DeleteAttendeeModal
                            onClose={onCloseModal}
                            attendee={ateendee}
                          />
                        ),
                      })
                    }
                    transparent
                    className="bg-black/20 border border-white/10 rounded-md p-1.5"
                  >
                    <Trash2 className="size-4 text-white/50" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Showing {attendees.length} of {total}{" "}
              {total > 1 ? "attendees" : "attendee"}
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Page {page} of {totalPages}
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
