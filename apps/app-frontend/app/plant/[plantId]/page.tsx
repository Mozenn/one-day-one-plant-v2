import AuthGuard from "@/components/Auth/AuthGuard";
import PlantContainer from "@/components/Plant/Plant";

const PlantPage = ({ params }: { params: { plantId?: string } }) => {
  if (!params?.plantId) {
    return;
  }

  return (
    <AuthGuard>
      <PlantContainer plantId={params.plantId} />
    </AuthGuard>
  );
};

export default PlantPage;
