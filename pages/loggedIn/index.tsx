import { register } from '@teamhanko/hanko-elements';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import CustomButton from '../../components/CustomButton';
import ReziableContainer from '../../components/ReziableContainer';

interface Props {
  cookies: ParsedUrlQuery;
}

const api_url = process.env.NEXT_PUBLIC_HANKO_API;

export default function MyPage({ cookies }: Props) {
  const router = useRouter();
  const logoutPress = () => {
    Object.keys(cookies).forEach((name: string) => {
      destroyCookie(null, name);
    });
    router.replace('/');
  };

  useEffect(() => {
    if (api_url) {
      try {
        register({ shadow: true }).then(() => {
          console.log('hanko-elements registered');
        });
      } catch (error) {
        console.log('error', error);
      }
    }
  }, []);

  return (
    <ReziableContainer>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-white px-8">
        {api_url ? (
          <hanko-profile api={api_url} lang="en" />
        ) : (
          <h2>Hanko Profile api_url is not loaded. Please check your env</h2>
        )}

        <CustomButton onClick={logoutPress} text={'Logout'} />
      </div>
    </ReziableContainer>
  );
}

MyPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookies = parseCookies(ctx);
  console.log('cookies --', cookies);
  return { cookies };
};
