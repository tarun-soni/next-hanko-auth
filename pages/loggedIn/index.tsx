import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import { ParsedUrlQuery } from 'querystring';

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

  return (
    <div
      style={{
        display: 'flex',
        margin: '0 auto auto 0',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2>You are Logged In</h2>

      {api_url ? (
        <hanko-profile api={api_url} lang="en" />
      ) : (
        <h2>Hanko Profile api_url is not loaded. Please check your</h2>
      )}

      <div className="btn" onClick={logoutPress}>
        Logout
      </div>
    </div>
  );
}

MyPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookies = parseCookies(ctx);
  console.log('cookies --', cookies);
  return { cookies };
};
