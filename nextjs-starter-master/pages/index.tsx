import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Exam3BackEndClient, Restaurant } from '@/functions/swagger/Exam3BackEnd';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import { Page } from '../types/Page';
import { Authorize } from '@/components/Authorize';
import { useAuthorizationContext } from '@/functions/AuthorizationContext';
import Link from 'next/link';
import useSwr from 'swr';

const RestaurantTableRow: React.FC<{
    restaurant: Restaurant
}> = ({ restaurant }) => {

    return (
        <tr>
            <td className="border px-4 py-2">
                <Link href={`/restaurant/${restaurant.id}`}>
                    {restaurant.name}
                </Link>
            </td>
        </tr>
    );
};

const InnerIndexPage: React.FC = () => {
    const swrFetcher = useSwrFetcherWithAccessToken();
    const { data, error } = useSwr<Restaurant[]>('/api/be/api/Restaurants', swrFetcher);
    return (
        <div>
            <Title>GripFood</Title>
            Welcome!
            <h2 className='mb-5 text-3xl'>Restaurant List</h2>
            {Boolean(error) && <Alert type='error' message='Cannot get restaurants data' description={String(error)}></Alert>}
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>Restaurant Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <RestaurantTableRow key={i} restaurant={x} onDeleted={() => mutate()}></RestaurantTableRow>)}
                </tbody>
            </table>
        </div>
    );
}

const IndexPage: Page = () => {
    return (
        <Authorize>
            <InnerIndexPage></InnerIndexPage>
        </Authorize>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
