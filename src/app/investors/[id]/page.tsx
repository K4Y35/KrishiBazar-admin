import InvestorDetailsClient from "./_components/investor-details-client";

export default function InvestorDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <InvestorDetailsClient investorId={params.id} />;
}
