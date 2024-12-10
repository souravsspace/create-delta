import { getCurrentUser } from "@/lib/session";
import Wrapper from "@/components/shared/wrapper";
import UserCard from "./components/user-card";
import ProfileImageUpdate from "./components/profile-image-update";
import ProfileOthersUpdate from "./components/profile-others-update";

const HomePage = async () => {
  const user = await getCurrentUser();

  return (
    <Wrapper>
      <div className="mx-auto my-20 flex max-w-xl flex-col gap-6 md:gap-10">
        <UserCard user={user} />
        <ProfileOthersUpdate />
        <ProfileImageUpdate />
      </div>
    </Wrapper>
  );
};

export default HomePage;
