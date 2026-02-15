"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  getCompaniesForSelect,
  getDepartmentsForSelect,
  getPositionsForSelect,
} from "@/lib/api/services/organization.service";
import {
  getShiftsForSelect,
  getEmployeeTypesForSelect,
  getRolesForSelect,
  getWorkTypesForSelect,
} from "@/lib/api/services/master-data.service";
import { SelectOption } from "@/lib/api/types";
import { SearchableSelect } from "@/components/ui/searchable-select";

export function EmployeeFilters({ token }: { token?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Common");
  const tOrg = useTranslations("Organization");
  const tEmp = useTranslations("EmployeeForm"); // Assuming translations are here or Common

  const [companies, setCompanies] = useState<SelectOption[]>([]);
  const [departments, setDepartments] = useState<SelectOption[]>([]);
  const [positions, setPositions] = useState<SelectOption[]>([]);
  const [shifts, setShifts] = useState<SelectOption[]>([]);
  const [employeeTypes, setEmployeeTypes] = useState<SelectOption[]>([]);
  const [roles, setRoles] = useState<SelectOption[]>([]);
  const [workTypes, setWorkTypes] = useState<SelectOption[]>([]);

  const companyId = searchParams.get("companyId") || "";
  const departmentId = searchParams.get("departmentId") || "";
  const positionId = searchParams.get("positionId") || "";
  const shiftId = searchParams.get("shift_id") || "";
  const employeeTypeId = searchParams.get("employee_type_id") || "";
  const roleId = searchParams.get("role_id") || "";
  const workType = searchParams.get("work_type") || "";

  useEffect(() => {
    // Load initial options
    getCompaniesForSelect(token).then(setCompanies);
    getDepartmentsForSelect(companyId || undefined, token).then(setDepartments);
    getPositionsForSelect(departmentId || undefined, token).then(setPositions);
    getShiftsForSelect(token).then(setShifts);
    getEmployeeTypesForSelect(token).then(setEmployeeTypes);
    getRolesForSelect(token).then(setRoles);
    getWorkTypesForSelect(token).then(setWorkTypes);
  }, [companyId, departmentId, token]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset dependent filters if any (only org structure is dependent)
    if (key === "companyId") {
      params.delete("departmentId");
      params.delete("positionId");
    } else if (key === "departmentId") {
      params.delete("positionId");
    }

    // Reset pagination
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Company Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {tOrg("company")}
          </label>
          <SearchableSelect
            value={companyId}
            onChange={(val) => updateFilters("companyId", val)}
            options={companies}
            placeholder={t("selectOption")}
          />
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {tOrg("department")}
          </label>
          <SearchableSelect
            value={departmentId}
            onChange={(val) => updateFilters("departmentId", val)}
            options={departments}
            placeholder={t("selectOption")}
            disabled={!companyId && departments.length === 0}
          />
        </div>

        {/* Position Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {tOrg("position")}
          </label>
          <SearchableSelect
            value={positionId}
            onChange={(val) => updateFilters("positionId", val)}
            options={positions}
            placeholder={t("selectOption")}
            disabled={!departmentId && positions.length === 0}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Employee Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Employee Type
          </label>
          <SearchableSelect
            value={employeeTypeId}
            onChange={(val) => updateFilters("employee_type_id", val)}
            options={employeeTypes}
            placeholder={t("selectOption")}
          />
        </div>

        {/* Shift Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Shift
          </label>
          <SearchableSelect
            value={shiftId}
            onChange={(val) => updateFilters("shift_id", val)}
            options={shifts}
            placeholder={t("selectOption")}
          />
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Role
          </label>
          <SearchableSelect
            value={roleId}
            onChange={(val) => updateFilters("role_id", val)}
            options={roles}
            placeholder={t("selectOption")}
          />
        </div>

        {/* Work Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contract Type
          </label>
          <SearchableSelect
            value={workType}
            onChange={(val) => updateFilters("work_type", val)}
            options={workTypes}
            placeholder={t("selectOption")}
          />
        </div>
      </div>
    </div>
  );
}
