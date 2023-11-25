import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

const getImages = async ({ pageParam = 0 }) => {
    const res = await fetch(`http://localhost:5000/gallery?limit=12&offset=${pageParam}`);
    if (!res.ok) {
        throw new Error(`Error fetching images: ${res.statusText}`);
    }
    const data = await res.json();
    return {
        images: data,
        prevOffset: pageParam,
    };
};

const Loop = () => {
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['images'],
        queryFn: getImages,
        getNextPageParam: (lastPage) => {
            if (lastPage.prevOffset + 12 > lastPage.images.length) {
                return false;
            }
            return lastPage.prevOffset + 12;
        },
    });

    const images = data?.pages.flatMap((page) => page.images);

    return (
        <div>
            <InfiniteScroll
                dataLength={images ? images.length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loader={<div>Loading ...</div>}
            >
                <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 my-10'>
                    {images &&
                        images.map((image, idx) => (
                            <div key={idx} className='p-1 bg-red-300'>
                                <img src={image.url} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            </div>
                        ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Loop;
