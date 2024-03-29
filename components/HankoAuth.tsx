import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '@teamhanko/hanko-elements';
import ReziableContainer from './ReziableContainer';
const api_url = process.env.NEXT_PUBLIC_HANKO_API;

interface DisplayError {
  areAnyError: boolean;
  stringifyedError: string | null;
}
export default function HankoAuth() {
  const router = useRouter();
  const [displayError, setDisplayError] = useState<DisplayError>({
    areAnyError: false,
    stringifyedError: null,
  });
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
      setDisplayError({
        areAnyError: true,
        stringifyedError: JSON.stringify(error),
      });
    });
  }, []);

  return (
    <ReziableContainer>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-white px-8">
        {api_url ? (
          <hanko-auth
            api={api_url}
            lang="en"
            // experimental="conditionalMediation"
          />
        ) : (
          <h2>Hanko auth api_url is not loaded. Please check your</h2>
        )}

        {displayError.areAnyError ? (
          <h2
            style={{
              color: '#a32726',
              opacity: 0.8,
            }}
          >
            {displayError.stringifyedError}
          </h2>
        ) : (
          <h2
            style={{
              color: '#a32726',
              opacity: 0.8,
            }}
          >
            No errors
          </h2>
        )}
      </div>
    </ReziableContainer>
  );
}
