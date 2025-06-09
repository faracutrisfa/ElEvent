import React from 'react'
import { Icon } from '@iconify/react'

const formatDaysLeft = (daysLeft) => {
  if (daysLeft === null) return 'Belum dibuka'
  if (daysLeft === 'ditutup') return 'Beasiswa sudah ditutup'
  return `${parseInt(daysLeft)} hari tersisa`
}

const formatDate = (dateString) => {
  if (!dateString) return 'Belum dibuka'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const JenjangTag = ({ jenjang }) => (
  <span className="px-4 py-1 text-sm font-medium border border-blue-600 rounded-full text-blue-600">
    {jenjang}
  </span>
)

const InfoItem = ({ iconSrc, text, alt = 'icon' }) => (
  <div className="flex items-center gap-2">
    <img src={iconSrc} alt={alt} className="w-6 h-6" />
    <span>{text}</span>
  </div>
)

const CardBeasiswa = ({
  beasiswa,
  onEdit = () => { },
  onDelete = () => { },
  showActions = false,
  className = '',
}) => {
  const {
    poster_beasiswa,
    judul,
    jenjang_pendidikan,
    tanggal_mulai,
    tipe_pendaftaran,
    benefit,
    days_left,
    id,
  } = beasiswa || {}

  const jenjangList = jenjang_pendidikan?.split(',') || []

  const imageUrl = poster_beasiswa ? `/storage/${poster_beasiswa}` : null;

  return (
    <div className={`bg-white rounded-2xl shadow-md p-5 overflow-hidden flex gap-5 ${className}`}>

      <div className="w-52 h-44 bg-cream-500 flex items-center justify-center overflow-hidden rounded-lg">
        {imageUrl ? (
          <img src={imageUrl} alt={judul} className="w-full h-full object-cover" />
        ) : (
          <Icon icon="mdi:image" className="text-4xl text-gray-400" />
        )}
      </div>

      <div className="flex flex-1 justify-between">
        <div className="px-2 space-y-4 w-full pr-4">
          <h3 className="text-blue-800 font-bold text-xl">{judul}</h3>

          <div className="flex flex-wrap gap-2">
            {jenjangList.map((jenjang, index) => (
              <JenjangTag key={index} jenjang={jenjang} />
            ))}
          </div>

          <div className="space-y-2 text-sm text-black opacity-80">
            <InfoItem iconSrc="/assets/calender.webp" text={formatDate(tanggal_mulai)} />
            <InfoItem iconSrc="/assets/payment.webp" text={tipe_pendaftaran || benefit} />
            <InfoItem iconSrc="/assets/bell.webp" text={formatDaysLeft(days_left)} />
          </div>
        </div>

        {showActions && (
          <div className="flex flex-col items-end justify-start gap-2 min-w-[40px]">
            <button
              onClick={() => onEdit(beasiswa)}
              className="bg-blue-600 hover:bg-blue-700 text-cream-600 p-2.5 rounded-md transition-colors"
              title="Edit"
            >
              <Icon icon="uil:edit" className="text-xl" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="bg-red-600 hover:bg-red-700 text-cream-600 p-2.5 rounded-md transition-colors"
              title="Delete"
            >
              <Icon icon="tabler:trash" className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardBeasiswa