import ImageGallery from './ImageGallery';
import Title from './Title';
const HomePage = () => {
  return (
    <>
      <Title />
      <ImageGallery pageType={"painting"}/>
    </>
  );
};

export default HomePage;
