import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  cookies: ParsedUrlQuery;
}

export default function MyPage({ cookies }: Props) {
  const router = useRouter();
  const logoutPress = () => {
    Object.keys(cookies).forEach((name: string) => {
      destroyCookie(null, name);
    });
    router.replace('/home');
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
      <button
        style={{
          width: 100,
          height: 50,
          backgroundColor: '#BB4444',
          borderRadius: 10,
        }}
        onClick={logoutPress}
      >
        Logout
      </button>
    </div>
  );
}

MyPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookies = parseCookies(ctx);
  return { cookies };
};
