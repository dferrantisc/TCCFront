import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";

import PageChange from "components/PageChange/PageChange.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/nextjs-argon-dashboard.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "context/AuthContext";
import { PageModalProvider } from "context/usePageModal";
import { PageDeleteModalProvider } from "context/usePageDeleteModal";
import { PageUpdateModalProvider } from "context/usePageUpdateModal";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>NextJS Argon Dashboard by Creative Tim</title>
        </Head>
        <AuthProvider>
          <PageModalProvider>
            <PageDeleteModalProvider>
              <PageUpdateModalProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
                <ToastContainer />
              </PageUpdateModalProvider>
            </PageDeleteModalProvider>
          </PageModalProvider>
        </AuthProvider>
      </React.Fragment>
    );
  }
}
