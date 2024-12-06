import UserCard from "./components/user-card";
import Subscribe from "./components/subscribe";
import { getCurrentUser } from "@/lib/session";
import Wrapper from "@/components/shared/wrapper";

const HomePage = async () => {
  const user = await getCurrentUser();

  return (
    <Wrapper>
      <div className="mx-auto my-20 flex max-w-xl flex-col gap-6 md:gap-10">
        <Subscribe />
        <UserCard user={user} />
      </div>
    </Wrapper>
  );
};

export default HomePage;
