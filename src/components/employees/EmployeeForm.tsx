"use client";

import { createEmployee } from "@/lib/actions/employee-actions";
import {
  Department,
  Position,
  Company,
  Unit,
  EmpStatus,
  WorkingShift,
} from "@/lib/api/types";
import { Link } from "@/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  employeeSchema,
  EmployeeFormValues,
} from "@/lib/validators/employee-schema";
import {
  GlassInput,
  GlassSelect,
  GlassButton,
  GlassLabel,
  GlassCard,
} from "../ui/glass-ui";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useState } from "react";

interface EmployeeFormProps {
  departments: Department[];
  positions: Position[];
  companies: Company[];
  units: Unit[];
  workingShifts: WorkingShift[];
}

import { ImageUpload } from "../ui/image-upload";
import { FileUpload } from "../ui/file-upload";

// ... existing imports

export function EmployeeForm({
  departments,
  positions,
  companies,
  units,
  // workingShifts,
}: EmployeeFormProps) {
  const t = useTranslations("EmployeeForm");
  const tCommon = useTranslations("Common");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema) as never,
    defaultValues: {
      status: EmpStatus.PROBATION,
      positionIds: [],
      // Defaults for new required fields
      firstNameTh: "",
      lastNameTh: "",
      firstNameEn: "",
      lastNameEn: "",
      idCard: "",
    },
  });

  const photo = watch("photo");
  const document = watch("document");

  const onSubmit = async (data: EmployeeFormValues) => {
    setIsLoading(true);
    const formData = new FormData();
    (
      Object.entries(data) as Array<
        [keyof EmployeeFormValues, EmployeeFormValues[keyof EmployeeFormValues]]
      >
    ).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v.toString()));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(
          key,
          value instanceof Date ? value.toISOString() : value.toString(),
        );
      }
    });

    // ... existing onSubmit logic ...

    const result = await createEmployee(formData);

    if (result?.errors) {
      Object.entries(result.errors).forEach(([key, messages]) => {
        setError(key as keyof EmployeeFormValues, { message: messages[0] });
      });
    } else if (result?.message) {
      toast.success(result.message);
    }
    setIsLoading(false);
  };

  return (
    <GlassCard>
      <div className="mb-8 border-b border-white/10 pb-5">
        <h3 className="text-xl font-bold text-white">{t("title")}</h3>
        <p className="mt-1 max-w-2xl text-sm text-blue-200">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Image - New Field */}
        <div className="flex justify-center mb-8">
          <div className="w-48">
            <ImageUpload
              value={photo}
              onChange={(file) => setValue("photo", file)}
              onRemove={() => setValue("photo", null)}
              label="Profile Picture"
              error={errors.photo?.message as string}
            />
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-6">
          {/* ... existing fields ... */}
          <div className="border-b border-white/10 pb-2 mb-4">
            <h4 className="text-lg font-medium text-white">{t("basicInfo")}</h4>
            <p className="text-xs text-white/50">{t("basicInfoDesc")}</p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Thai Name */}
            <div className="sm:col-span-1">
              <GlassLabel htmlFor="prefixTh">Prefix (TH)</GlassLabel>
              <GlassInput
                id="prefixTh"
                {...register("prefixTh")}
                placeholder="นาย/นาง/..."
              />
            </div>
            <div className="sm:col-span-2">
              <GlassLabel htmlFor="firstNameTh">First Name (TH) *</GlassLabel>
              <GlassInput
                id="firstNameTh"
                {...register("firstNameTh")}
                error={errors.firstNameTh?.message}
              />
            </div>
            <div className="sm:col-span-2">
              <GlassLabel htmlFor="lastNameTh">Last Name (TH) *</GlassLabel>
              <GlassInput
                id="lastNameTh"
                {...register("lastNameTh")}
                error={errors.lastNameTh?.message}
              />
            </div>
            <div className="sm:col-span-1">
              <GlassLabel htmlFor="nickname">{t("fields.nickname")}</GlassLabel>
              <GlassInput
                id="nickname"
                {...register("nickname")}
                error={errors.nickname?.message}
              />
            </div>

            {/* English Name */}
            <div className="sm:col-span-1">
              <GlassLabel htmlFor="prefixEn">Prefix (EN)</GlassLabel>
              <GlassInput
                id="prefixEn"
                {...register("prefixEn")}
                placeholder="Mr/Mrs/..."
              />
            </div>
            <div className="sm:col-span-2">
              <GlassLabel htmlFor="firstNameEn">First Name (EN) *</GlassLabel>
              <GlassInput
                id="firstNameEn"
                {...register("firstNameEn")}
                error={errors.firstNameEn?.message}
              />
            </div>
            <div className="sm:col-span-3">
              <GlassLabel htmlFor="lastNameEn">Last Name (EN) *</GlassLabel>
              <GlassInput
                id="lastNameEn"
                {...register("lastNameEn")}
                error={errors.lastNameEn?.message}
              />
            </div>

            {/* Identities */}
            <div className="sm:col-span-3">
              <GlassLabel htmlFor="idCard">{t("fields.idCard")} *</GlassLabel>
              <GlassInput
                id="idCard"
                {...register("idCard")}
                error={errors.idCard?.message}
                placeholder="13-digit ID"
                maxLength={13}
              />
            </div>
            <div className="sm:col-span-3">
              <GlassLabel htmlFor="passportNo">Passport No.</GlassLabel>
              <GlassInput
                id="passportNo"
                {...register("passportNo")}
                error={errors.passportNo?.message}
              />
            </div>
            <div className="sm:col-span-3">
              <GlassLabel htmlFor="birthDate">
                {t("fields.birthDate")}
              </GlassLabel>
              <GlassInput
                type="date"
                id="birthDate"
                {...register("birthDate")}
                error={errors.birthDate?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <GlassLabel htmlFor="gender">{t("fields.gender")}</GlassLabel>
              <GlassSelect
                id="gender"
                {...register("gender")}
                error={errors.gender?.message}
              >
                <option value="">{tCommon("selectOption")}</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </GlassSelect>
            </div>

            {/* Contact Info */}
            <div className="sm:col-span-6 border-t border-white/10 pt-4 mt-2">
              <h5 className="text-sm font-medium text-white mb-3">
                Contact Information
              </h5>
            </div>

            <div className="sm:col-span-3">
              <GlassLabel htmlFor="emailPersonal">Email (Personal)</GlassLabel>
              <GlassInput
                type="email"
                id="emailPersonal"
                {...register("emailPersonal")}
                error={errors.emailPersonal?.message}
              />
            </div>
            <div className="sm:col-span-3">
              <GlassLabel htmlFor="emailCompany">Email (Company)</GlassLabel>
              <GlassInput
                type="email"
                id="emailCompany"
                {...register("emailCompany")}
                error={errors.emailCompany?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <GlassLabel htmlFor="mobile">{t("fields.mobile")}</GlassLabel>
              <GlassInput
                id="mobile"
                {...register("mobile")}
                error={errors.mobile?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <GlassLabel htmlFor="phonePersonal">Phone (Home)</GlassLabel>
              <GlassInput
                id="phonePersonal"
                {...register("phonePersonal")}
                error={errors.phonePersonal?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <GlassLabel htmlFor="lineId">{t("fields.lineId")}</GlassLabel>
              <GlassInput
                id="lineId"
                {...register("lineId")}
                error={errors.lineId?.message}
              />
            </div>

            <div className="sm:col-span-6">
              <GlassLabel htmlFor="address">{t("fields.address")}</GlassLabel>
              <GlassInput
                id="address"
                {...register("address")}
                error={errors.address?.message}
              />
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="pt-6 space-y-6">
          <div className="border-b border-white/10 pb-2 mb-4">
            <h4 className="text-lg font-medium text-white">{t("workInfo")}</h4>
            <p className="text-xs text-white/50">{t("workInfoDesc")}</p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <GlassLabel htmlFor="employeeId">
                {t("fields.employeeId")} *
              </GlassLabel>
              <GlassInput
                id="employeeId"
                {...register("employeeId")}
                error={errors.employeeId?.message}
                placeholder="EMP-001"
              />
            </div>

            <div className="sm:col-span-3">
              <GlassLabel htmlFor="companyId">
                {t("fields.company")} *
              </GlassLabel>
              <GlassSelect
                id="companyId"
                {...register("companyId")}
                error={errors.companyId?.message}
              >
                <option value="">{t("placeholders.selectCompany")}</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </GlassSelect>
            </div>

            <div className="sm:col-span-3">
              <GlassLabel htmlFor="unitId">{t("fields.unit")}</GlassLabel>
              <GlassSelect
                id="unitId"
                {...register("unitId")}
                error={errors.unitId?.message}
              >
                <option value="">
                  {t("placeholders.selectUnit")} ({tCommon("optional")})
                </option>
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </GlassSelect>
            </div>

            <div className="sm:col-span-3">
              <GlassLabel htmlFor="departmentId">
                {t("fields.department")} *
              </GlassLabel>
              <GlassSelect
                id="departmentId"
                {...register("departmentId")}
                error={errors.departmentId?.message}
              >
                <option value="">{t("placeholders.selectDepartment")}</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </GlassSelect>
            </div>

            <div className="sm:col-span-6">
              <GlassLabel htmlFor="positionIds">
                {t("fields.positions")} *
              </GlassLabel>
              <GlassSelect
                multiple
                id="positionIds"
                {...register("positionIds")}
                className="h-32"
                error={errors.positionIds?.message}
              >
                {positions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </GlassSelect>
              <p className="mt-2 text-xs text-white/40">
                {t("hints.multiPosition")}
              </p>
            </div>

            <div className="sm:col-span-3">
              <GlassLabel htmlFor="joinDate">
                {t("fields.joinDate")} *
              </GlassLabel>
              <GlassInput
                type="date"
                id="joinDate"
                {...register("joinDate")}
                error={errors.joinDate?.message}
              />
            </div>
            <div className="sm:col-span-3">
              <GlassLabel htmlFor="status">Status</GlassLabel>
              <GlassSelect id="status" {...register("status")}>
                <option value="PROBATION">PROBATION</option>
                <option value="ACTIVE">ACTIVE</option>
              </GlassSelect>
            </div>
          </div>
        </div>

        {/* Support Documents - New Section */}
        <div className="pt-6 space-y-6">
          <div className="border-b border-white/10 pb-2 mb-4">
            <h4 className="text-lg font-medium text-white">Documents</h4>
            <p className="text-xs text-white/50">Attach relevant documents.</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <GlassLabel>Attachment</GlassLabel>
              <FileUpload
                value={document}
                onChange={(file) => setValue("document", file)}
                onRemove={() => setValue("document", null)}
                error={errors.document?.message as string}
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-end gap-3">
          <Link href="/employees">
            <GlassButton type="button" variant="secondary">
              {tCommon("cancel")}
            </GlassButton>
          </Link>
          <GlassButton type="submit" isLoading={isLoading}>
            {isLoading ? tCommon("saving") : tCommon("save")}
          </GlassButton>
        </div>
      </form>
    </GlassCard>
  );
}
