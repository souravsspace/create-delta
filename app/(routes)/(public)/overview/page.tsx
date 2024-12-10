import Wrapper from "@/components/shared/wrapper";
import Subscribe from "./components/subscribe";
import GetStarted from "./components/get-started";

const OverviewPage = () => {
  return (
    <Wrapper>
      <div className="mx-auto my-6 flex max-w-xl flex-col gap-6 sm:my-10 md:my-16 md:gap-10 lg:my-20">
        <Subscribe />
        <GetStarted />
      </div>
    </Wrapper>
  );
};

export default OverviewPage;
