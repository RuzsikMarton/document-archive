"use client";

import { Organization } from "@/generated/prisma/client";
import { Building2 } from "lucide-react";
import { CldImage } from "next-cloudinary";

const EmployeeOrganization = ({
  organization,
}: {
  organization: Organization;
}) => {
  return (
    <div className="max-w-3xl md:min-w-md lg:max-w-4xl xl:max-w-5xl mx-auto p-8">
      <div className="w-full bg-muted dark:bg-card border rounded-lg p-10 space-y-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-6">
          {organization.logo ? (
            <div className="w-20 h-20 rounded-lg bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
              <CldImage
                src={organization.logo}
                alt={organization.name}
                width={80}
                height={80}
                sizes="100vw"
                className="object-contain max-w-full max-h-full"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-lg bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
              <Building2 className="w-10 h-10 text-muted-foreground" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{organization.name}</h1>
            <p className="text-muted-foreground text-base">
              @{organization.slug}
            </p>
          </div>
        </div>

        {/* Company Details */}
        <div className="space-y-6 pt-6 border-t">
          {organization.email && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-base font-medium">{organization.email}</p>
            </div>
          )}

          {organization.telephone && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Telefónne číslo
              </p>
              <p className="text-base font-medium">{organization.telephone}</p>
            </div>
          )}

          {organization.website && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Webová stránka
              </p>
              <a
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-primary hover:underline"
              >
                {organization.website}
              </a>
            </div>
          )}

          {(organization.address ||
            organization.city ||
            organization.postalCode) && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Adresa</p>
              <p className="text-base font-medium">
                {organization.address}
                {organization.address &&
                  (organization.city || organization.postalCode) && <br />}
                {[organization.city, organization.postalCode]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>
          )}

          {organization.ico && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">IČO</p>
              <p className="text-base font-medium">{organization.ico}</p>
            </div>
          )}

          {organization.dic && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">DIČ</p>
              <p className="text-base font-medium">{organization.dic}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeOrganization;
