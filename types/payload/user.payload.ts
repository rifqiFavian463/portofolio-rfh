export type UpdateUserPayload = {
  email?: string;
  name?: string;
  password?: string;
  bio?: string | null;

  totalExperience?: number;
  totalProject?: number;

  instagram?: string | null;
  linkedIn?: string | null;
  github?: string | null;
  twitter?: string | null;

  skillIds?: string[]; // 👈 Tambahan
};
