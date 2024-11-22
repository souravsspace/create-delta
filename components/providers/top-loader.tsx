import NextTopLoader from "nextjs-toploader";

const TopLoader = () => {
  return (
    <>
      <NextTopLoader
        color="#3b82f6"
        initialPosition={0.08}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
      />
    </>
  );
};

export default TopLoader;
