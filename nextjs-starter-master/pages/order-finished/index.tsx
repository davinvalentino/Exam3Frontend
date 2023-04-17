import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import Link from 'next/link';
import useSwr from 'swr';

const IndexPage: Page = () => {
    return (
        <div>
            <Title>GripFood</Title>
            <h1 className='mb-5 text-3xl'>Thank you for ordering using GripFood!</h1>      
            <Link href='/'>Return to Restaurant List</Link>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
