import FarmerDetailsClient from './_components/farmer-details-client';

export default function FarmerDetailsPage({ params }: { params: { id: string } }) {
  return <FarmerDetailsClient farmerId={params.id} />;
} 