import { ChevronsDown } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { BadgeAttendeeSchema } from "../../../types/types";
import { Attendee } from "../../api/Attendees";
import CardBackgroundHeader from "../../assets/card-background-header.png";
import { useQueryFilters } from "../../hooks/useQueryFilters";

export default function Ticket() {
  const [badge, setBadge] = useState<BadgeAttendeeSchema>();
  const { getFilter } = useQueryFilters();
  const attendeeId = getFilter("attendeeId");

  useEffect(() => {
    (async () => {
      const { badge } = await Attendee.getBadge(Number(attendeeId));
      setBadge(badge);
    })();
  }, [attendeeId]);

  if (!badge) return <Fragment />;

  return (
    <div className="w-full min-h-screen bg-firefly-950 flex items-start justify-center">
      <div className="max-w-[390px] w-full min-h-screen flex flex-col items-center justify-start relative">
        <div className="w-full h-28 bg-black bg-opacity-20 flex items-center justify-center relative z-20">
          <h1 className="text-white font-medium">Minha credencial</h1>
        </div>

        <div className="w-20 h-52 border-l border-r border-white border-opacity-10 absolute bg-[linear-gradient(178deg,_#202024_0%,_#131315_100%);] z-10" />

        <div className="w-full mt-20 h-fit px-8 flex flex-col items-center justify-center relative z-0">
          <div className="w-full h-fit border border-white border-opacity-10 rounded-2xl">
            <div className="w-full pt-8 px-6 border-b border-white border-opacity-10 h-40 relative overflow-hidden rounded-t-2xl flex flex-col items-center">
              <img
                src={CardBackgroundHeader}
                alt="Lines"
                className="absolute inset-0"
              />
              <div className="w-24 h-2.5 bg-gray-950 absolute top-2 rounded-full" />
              <div className="w-full flex items-start justify-between relative z-10">
                <p className="text-sm text-gray-200 font-bold">
                  {badge.eventTitle}
                </p>
                <p className="text-sm text-gray-200 font-bold">#{attendeeId}</p>
              </div>
            </div>
            <div className="w-full py-6 flex flex-col items-center justify-end">
              <p className="text-gray-200 text-2xl font-bold">{badge.name}</p>
              <p className="text-gray-300 text-base mt-1">{badge.email}</p>
              <div className="max-w-[120px] w-full h-fit my-6 mx-auto">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={badge.checkInURL}
                  viewBox={`0 0 256 256`}
                />
              </div>

              <button className="text-tangerine-400 text-sm">
                Ampliar QRCode
              </button>
            </div>
          </div>
        </div>

        <button className="w-10 h-10 my-5 flex items-center justify-center">
          <ChevronsDown />
        </button>

        <div className="w-full px-8">
          <h6 className="text-2xl font-bold text-gray-200">
            Compartilhar credencial
          </h6>
          <p className="text-base mt-1 mb-6 text-gray-300">
            Mostre ao mundo que você vai participar do Unite Summit!
          </p>
          <button className="w-full h-fit py-3.5 bg-tangerine-400 text-firefly-950 font-bold text-sm uppercase rounded-xl">
            Compartilhar
          </button>
          <Link to="/get-ticket">
            <button className="w-full mt-3.5 h-fit py-3.5 bg-transparent text-gray-200 font-bold text-base rounded-xl">
              Voltar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
