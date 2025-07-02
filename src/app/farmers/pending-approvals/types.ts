export interface Farmer {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  created_at: string;
  nid_front: string;
  nid_back: string;
}

export interface FarmerDetails extends Farmer {
  is_phone_verified: boolean;
  is_approved: boolean;
  approved_at: string | null;
} 