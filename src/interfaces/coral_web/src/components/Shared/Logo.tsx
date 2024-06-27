import React from 'react';
import cx from 'classnames';
import Image from 'next/image';

interface LogoProps {
  includeBrandName?: boolean;
  hasCustomLogo?: boolean;
  style?: 'default' | 'grayscale' | 'coral';
  className?: string;
  darkModeEnabled?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  includeBrandName = true, 
  hasCustomLogo,
  className,
  style = 'default',
  darkModeEnabled,
}) => {
    if (hasCustomLogo) {
      return (
        <div className={cx('flex items-center', className)}>
          <Image
            src="/images/Mind.png"
            width={75}
            height={75}
            alt="Minds kunskapssökare"
          />
          {includeBrandName && (
            <span className={cx('ml-2', { 'text-black': !darkModeEnabled, 'text-white': darkModeEnabled })}>
              Minds kunskapssökare
            </span>
          )}
        </div>
      );
    } 
  
    return (
      <div className={cx('flex items-center', className)}>
        <svg
          viewBox={includeBrandName ? '0 0 96 16' : '0 0 16 16'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cx('h-full', { 'w-24': includeBrandName, 'w-4': !includeBrandName }, className)}
        >
          {/* SVG paths here */}
        </svg>
        {includeBrandName && (
          <span className={cx('ml-2', { 'text-black': !darkModeEnabled, 'text-white': darkModeEnabled })}>
            Mind & AI Sweden
          </span>
        )}
      </div>
      
    );
  };