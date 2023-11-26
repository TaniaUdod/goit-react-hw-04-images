import { useEffect, useState } from 'react';
import { getImages } from 'api/image';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Notify } from 'notiflix';
import { AppContainer } from './App.styled';
import { ScrollUpButton } from './ScrollToTop/ScrollToTop.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function handleImages() {
      try {
        setIsLoading(true);
        const data = await getImages(query, currentPage);

        if (!data.hits.length) {
          Notify.failure(
            `Sorry, there are no images matching your search query. Please try again.`
          );
          setIsLoading(false);
          setIsLoadMore(false);
          return;
        }

        if (currentPage === 1) {
          Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }

        setImages(prevImages => [...prevImages, ...data.hits]);
        setError('');
        setIsLoadMore(currentPage < Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    handleImages();
  }, [query, currentPage]);

  const handleSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }

    setImages([]);
    setCurrentPage(1);
    setQuery(newQuery);
  };

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <AppContainer>
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {isLoadMore && !isLoading && <Button onClick={loadMore} />}
      {error && (
        <p style={{ textAlign: 'center', margin: 'auto' }}>Sorry. {error} 😭</p>
      )}
      <ScrollUpButton smooth />
    </AppContainer>
  );
};
