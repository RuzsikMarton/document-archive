import { Folder } from "@/generated/prisma/client";

export type CreateFolderFormType = {
  name: string;
  year: number;
};

type FolderCompany = {
  name: string;
  ico: string | null;
  dic: string | null;
  address: string | null;
  telephone: string | null;
  email: string | null;
  website: string | null;
};

export type FolderWithCompany = Folder & {
  company: FolderCompany | null;
};
