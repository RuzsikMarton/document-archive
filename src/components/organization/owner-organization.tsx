"use client";

import type { Organization } from "@/generated/prisma/client";
import OrganizationDetailsEditForm from "../forms/organization-details-edit-form";
import OwnerOrganizationStats from "./owner-organization-stats";
import { OrganizationStatsResult } from "@/types/organization";

const OwnerOrganization = ({
  organization,
  stats,
}: {
  organization: Organization;
  stats: OrganizationStatsResult;
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      <OrganizationDetailsEditForm organization={organization} />
      <OwnerOrganizationStats organization={organization} stats={stats} />
    </div>
  );
};

export default OwnerOrganization;
