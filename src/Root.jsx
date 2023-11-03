import NavBar from './components/ui/navbar';
import DataForm from './components/forms/data';

export default function Root() {
    return (

        <div className=''>
            <NavBar />
            <div className='grid grid-cols-12'>
                <div className='col-span-3 border-r h-screen border-black'>
                    <div className='mx-4'>
                        <DataForm />
                    </div>

                </div>

                <div className='col-span-6'>

                </div>
            </div>
        </div>

    );
}