export interface Contact {
  id: number;
  name: string;
  identification: string;
  email?: string;
  phonePrimary?: string;
  phoneSecondary?: string;
  fax?: string;
  mobile?: string;
  observations?: string;
  type?: Array<"client" | "provider">;
  address?: {
    address: string;
    city: string;
  };
  seller?: {
    id: string;
    name: string;
    identification: string;
    observations: string;
  };
  term?: {
    id: number;
    name: string;
    days: number;
  };
}
