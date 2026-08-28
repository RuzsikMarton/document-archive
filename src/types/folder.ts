import { Folder, Prisma } from "@/generated/prisma/client";

export type CreateFolderFormType = {
  name: string;
  year: number;
};

export type UpdateFolderFormType = {
  name: string;
  year: number;
  monthFrom?: number | null | undefined;
  monthTo?: number | null | undefined;
  contents: string | undefined;
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

export type DashboardFolder = Prisma.FolderGetPayload<{
  include: {
    member: {
      select: {
        user: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;
