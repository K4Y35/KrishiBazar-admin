export interface Investor {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  created_at: string;
  nid_front: string;
  nid_back: string;
}

export interface InvestorDetails extends Investor {
  is_phone_verified: boolean;
  is_approved: boolean;
  approved_at: string | null;
}
