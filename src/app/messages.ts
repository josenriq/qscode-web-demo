export type CodeMessage = {
  imageUrl?: string;
  title: string;
  text: string;
  actionUrl?: string;
  actionText?: string;
};

export const MESSAGES: Record<string, CodeMessage> = {
  'CAGABC': {
    imageUrl:
      'https://www.kindpng.com/picc/m/88-888125_transparent-hello-my-name-is-clipart-hello-png.png',
    title: 'Hello!',
    text: 'This is a simple message',
  },
  'CEDFGAEC': {
    imageUrl:
      'https://depor.com/resizer/_dMVhwfUN7O448Glr-FYssfIEzM=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/LG3RLUCZ4NECJO37FANYBLO65E.png',
    title: 'Costa Rica vs New Zealand',
    text: 'On June 14th, Costa Rica will play against New Zealand for a chance to quality to the FIFA Qatar World Cup 2022.',
    actionUrl:
      'https://www.sportingnews.com/ar/futbol/news/costa-rica-vs-nueva-zelanda-dia-hora-como-donde-ver-repechaje-mundial-qatar-2022/owkk5tim9ezu40eammzgrcpe',
    actionText: 'See Details',
  },
  'CDEDGEDC': {
    imageUrl: 'https://lavca.org/app/uploads/2017/02/slidebean.jpg',
    title: 'Slidebean',
    text: 'We help startups pitch to investors. Use our toolkit to get investor-ready, or work with our team to prepare your pitch deck and financials.',
    actionUrl: 'https://slidebean.com',
    actionText: 'Go to website',
  },
};
