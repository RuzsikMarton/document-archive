import { Folder } from "@/generated/prisma/client";

export type CreateFolderFormType = {
  name: string;
  year: number;
};

type FolderOrganization = {
  name: string;
  ico: string | null;
  dic: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  telephone: string | null;
  email: string | null;
  website: string | null;
};

export type FolderWithOrganization = Folder & {
  organization: FolderOrganization | null;
};
