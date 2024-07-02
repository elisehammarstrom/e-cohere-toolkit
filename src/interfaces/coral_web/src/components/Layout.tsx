import { Transition } from '@headlessui/react';
import { capitalize } from 'lodash';
import React, { Children, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { DeploymentsDropdown } from '@/components/DeploymentsDropdown';
import { EditEnvVariablesButton } from '@/components/EditEnvVariablesButton';
import { NavigationUserMenu } from '@/components/NavigationUserMenu';
import { SettingsDrawer } from '@/components/Settings/SettingsDrawer';
import { Banner } from '@/components/Shared';
import { NavigationBar } from '@/components/Shared/NavigationBar/NavigationBar';
import { PageHead } from '@/components/Shared/PageHead';
import { BannerContext } from '@/context/BannerContext';
import { useIsDesktop } from '@/hooks/breakpoint';
import { useSession } from '@/hooks/session';
import { useSettingsStore } from '@/stores';
import { cn } from '@/utils/cn';
import { SearchBar } from '@/components/Shared/SearchBar/SearchBar'; //custom searchbar

const LeftDrawer: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>;
const Main: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export const LayoutSection = {
  LeftDrawer,
  Main,
};

type Props = {
  title?: string;
} & PropsWithChildren;

/**
 * This component is in charge of layout out the entire page.
 * It shows the navigation bar, the left drawer and main content.
 * On small devices (e.g. mobile), the left drawer and main section are stacked vertically.
 */
export const Layout: React.FC<Props> = ({ title = 'Chat', children }) => {
  const { message: bannerMessage } = useContext(BannerContext);
  const {
    settings: { isConvListPanelOpen, isMobileConvListPanelOpen },
  } = useSettingsStore();
  const isDesktop = useIsDesktop();
  const { session } = useSession();

  let leftDrawerElement: React.ReactNode = null;
  let mainElement: React.ReactNode = null;

  Children.toArray(children).forEach((child: React.ReactNode) => {
    const element = child as React.ReactElement;
    const { type } = element;

    switch (type) {
      case LeftDrawer:
        leftDrawerElement = child;
        break;
      case Main:
        mainElement = child;
        break;
      default:
        break;
    }
  });

  const [userMenu, setUserMenu] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (session && session.email) {
      setUserMenu(<NavigationUserMenu userEmail={session.email} />);
    }
  }, [session]);

  return (
    <>
    <PageHead title={capitalize(title)} />

    <NavigationBar>
          <span className="flex items-center gap-x-2">
            {/* <DeploymentsDropdown /> */}
            {/* <EditEnvVariablesButton className="py-0" /> */}
            {userMenu}
          </span>
        </NavigationBar>

    <div className="fixed flex flex-col h-screen w-full">

      <div className="h-2/5 w-full flex flex-row justify-end">
      {/* First horizontal section content */}

        {/* <div className="flex justify-center mb-4 w-full flex flex-col w-1/4 bg-white h-full"> */}
        <div className="flex justify-center mb-4 w-full flex flex-col w-1/4 h-full">
          {/* left section content in first horizontal section */}
        </div>

        <div className="flex mb-4 w-full h-full flex flex-col mt-auto w-2/4">
              {/* middle section content in first horizontal section */}
            <div className="flex flex-col items-center w-full h-full justify-end">
              <h1 className="text-xl font-bold">Kunskapssökaren</h1>
              <h2 className="text-l font-bold">Subheadline</h2>
              <div className="flex flex-col my-8 items-center w-full">
                <SearchBar/>
                {/* <button className="w-full my-4 md:w-auto px-6 py-3 bg-mindorange border-mindorange text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">Options</button> */}

              </div>
              
            </div>
        </div>

      {/* <div className="flex justify-center mb-4 w-full flex flex-col w-1/4 bg-black h-full"> */}
      <div className="flex justify-center mb-4 w-full flex flex-col w-1/4 h-full">
        {/* right section content in first horizontal section */}
      </div>
    
    </div>

    

    {/* <div className="h-3/5 w-full bg-mindorange"> */}
    <div className="h-3/5 w-full my-8">
      {/* Second horizontal section content */}

      {/* <div className="h-1/2 w-full bg-mindmist border-t-5 border-gray-200"> */}
      <div className="h-1/2 w-full border-t-5 border-gray-200 justify-start flex flex-col items-center gap-8">
        {/* 1st section content in 2nd horizontal section */}
        <section className="flex flex-col gap-4 items-center w-full max-w-2xl">
            <h2 className="text-lg font-semibold">Select your sources:</h2>
            <div className="flex gap-4">
              <div className="flex items-center mb-4">
                <input 
                  id="default-checkbox" 
                  type="checkbox" 
                  value="" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label 
                  htmlFor="default-checkbox" 
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  PubMed
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input 
                  id="checked-checkbox" 
                  type="checkbox" 
                  value="" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label 
                  htmlFor="checked-checkbox" 
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Google Scholar
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input 
                  id="checked-checkbox" 
                  type="checkbox" 
                  value="" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label 
                  htmlFor="checked-checkbox" 
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Google Scholar
                </label>
              </div>

            </div>
          </section>

          <section className="flex flex-col gap-4 items-center">

            <h2 className="text-lg font-semibold">And/or upload your own</h2>

          </section>


      </div>

      {/* <div className="h-1/2 w-full bg-mindblue"> */}
      <div className="h-1/2 w-full">
          {/* 2nd section content in 2nd horizontal section */}     
      </div>
    </div>


    </div>

    

    </>
  );
};
