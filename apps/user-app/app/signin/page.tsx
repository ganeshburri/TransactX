import Signin from "../../components/SignIn";
import { authOptions } from '../lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const SigninPage = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect('/');
    }
    return <Signin />;
};

export default SigninPage;