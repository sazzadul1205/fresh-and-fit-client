import { useInfiniteQuery, } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component';

const getImages = async ({ pageParam = 0 }) => {
    const res = await fetch(`http://localhost:5000/gallery?limit=12&offset=${pageParam}`);
    const data = await res.json();
    return data;
};



const Loop = () => {

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['images'],
        queryFn: getImages,
        getNextPageParam: (lastPage) => {
            if (lastPage.prevOffset + 10 > lastPage.imagesCount) {
                return false
            }
            return lastPage.prevOffset
        }
    })

    const images = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.images]
    }, [])
    return (
        <div>
            <InfiniteScroll
                dataLength={images ? images.length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loader={
                    <div>Loading ...</div>
                }
            >
                <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 my-10'>
                    {
                        images &&
                        images.map((images, idx) => {
                            return (
                                <div key={idx} className='p-1 bg-red-300'>
                                    <img
                                        src={images.url}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                </div>

                            )
                        })
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Loop;