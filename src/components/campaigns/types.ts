export interface Campaign {
  _id: string;
  name: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  leads: string[];
  accountIDs?: string[];
}

export type FilterStatus = "ALL" | "ACTIVE" | "INACTIVE";
