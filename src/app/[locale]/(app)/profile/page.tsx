"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Briefcase, Building } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const t = useTranslations("Profile");

  // Mock data for now, ideally fetch full profile from API
  const user = session?.user;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-amber-500/20">
            <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
            <AvatarFallback className="text-2xl font-bold bg-linear-to-br from-amber-500 to-orange-600 text-white">
              {user?.name?.charAt(0) || <User className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user?.name}</CardTitle>
            <p className="text-muted-foreground capitalize">
              {user?.role?.toLowerCase()}
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 mt-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium uppercase tracking-wider">
              <Mail className="h-4 w-4" /> {t("email")}
            </div>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium uppercase tracking-wider">
              <Briefcase className="h-4 w-4" /> {t("role")}
            </div>
            <p className="text-lg font-medium">{user?.role}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium uppercase tracking-wider">
              <Building className="h-4 w-4" /> {t("department")}
            </div>
            <p className="text-lg font-medium">-</p> {/* Placeholder */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
