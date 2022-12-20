import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { register } from '@teamhanko/hanko-elements/hanko-auth';

const api_url = process.env.NEXT_PUBLIC_HANKO_API;

export default function HankoAuth() {
  const router = useRouter();

  const redirectAfterLogin = useCallback(() => {
    router.replace('/loggedIn');
  }, [router]);

  useEffect(() => {
    document.addEventListener('hankoAuthSuccess', redirectAfterLogin);
    return () =>
      document.removeEventListener('hankoAuthSuccess', redirectAfterLogin);
  }, [redirectAfterLogin]);

  useEffect(() => {
    // register the component
    // see: https://github.com/teamhanko/hanko/blob/main/elements/README.md#script
    register({ shadow: true, injectStyles: true }).catch((error) => {
      // handle error
      console.log('error', error);
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f4f5f5',
      }}
    >
      <button type="button" className="hanko-auth">
        Login with Hanko
      </button>
      <hanko-auth
        // @ts-ignore
        api={api_url}
        lang="en"
        // @ts-ignore
        experimental={'conditionalMediation'}
      />
    </div>
  );
}
