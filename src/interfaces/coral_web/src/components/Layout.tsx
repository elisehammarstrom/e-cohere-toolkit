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

    <div className="fixed flex flex-col h-screen w-full">

      {/* <div className="h-2/5 w-full bg-mindorange flex flex-row justify-end"> */}
      <div className="h-2/5 w-full flex flex-row justify-end">
      {/* First horizontal section content */}

        {/* <div className="flex justify-center mb-4 w-full flex flex-col w-1/4 bg-white h-full"> */}
        <div className="flex justify-center mb-4 w-full flex flex-col w-1/4 h-full">
          {/* left section content in first horizontal section */}
        </div>

        <div className="flex mb-4 w-full h-full flex flex-col mt-auto w-2/4">
              {/* middle section content in first horizontal section */}
            <div className="flex flex-col items-center w-full h-full justify-end">
              <h1 className="text-xl font-bold">Sök här</h1>
              <h2 className="text-l font-bold">Subheadline</h2>
              <div className="flex flex-col my-4 items-center w-full">
                <SearchBar/>
                <button className="w-full my-4 md:w-auto px-6 py-3 bg-mindorange border-mindorange text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">Options</button>

              </div>
              
            </div>
        </div>

      {/* <div className="flex justify-center mb-4 w-full flex flex-col w-1/4 bg-black h-full"> */}
      <div className="flex justify-center mb-4 w-full flex flex-col w-1/4 h-full">
        {/* right section content in first horizontal section */}
      </div>
    
    
    </div>

    

    {/* <div className="h-3/5 w-full bg-mindorange"> */}
    <div className="h-3/5 w-full">
      {/* Second horizontal section content */}

      {/* <div className="h-1/2 w-full bg-mindmist border-t-5 border-gray-200"> */}
      <div className="h-1/2 w-full border-t-5 border-gray-200">
        {/* 1st section content in 2nd horizontal section */}
      </div>

      {/* <div className="h-1/2 w-full bg-mindblue"> */}
      <div className="h-1/2 w-full">
          {/* 2nd section content in 2nd horizontal section */}
      </div>
    </div>

    {/* <svg viewBox="0 0 1024 1024"
              class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fill-opacity="0.7">
              </circle>
              <defs>
                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                      <stop stop-color="#F17509"></stop>
                      <stop offset="1" stop-color="#FFE1D4"></stop>
                  </radialGradient>
              </defs>
          </svg> */}


    </div>

    

    </>
  );
};
