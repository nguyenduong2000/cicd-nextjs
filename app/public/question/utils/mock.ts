export interface IQuestionItem {
  id: string;
  name: string;
  hash: string;
}

export interface IQuestion {
  topic: string;
  key: string;
  question: IQuestionItem[];
}

const questions: IQuestion[] = [
  {
    topic: 'General',
    key: 'general',
    question: [
      {
        id: '1',
        name: 'About Us',
        hash: 'about-us'
      },
      {
        id: '2',
        name: 'Getting Rescue',
        hash: 'getting-rescue'
      },
      {
        id: '3',
        name: 'Our Product',
        hash: 'our-product'
      },
      {
        id: '4',
        name: 'Reinsurance',
        hash: 'reinsurance'
      },
      {
        id: '5',
        name: 'Availability',
        hash: 'availability'
      }
    ]
  },
  {
    topic: 'Platform',
    key: 'platform',
    question: [
      {
        id: '6',
        name: 'About Us',
        hash: 'about-us'
      },
      {
        id: '7',
        name: 'Getting Rescue',
        hash: 'getting-rescue'
      },
      {
        id: '8',
        name: 'Our Product',
        hash: 'our-product'
      },
      {
        id: '9',
        name: 'Reinsurance',
        hash: 'reinsurance'
      },
      {
        id: '10',
        name: 'Availability',
        hash: 'availability'
      }
    ]
  },
  {
    topic: 'How To Use',
    key: 'how',
    question: [
      {
        id: '11',
        name: 'About Us',
        hash: 'about-us'
      },
      {
        id: '12',
        name: 'Getting Rescue',
        hash: 'getting-rescue'
      },
      {
        id: '13',
        name: 'Our Product',
        hash: 'our-product'
      },
      {
        id: '14',
        name: 'Reinsurance',
        hash: 'reinsurance'
      },
      {
        id: '15',
        name: 'Availability',
        hash: 'availability'
      }
    ]
  },
  {
    topic: 'Help',
    key: 'help',
    question: [
      {
        id: '16',
        name: 'About Us',
        hash: 'about-us'
      },
      {
        id: '17',
        name: 'Getting Rescue',
        hash: 'getting-rescue'
      },
      {
        id: '18',
        name: 'Our Product',
        hash: 'our-product'
      },
      {
        id: '19',
        name: 'Reinsurance',
        hash: 'reinsurance'
      },
      {
        id: '20',
        name: 'Availability',
        hash: 'availability'
      }
    ]
  },
  {
    topic: 'Refund Policy',
    key: 'refund',
    question: [
      {
        id: '21',
        name: 'About Us',
        hash: 'about-us'
      },
      {
        id: '22',
        name: 'Getting Rescue',
        hash: 'getting-rescue'
      },
      {
        id: '23',
        name: 'Our Product',
        hash: 'our-product'
      },
      {
        id: '24',
        name: 'Reinsurance',
        hash: 'reinsurance'
      },
      {
        id: '25',
        name: 'Availability',
        hash: 'availability'
      }
    ]
  }
];

