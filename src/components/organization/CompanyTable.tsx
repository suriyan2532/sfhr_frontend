import { Company } from '@prisma/client';
import { Pencil, Trash2, Building2, MapPin, Phone } from 'lucide-react';
import { Link } from '@/navigation';
import { deleteCompany } from '@/lib/actions/organization-actions';

interface CompanyTableProps {
  companies: (Company & { parent: Company | null; _count: { departments: number; employees: number } })[];
}

export function CompanyTable({ companies }: CompanyTableProps) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this company?')) {
      await deleteCompany(id);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <div key={company.id} className="col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          {/* Card Header */}\n          <div className="w-full flex items-center justify-between p-6 space-x-6 border-b border-gray-100">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 inline-block p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <Building2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-gray-900 text-sm font-medium truncate" title={company.name}>{company.name}</h3>
              </div>
              <p className="mt-1 text-gray-500 text-xs truncate pl-11">{company.code} {company.taxId && `• ${company.taxId}`} </p>
            </div>
            
             <div className="flex-shrink-0 flex flex-col space-y-1">
                 {/* Parent Label if exists */}\n                 {company.parent && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800" title={`Subsidiary of ${company.parent.name}`}>
                      Sub. of {company.parent.code}
                    </span>
                 )}
                 {!company.parent && (
                     <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Headquarters
                    </span>
                 )}
             </div>
          </div>
          
           {/* Card Body */}\n           <div className="px-6 py-4 space-y-3">
               <div className="flex items-center text-xs text-gray-500">
                   <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                   <span className="truncate">{company.address || 'No address provided'}</span>
               </div>
               <div className="flex items-center text-xs text-gray-500">
                   <Phone className="mr-2 h-4 w-4 text-gray-400" />
                   <span className="truncate">{company.phone || 'No phone provided'}</span>
               </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="text-center">
                        <p className="text-xs font-medium text-gray-500">Depts</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{company._count.departments}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs font-medium text-gray-500">Employees</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{company._count.employees}</p>
                    </div>
                     <div className="text-center">
                         {/* Placeholder for future metric */}\n                     </div>
                </div>
           </div>


          {/* Card Action Header */}\n          <div className="-mt-px flex divide-x divide-gray-200 border-t border-gray-200">
            <div className="w-0 flex-1 flex">
              <Link
                href={`/dashboard/organization/${company.id}`}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 hover:bg-gray-50 transition-colors"
                title="Edit"
              >
                <Pencil className="w-4 h-4 text-gray-400 mr-2" aria-hidden="true" />
                <span className="">Edit</span>
              </Link>
            </div>
            <div className="-ml-px w-0 flex-1 flex">
              <button
                onClick={() => handleDelete(company.id)}
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-700 font-medium border border-transparent rounded-br-lg hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-400 mr-2" aria-hidden="true" />
                <span className="">Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
