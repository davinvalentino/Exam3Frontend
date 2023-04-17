import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Exam3BackEndClient, RestaurantDetailModel } from '@/functions/swagger/Exam3BackEnd';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import { Page } from '@/types/Page';
import Link from 'next/link';
import useSwr from 'swr';
import { useRouter } from 'next/router';

const RestaurantDetailTableRow: React.FC<{
    restaurant: RestaurantDetailModel
}> = ({ restaurant }) => {

    return (
        <tr>
            <td className="border px-4 py-2">{restaurant.foodItemName}</td>
            <td className="border px-4 py-2">{restaurant.foodItemPrice}</td>
        </tr>
    );
};


const IndexPage: Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const restaurantDetailUri = id ? `/api/be/api/Restaurants/${id}` : undefined;
    const swrFetcher = useSwrFetcherWithAccessToken();
    const { data, error } = useSwr<RestaurantDetailModel[]>(restaurantDetailUri, swrFetcher);
    return (
        <div>
            <Title>GripFood</Title>
            <h2 className='mb-5 text-3xl'>Menu List</h2>
            <Link href='/'>Return to Restaurant List</Link>
            {Boolean(error) && <Alert type='error' message='Cannot get menus data' description={String(error)}></Alert>}
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>Menu Name</th>
                        <th className='px-4 py-2'>Menu Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <RestaurantDetailTableRow key={i} restaurant={x} onDeleted={() => mutate()}></RestaurantDetailTableRow>)}
                </tbody>
            </table>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
