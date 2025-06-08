import React from 'react';
import { Icon } from '@iconify/react';

const formatDaysLeft = (daysLeft) => {
  if (daysLeft === null) return 'Belum dibuka';
  if (daysLeft === 'ditutup') return 'Lomba sudah ditutup';
  return `${parseInt(daysLeft)} hari tersisa`;
};

const InfoRow = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <img src={icon} alt="icon" className="w-6 h-6" />
    <span>{text}</span>
  </div>
);

const CardLomba = ({
  lomba,
  onEdit,
  onDelete,
  showActions = false,
  className = ''
}) => {
  const {
    poster_lomba,
    judul,
    jenjang_pendidikan,
    kategori,
    days_left,
    lokasi,
    tipe_lokasi,
    link_pendaftaran,
    penyelenggara
  } = lomba;

  return (
    <div className={`bg-white rounded-2xl w-[646px] shadow-md p-5 overflow-hidden flex gap-5 ${className}`}>
      <div className="w-52 h-72 bg-cream-500 flex items-center justify-center overflow-hidden rounded-lg">
        {poster_lomba ? (
          <img src={poster_lomba} alt={judul} className="w-full h-full object-cover" />
        ) : (
          <Icon icon="mdi:image" className="text-4xl text-gray-400" />
        )}
      </div>

      <div className="flex flex-1 justify-between">
        <div className="px-2 space-y-4 w-full pr-4">
          <h3 className="text-blue-800 font-bold text-xl">{judul}</h3>

          <div className="flex flex-wrap gap-2">
            {(jenjang_pendidikan?.split(',') || []).map((jenjang, index) => (
              <span
                key={index}
                className="px-4 py-1 text-sm font-medium border border-blue-600 rounded-full text-blue-600"
              >
                {jenjang}
              </span>
            ))}
          </div>

          <div className="space-y-2 text-sm text-black opacity-80">
            <InfoRow icon="/assets/badge.webp" text={kategori?.split(',').join(', ') || 'Lomba Umum'} />
            <InfoRow icon="/assets/calender.webp" text={formatDaysLeft(days_left)} />
            <InfoRow icon="/assets/location.webp" text={lokasi || tipe_lokasi} />

            {link_pendaftaran && (
              <div className="flex items-center gap-2">
                <Icon icon="mdi:link" className="text-blue-500 w-6 h-6 flex-shrink-0" />
                <a
                  href={link_pendaftaran}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline truncate"
                >
                  Link Pendaftaran
                </a>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-light text-black opacity-80">
              <span>Diselenggarakan oleh</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <Icon
                icon="iconamoon:profile-fill"
                className="w-7 h-7 p-1 rounded-full bg-cream-600 flex items-center justify-center"
              />
              <span className="text-sm text-black">{penyelenggara}</span>
            </div>
          </div>
        </div>

        {showActions && (
          <div className="flex flex-col items-end justify-start gap-2 min-w-[40px]">
            <button
              onClick={() => onEdit?.(lomba)}
              className="bg-blue-600 hover:bg-blue-700 text-cream-600 p-2.5 rounded-md transition-colors"
              title="Edit"
            >
              <Icon icon="uil:edit" className="text-xl" />
            </button>
            <button
              onClick={() => onDelete?.(lomba.id)}
              className="bg-red-600 hover:bg-red-700 text-cream-600 p-2.5 rounded-md transition-colors"
              title="Delete"
            >
              <Icon icon="tabler:trash" className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardLomba;