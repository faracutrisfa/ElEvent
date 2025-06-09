import AdminLayout from '@/Layouts/AdminLayout'
import { Head, usePage, router } from '@inertiajs/react'
import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import Create from './Create'
import Edit from './Edit'
import CardLomba from '@/Components/CardLomba'

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Index = () => {
  const { flash, lombas, filters } = usePage().props
  const [showCreate, setShowCreate] = useState(false)
  const [editLomba, setEditLomba] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    router.get(
      route('admin.lomba.index'),
      { search: debouncedSearchQuery },
      {
        preserveState: true,
        replace: true,
        only: ['lombas', 'filters'],
      }
    );
  }, [debouncedSearchQuery]);

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus lomba ini?')) {
      router.delete(route('admin.lomba.destroy', id))
    }
  }

  return (
    <AdminLayout>
      <Head title="Data lomba" />

      {flash?.success && (
        <div className="mb-4 rounded bg-green-100 p-4 text-green-800">
          {flash.success}
        </div>
      )}

      <main className="bg-cream-600 min-h-screen">
        <div className='py-11 container'>
          <div className="flex justify-between items-center gap-6 mb-9">
            <div className="relative w-full ">
              <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-900 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Lomba..."
                className="w-full pl-10 pr-4 py-3 border border-cream-900 placeholder:text-cream-900 rounded-full"
              />
            </div>

            <button
              onClick={() => setShowCreate(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-cream-1100 font-semibold rounded-full py-3 flex justify-center items-center gap-2 transition w-60"
            >
              <Icon icon="mdi:plus" className="text-xl" />
              Tambah Lomba
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {lombas?.length > 0 ? (
              lombas.map((lomba) => (
                <CardLomba
                  key={lomba.id}
                  lomba={lomba}
                  onEdit={setEditLomba}
                  onDelete={handleDelete}
                  showActions={true}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Icon icon="mdi:database-search" className="text-6xl text-blue-300 mx-auto mb-4" />
                <p className="text-blue-300 text-lg">Data lomba tidak ditemukan.</p>
              </div>
            )}
          </div>

          {showCreate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-blue-600 rounded-3xl shadow-lg w-full max-w-3xl px-16 py-8 relative">
                <button
                  onClick={() => setShowCreate(false)}
                  className="absolute top-6 right-10 text-red-600 text-4xl"
                  title="Tutup"
                >
                  &times;
                </button>
                <Create onClose={() => setShowCreate(false)} />
              </div>
            </div>
          )}

          {editLomba && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-blue-600 rounded-3xl shadow-lg w-full max-w-3xl px-16 py-8 relative">
                <button
                  onClick={() => setEditLomba(null)}
                  className="absolute top-6 right-10 text-red-600 text-4xl"
                  title="Tutup"
                >
                  &times;
                </button>
                <Edit lomba={editLomba} onClose={() => setEditLomba(null)} />
              </div>
            </div>
          )}
        </div>
      </main>
    </AdminLayout>
  )
}

export default Index