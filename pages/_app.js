import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Announcement } from "../components/Announcement";

import Store from "../Redux/Store";
import { useEffect } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import { parseCookies } from "nookies";
import axios from "axios";
import NavBar from "../components/NavBar";

const Footer = dynamic(() => import("../components/Footer"));
const NewsLetter = dynamic(() => import("../components/NewsLetter"));

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const router = useRouter();

  useEffect(() => {
    if (pageProps.user) {
      if (
        router.pathname === "/auth/login" ||
        router.pathname === "/auth/register"
      ) {
        router.push("/");
        toast.warn("Your are already logged in now !");
      }
    }
    const handleRouteChange = (url) => {
      NProgress.start();
    };

    const handleRouteChangeEnd = () => {
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    Router.events.on("routeChangeComplete", handleRouteChangeEnd);
    Router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
      Router.events.off("routeChangeComplete", handleRouteChangeEnd);
      Router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [pageProps.user,router]);

  return (
    <>
      <Provider store={Store}>
        {pathname !== "/auth/login" && pathname !== "/auth/register"   && (
          <>
            <Announcement />
            <NavBar user={pageProps.user} />
          </>
        )}

        <Component {...pageProps} />

        {pathname !== "/auth/login" && pathname !== "/auth/register" && pathname !== '/404' && (
          <>
            <NewsLetter />
            <Footer />    
          </>
        )}

        <ToastContainer position="bottom-left" />
      </Provider>
      
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const { userToken } = parseCookies(ctx);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (userToken) {    
    const domainName = ctx.req?.headers?.host;

    try {
      if (domainName === "localhost:3000") {
        const checkUserExits = await axios.post(
          // `${process.env.DEVELOPMENT_DOMAIN}/api/auth/login`,
          'http://localhost:3000/api/auth/login',
          { userToken }
        );
        const user = checkUserExits.data.user;

        pageProps.user = user;
      } 
        const checkUserExits = await axios.post(
          // `${process.env.PRODUCTION_DOMAIN}/api/auth/login`,
          'https://shopeasee.vercel.app/api/auth/login',
          { userToken }
        );
        const user = checkUserExits.data.user;
        pageProps.user = user;
      
    } catch (err) {
      console.log("the error block is running", err);
    }
  }
  return { pageProps };
};

export default MyApp;
