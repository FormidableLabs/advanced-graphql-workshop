import React from 'react';

export const useScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
}
