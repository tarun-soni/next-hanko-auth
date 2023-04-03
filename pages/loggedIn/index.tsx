import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import { ParsedUrlQuery } from 'querystring';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import ReziableContainer from '../../components/ReziableContainer';
import CustomButton from '../../components/CustomButton';

interface Props {
  cookies: ParsedUrlQuery;
}

const api_url = process.env.NEXT_PUBLIC_HANKO_API;

export default function MyPage({ cookies }: Props) {
  const registerHanko = useRef<any>();

  const registerImport = async () => {
    const { register } = await import('@teamhanko/hanko-elements');
    registerHanko.current = register;
  };

  useEffect(() => {
    registerImport().then(() => {
      registerHanko.current({ shadow: true, injectStyles: true }).then(() => {
        console.log('hanko-elements registered');
      });
    });
  }, [cookies.hanko, registerHanko]);

  const router = useRouter();
  const logoutPress = () => {
    Object.keys(cookies).forEach((name: string) => {
      destroyCookie(null, name);
    });
    router.replace('/');
  };

  const redirectAfterLogin = useCallback(() => {
    router.replace('/loggedIn');
  }, [router]);

  useEffect(() => {
    document.addEventListener('hankoAuthSuccess', redirectAfterLogin);
    return () =>
      document.removeEventListener('hankoAuthSuccess', redirectAfterLogin);
  }, [redirectAfterLogin]);

  return (
    <ReziableContainer>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-white px-8">
        {api_url ? (
          <Suspense fallback={'Loading...'}>
            {<hanko-profile api={api_url} lang="en" />}
          </Suspense>
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
  return { cookies };
};
