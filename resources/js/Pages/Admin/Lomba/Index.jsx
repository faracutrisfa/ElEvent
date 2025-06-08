import AdminLayout from '@/Layouts/AdminLayout'
import { Head, usePage, router } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'
import React, { useState } from 'react'
import Create from './Create'
import Edit from './Edit'

const Index = () => {
  const { flash, lombas } = usePage().props
  const [showCreate, setShowCreate] = useState(false)
  const [editLomba, setEditLomba] = useState(null)

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus lomba ini?')) {
      router.delete(route('admin.lomba.destroy', id), {
        onSuccess: () => {
        }
      })
    }
  }

  return (
    <AdminLayout
      header={
        <h2 className="text-xl font-tiltWrap leading-tight text-gray-800">
          Lomba HAHAHA
        </h2>
      }
    >
      <Head title="Data lomba" />

      {flash?.success && (
        <div className="mb-4 rounded bg-green-100 p-4 text-green-800">
          {flash.success}
        </div>
      )}

      <div className="mb-4 flex justify-end">
        <PrimaryButton onClick={() => setShowCreate(true)}>
          Tambah lomba
        </PrimaryButton>
      </div>

      <div className="space-y-4">
        {lombas?.length > 0 ? (
          lombas.map((b) => (
            <div
              key={b.id}
              className="rounded border p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{b.judul}</h3>
                <p className="text-sm text-gray-600">{b.penyelenggara}</p>
                <p>
                  {b.days_left === null
                    ? 'Belum dibuka'
                    : b.days_left === 'ditutup'
                      ? 'lomba sudah ditutup'
                      : `${parseInt(b.days_left)} hari tersisa`}
                </p>
              </div>

              <div className="flex gap-2">
                <PrimaryButton onClick={() => setEditLomba(b)}>
                  Edit
                </PrimaryButton>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Belum ada data lomba.</p>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded shadow-lg w-full max-w-3xl p-6 relative">
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-3 right-3 text-red-600 text-2xl font-bold"
              title="Tutup"
            >
              &times;
            </button>
            <Create onClose={() => setShowCreate(false)} />
          </div>
        </div>
      )}

      {editLomba && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded shadow-lg w-full max-w-3xl p-6 relative">
            <button
              onClick={() => setEditLomba(null)}
              className="absolute top-3 right-3 text-red-600 text-2xl font-bold"
              title="Tutup"
            >
              &times;
            </button>
            <Edit lomba={editLomba} onClose={() => setEditLomba(null)} />
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default Index