const questionDetail = [
  {
    topic: 'General Questions',
    detail: [
      {
        id: '1',
        title: '01. Why share this with everyone?',
        hash: 'about-us0',
        content:
          'Our intuitive, easy-to-use automated SaaS system, which requires no coding or technical analysis skills, is designed for all traders. Recognizing its market size potential, we realized that by making it available to everyone, we could generate significantly higher wealth than if we solely focused on increasing our own funds.'
      },
      {
        id: '2',
        title: '02. Who is this for?',
        hash: 'getting-rescue0',
        content:
          'Designed for all traders, our intuitive and user-friendly automated SaaS system requires no coding or technical analysis skills. It is particularly beneficial for those who experience constant losses and feel frustrated by the complexity of day trading.'
      },
      {
        id: '3',
        title: '03. How much does it cost?',
        hash: 'our-product0',
        content: `We are so confident in our solution that we don't charge you anything until you achieve success. As the first and only commission-based automated stock trading solution, our success is dependent on yours. See our Pricing page for more details`
      },
      {
        id: '4',
        title: '04. How hard is this get started?',
        hash: 'reinsurance0',
        content:
          'Our solution will connect to your existing brokerage account and execute trades in the background 24/7. We utilize dedicated SAAS servers to ensure security and reliability.'
      },
      {
        id: '5',
        title: '05. How can reach you?',
        hash: 'availability0',
        content:
          'If you have a our policy or have had one in the past and need help now, click here to get started. Otherwise, you can always get in touch with our team through our app or website.'
      }
    ]
  },
  {
    topic: 'Question About Platform',
    detail: [
      {
        id: '6',
        title: '06. Why share this with everyone?',
        hash: 'about-us1',
        content:
          'Our intuitive, easy-to-use automated SaaS system, which requires no coding or technical analysis skills, is designed for all traders. Recognizing its market size potential, we realized that by making it available to everyone, we could generate significantly higher wealth than if we solely focused on increasing our own funds.'
      },
      {
        id: '7',
        title: '07. Who is this for?',
        hash: 'getting-rescue1',
        content:
          'Designed for all traders, our intuitive and user-friendly automated SaaS system requires no coding or technical analysis skills. It is particularly beneficial for those who experience constant losses and feel frustrated by the complexity of day trading.'
      },
      {
        id: '8',
        title: '08. How much does it cost?',
        hash: 'our-product1',
        content: `We are so confident in our solution that we don't charge you anything until you achieve success. As the first and only commission-based automated stock trading solution, our success is dependent on yours. See our Pricing page for more details`
      },
      {
        id: '9',
        title: '09. How hard is this get started?',
        hash: 'reinsurance1',
        content:
          'Our solution will connect to your existing brokerage account and execute trades in the background 24/7. We utilize dedicated SAAS servers to ensure security and reliability.'
      },
      {
        id: '10',
        title: '10. How can reach you?',
        hash: 'availability1',
        content:
          'If you have a our policy or have had one in the past and need help now, click here to get started. Otherwise, you can always get in touch with our team through our app or website.'
      }
    ]
  },
  {
    topic: 'How To Use',
    detail: [
      {
        id: '11',
        title: '11. Why share this with everyone?',
        hash: 'about-us2',
        content:
          'Our intuitive, easy-to-use automated SaaS system, which requires no coding or technical analysis skills, is designed for all traders. Recognizing its market size potential, we realized that by making it available to everyone, we could generate significantly higher wealth than if we solely focused on increasing our own funds.'
      },
      {
        id: '12',
        title: '12. Who is this for?',
        hash: 'getting-rescue2',
        content:
          'Designed for all traders, our intuitive and user-friendly automated SaaS system requires no coding or technical analysis skills. It is particularly beneficial for those who experience constant losses and feel frustrated by the complexity of day trading.'
      },
      {
        id: '13',
        title: '13. How much does it cost?',
        hash: 'our-product2',
        content: `We are so confident in our solution that we don't charge you anything until you achieve success. As the first and only commission-based automated stock trading solution, our success is dependent on yours. See our Pricing page for more details`
      },
      {
        id: '14',
        title: '14. How hard is this get started?',
        hash: 'reinsurance2',
        content:
          'Our solution will connect to your existing brokerage account and execute trades in the background 24/7. We utilize dedicated SAAS servers to ensure security and reliability.'
      },
      {
        id: '15',
        title: '15. How can reach you?',
        hash: 'availability2',
        content:
          'If you have a our policy or have had one in the past and need help now, click here to get started. Otherwise, you can always get in touch with our team through our app or website.'
      }
    ]
  },
  {
    topic: 'Help',
    detail: [
      {
        id: '16',
        title: '16. Why share this with everyone?',
        hash: 'about-us3',
        content:
          'Our intuitive, easy-to-use automated SaaS system, which requires no coding or technical analysis skills, is designed for all traders. Recognizing its market size potential, we realized that by making it available to everyone, we could generate significantly higher wealth than if we solely focused on increasing our own funds.'
      },
      {
        id: '17',
        title: '17. Who is this for?',
        hash: 'getting-rescue3',
        content:
          'Designed for all traders, our intuitive and user-friendly automated SaaS system requires no coding or technical analysis skills. It is particularly beneficial for those who experience constant losses and feel frustrated by the complexity of day trading.'
      },
      {
        id: '18',
        title: '18. How much does it cost?',
        hash: 'our-product3',
        content: `We are so confident in our solution that we don't charge you anything until you achieve success. As the first and only commission-based automated stock trading solution, our success is dependent on yours. See our Pricing page for more details`
      },
      {
        id: '19',
        title: '19. How hard is this get started?',
        hash: 'reinsurance3',
        content:
          'Our solution will connect to your existing brokerage account and execute trades in the background 24/7. We utilize dedicated SAAS servers to ensure security and reliability.'
      },
      {
        id: '20',
        title: '20. How can reach you?',
        hash: 'availability3',
        content:
          'If you have a our policy or have had one in the past and need help now, click here to get started. Otherwise, you can always get in touch with our team through our app or website.'
      }
    ]
  },
  {
    topic: 'Refund Policy',
    detail: [
      {
        id: '21',
        title: '21. Why share this with everyone?',
        hash: 'about-us4',
        content:
          'Our intuitive, easy-to-use automated SaaS system, which requires no coding or technical analysis skills, is designed for all traders. Recognizing its market size potential, we realized that by making it available to everyone, we could generate significantly higher wealth than if we solely focused on increasing our own funds.'
      },
      {
        id: '22',
        title: '22. Who is this for?',
        hash: 'getting-rescue4',
        content:
          'Designed for all traders, our intuitive and user-friendly automated SaaS system requires no coding or technical analysis skills. It is particularly beneficial for those who experience constant losses and feel frustrated by the complexity of day trading.'
      },
      {
        id: '23',
        title: '23. How much does it cost?',
        hash: 'our-product4',
        content: `We are so confident in our solution that we don't charge you anything until you achieve success. As the first and only commission-based automated stock trading solution, our success is dependent on yours. See our Pricing page for more details`
      },
      {
        id: '24',
        title: '24. How hard is this get started?',
        hash: 'reinsurance4',
        content:
          'Our solution will connect to your existing brokerage account and execute trades in the background 24/7. We utilize dedicated SAAS servers to ensure security and reliability.'
      },
      {
        id: '25',
        title: '25. How can reach you?',
        hash: 'availability4',
        content:
          'If you have a our policy or have had one in the past and need help now, click here to get started. Otherwise, you can always get in touch with our team through our app or website.'
      }
    ]
  }
];

export { questions, questionDetail };
