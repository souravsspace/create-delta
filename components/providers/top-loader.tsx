import NextTopLoader from "nextjs-toploader";

const TopLoader = () => {
  return (
    <>
      <NextTopLoader
        color="#E11D48"
        initialPosition={0.08}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #E11D48,0 0 5px #E11D48"
      />
    </>
  );
};

export default TopLoader;
