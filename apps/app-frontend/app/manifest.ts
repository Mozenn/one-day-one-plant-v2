import { MetadataRoute } from 'next';

// https://www.w3.org/TR/appmanifest/#:~:text=A%20application%20manifest%20is%20a,which%20the%20manifest%20was%20fetched.

export default function manifest(): MetadataRoute.Manifest {
  return {
    lang: 'en',
    name: 'One Day One Plant',
    short_name: 'One Day One Plant',
    description: 'Grow your plant collection and learn about Earth flora',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    icons: [
      {
        src: '/icon1.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: 'icon2.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: 'icon3.png',
        sizes: '270x270',
        type: 'image/png',
      },
    ],
  };
}