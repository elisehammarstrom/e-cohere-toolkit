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

    <div className="fixed flex flex-col h-screen w-full bg-black">

      <div className="h-2/5 w-full bg-mindorange flex flex-row justify-end">
      {/* First section content */}

      <div className="flex justify-center mb-4 w-full flex flex-col w-1/3 bg-white h-full">
        {/* left section content */}
      </div>

      <div className="flex mb-4 w-full flex flex-col mt-auto w-1/3">
            {/* middle section content */}
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold">Sök här</h1>
            <div className="flex flex-row items-center">
              <SearchBar className="flex-grow" />
              {/* <button className="ml-4 px-4 py-2 text-white bg-blue-500 rounded">Options</button> */}

              <button className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">Options</button>

            </div>
            
          </div>
      </div>

      <div className="flex justify-center mb-4 w-full flex flex-col w-1/3 bg-black h-full">
        {/* right section content */}
      </div>
    
    
    </div>

    

    <div className="h-3/5 w-full bg-mindorange">
      {/* Second section content */}

      <div className="h-1/2 w-full bg-mindmist border-t-5 border-gray-200">
        {/* 2nd section content */}
      </div>

      <div className="h-1/2 w-full bg-mindblue">
        {/* 3nd section content */}
      </div>
    </div>



      


    </div>
    {/* // old: */}
      {/* <PageHead title={capitalize(title)} />
      <div className="flex flex-col h-screen w-full p-3 bg-white">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">Home Page</h1>
          {userMenu}
        </header>
        <main className="flex flex-grow flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <SearchBar className="flex-grow" />
            <button className="ml-4 px-4 py-2 text-white bg-blue-500 rounded">Swe/Eng search Options</button>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Your selection for lookout:</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-white bg-gray-500 rounded">Theme 1: Suicide prevention</button>
              <button className="px-4 py-2 text-white bg-gray-500 rounded">Theme 2: Medical treatments for x</button>
              <select className="px-4 py-2 border border-gray-300 rounded">
                <option>Dropdown of known themes to select from</option>
                <option>Have default</option>
              </select>
            </div>
            <button className="self-start px-4 py-2 text-white bg-green-500 rounded">Save</button>
          </section>
          <section className="flex gap-4">
            <div className="flex-grow p-4 border border-gray-300 rounded">
              <h3 className="mb-2 font-semibold">Recent Pubs</h3>
              <div className="mb-2">
                <h4 className="font-bold">Title</h4>
                <p>Summary</p>
              </div>
              <div>
                <h4 className="font-bold">Title</h4>
                <p>Summary</p>
              </div>
            </div>
            <div className="flex-grow p-4 border border-gray-300 rounded">
              <h3 className="mb-2 font-semibold">Updates for your saved themes</h3>
              {/* Add content here */}
            {/* </div>
          </section>

        </main>
        

      </div> */}
    </>
  );
};
