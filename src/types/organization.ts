import { editOrganizationSchema } from "@/utils/validation/organization";
import z from "zod";

export interface CreateOrganizationInput {
  name: string;
  slug: string;
  ownerId: string;
}

export type EditOrganizationFormData = z.infer<typeof editOrganizationSchema>;

export interface OrganizationStats {
  employees: number;
  folders: number;
  handedOverFolders: number;
  notHanded: number;
  foldersThisYear: number;
}

export type OrganizationStatsResult = OrganizationStats | null;
