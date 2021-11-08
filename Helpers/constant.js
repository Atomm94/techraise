let error = {};

const userRole = Object.freeze({
    FOUNDER: 'founder',
    INVESTOR: 'investor',
    ADMIN: 'admin'
})

const growthOpportunityBasic = Object.freeze({
    1: 'Improve conversion rates',
    2: 'Increase pricing',
    3: 'Increase content marketing',
    4: 'Hire a B2B sales team',
    5: 'Add new product features',
    6: 'Expand to new markets',
    7: 'Focus on SEO',
    8: 'Social media marketing',
    9: 'Other'
})

const keyAssets = Object.freeze({
    1: 'Codebase and IP',
    2: 'Website',
    3: 'Brand',
    4: 'Social media accounts',
    5: 'Marketing materials',
    6: 'Domain',
    7: 'Customers',
    8: 'Mobile application',
    9: 'Other'
})

const financialSummary = Object.freeze({
    1: 'Yes',
    2: 'No'
})

const profileStatus = Object.freeze({
    PUBLIC: 'public',
    PRIVATE: 'private'
})

const statusComplete = Object.freeze({
    1: '20%',
    2: '40%',
    3: '60%',
    4: '80%',
    5: '100%'
})

const customersNumber = Object.freeze({
    1: 'All',
    2: '10-100',
    3: '100-1,000',
    4: '1,000-10,000',
    5: '10,000-100,000',
    6: '10,000-100,000',
    7: 'more than 100,000'
})

const startupTypes = Object.freeze({
    1: 'SaaS',
    2: 'Marketplace',
    3: 'Mobile',
    4: 'DTC',
    5: 'eCommerce',
    6: 'Shopify',
    7: 'Crypto',
    8: 'MicroSaas',
    9: 'Agency',
    10: 'Other'
})

export {
    userRole,
    error,
    growthOpportunityBasic,
    keyAssets,
    financialSummary,
    profileStatus,
    statusComplete,
    customersNumber,
    startupTypes
}