export default (environment = 'development') => ({ // eslint-disable-line

  // link file UUID
  id: '9ffa399c-b31b-11e7-a398-73d59db9e399',

  // canonical URL of the published page
  //  get filled in by the ./configure script
  url: 'https://ig.ft.com/gender-pay-gap-calculator/',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2017-11-10T04:00:25.998Z'),

  headline: 'Work out your personal gender pay gap',

  // summary === standfirst (Summary is what the content API calls it)
  summary: '',

  topic: {
    name: 'Gender Pay Gap',
    url: 'https://www.ft.com/gender-pay-gap',
  },

  mainImage: {
    title: 'Gender pay gap illustration',
    description: '',
    credit: 'Clare Mallison',

    // You can provide a UUID to an image and it was populate everything else
    // uuid: '981c76c4-c543-11e7-b30e-a7c1c7c13aab',

    // You can also provide a URL
    url: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A981c76c4-c543-11e7-b30e-a7c1c7c13aab?source=ig&width=600',
      },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'Anna Leach', url: 'https://www.ft.com/anna-leach' },
    { name: 'Federica Cocco', url: 'https://www.ft.com/federica-cocco' },
  ],

  // Appears in the HTML <title>
  title: 'Work out your personal gender pay gap',

  // meta data
  description: '',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  socialImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A981c76c4-c543-11e7-b30e-a7c1c7c13aab?source=ig&width=600',
  socialHeadline: 'Work out your personal gender pay gap',
  socialDescription: 'Find out whether there is a gender pay gap for your job with our calculator.',
  // twitterCreator: '@author's_account', // shows up in summary_large_image cards

  // TWEET BUTTON CUSTOM TEXT
  // tweetText: '',
  // twitterRelatedAccounts: ['authors_account_here', 'ftdata'], // Twitter lists these as suggested accounts to follow after a user tweets (do not include @)

  // Fill out the Facebook/Twitter metadata sections below if you want to
  // override the General social options above

  // TWITTER METADATA (for Twitter cards)
  // twitterImage: '',
  // twitterHeadline: '',
  // twitterDescription: '',

  // FACEBOOK
  facebookImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A981c76c4-c543-11e7-b30e-a7c1c7c13aab?source=ig&width=600',
  facebookHeadline: 'Work out your personal gender pay gap',
  facebookDescription: 'Find out whether there is a gender pay gap for your job, and how big it is, with our calculator.',

  //ADVERTISING
  ads: {
    // ad unit hierarchy makes ads more granular. Start with ft.com and /companies /markets /world as appropriate to your story
    gptAdunit: 'ft.com/companies/european',
    // granular targeting is optional and will be specified by the ads team
    dftTargeting: '',
  },

  tracking: {

    /*

    Microsite Name

    eg guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
