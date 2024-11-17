// Add new tutorial content for aftermarket sales
export const TUTORIALS: Record<SkillLevel, Record<string, TutorialData>> = {
  rookie: {
    // ... existing tutorials ...
    aftermarket: {
      'Trade Devaluation Strategy': {
        overview: 'A systematic approach to creating value for protection products by highlighting potential issues with the customer\'s trade-in vehicle.',
        steps: [
          'Start with a thorough exterior inspection with the customer',
          'Point out common wear items and potential future repairs',
          'Document existing damage or wear patterns',
          'Connect observations to specific protection products',
          'Present solutions before discussing trade value'
        ],
        examples: [
          'Exterior: "Notice these door dings? Our Dent & Ding protection would have covered these."',
          'Wheels: "These curb rashes are common and expensive to repair. Our Wheel Protection prevents these costs."',
          'Paint: "Environmental damage like this bird droppings etching could be prevented with our protection package."'
        ],
        keyPoints: [
          'Always walk around with the customer',
          'Use gentle, non-confrontational language',
          'Focus on future prevention rather than past mistakes',
          'Connect each observation to a specific product benefit',
          'Build value before presenting numbers'
        ],
        resources: [
          {
            title: 'Zurich F&I Training',
            url: 'https://www.zurichna.com/industries/auto/dealerships',
          },
          {
            title: 'JM&A Group Best Practices',
            url: 'https://jmagroup.com/solutions/training',
          }
        ]
      },
      'Value-Based Presentation': {
        overview: 'A customer-centric approach to presenting aftermarket products based on their specific needs and usage patterns.',
        steps: [
          'Conduct thorough interview about vehicle usage',
          'Identify specific risk factors and pain points',
          'Present products as solutions to specific concerns',
          'Use visual aids and real examples',
          'Bundle products for maximum value'
        ],
        examples: [
          'Usage: "How many miles do you drive annually? Highway or city?"',
          'Concerns: "Have you ever experienced a major repair cost?"',
          'Solution: "Based on your commute, here\'s how our coverage protects you..."'
        ],
        keyPoints: [
          'Customize presentation to customer lifestyle',
          'Use third-party repair cost data',
          'Present monthly rather than total cost',
          'Focus on peace of mind and convenience',
          'Always offer product bundles'
        ]
      }
    }
  },
  intermediate: {
    aftermarket: {
      'Menu Selling Mastery': {
        overview: 'Strategic presentation of protection products using a structured menu approach to maximize attachment rates.',
        steps: [
          'Present good/better/best options',
          'Start with complete package presentation',
          'Use payment-based selling techniques',
          'Incorporate visual aids and examples',
          'Handle objections with third-party data'
        ],
        examples: [
          'Package: "Our Platinum Protection includes all these benefits..."',
          'Value: "For just $12 more per month, you get complete coverage"',
          'Comparison: "The average repair cost without coverage would be..."'
        ],
        keyPoints: [
          'Always present multiple options',
          'Use monthly payment comparisons',
          'Include real repair cost examples',
          'Focus on long-term savings',
          'Present early in the sale process'
        ]
      }
    }
  },
  // ... rest of the tutorials ...
};