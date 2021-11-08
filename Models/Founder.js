import {Schema, model} from "mongoose";
import {
    customersNumber,
    financialSummary,
    growthOpportunityBasic,
    keyAssets,
    profileStatus, startupTypes, statusComplete,
    userRole
} from "../Helpers/constant";

const founderSchema = new Schema({
    privateInfo: {
        profile_status: {
            type: String,
            enum: Object.values(profileStatus),
            default: profileStatus.PRIVATE
        },
        contact_name: String,
        startup_name: String,
        contact_email: {
            type: String,
            unique: true
        },
        website: String,
        files: [String]
    },
    basicInfo: {
        startupType: {
            type: String,
            enum: Object.values(startupTypes)
        },
        about_company: String,
        annual_revenues: String,
        customers_count: {
            type: String,
            enum: Object.values(customersNumber)
        },
        founded_date: String,
        price: String,
        open_to_offers: {
            type: Boolean,
            default: false
        },
        team_count: String
    },
    companyFeatures: {
        business_model: String,
        technology: String,
        competitors: [String],
        growth_opportunity: String,
        growth_opportunity_basic: {
            type: String,
            enum: Object.values(growthOpportunityBasic)
        },
        key_assets: {
            type: String,
            enum: Object.values(keyAssets)
        },
        keywords: [String]
    },
    sellingDetails: {
        selling_purpose: String,
        funding: String
    },
    financialDetails: {
        financial_summary: {
            type: String,
            enum: Object.values(financialSummary),
            default: financialSummary["2"]
        },
        last_month_revenue: String,
        last_month_profit: String,
        over_year_revenue: String,
        over_year_profit: String
    },
    password: {
        type: String,
        required: true
    },
    complete: {
        type: String,
        enum: Object.values(statusComplete)
    },
    email_verification: {
        type: Boolean,
        default: false
    },
    profile_verification: {
        type: Boolean,
        default: false
    },
    myFavourites: [{
        type: Schema.Types.ObjectId,
        ref: 'founder'
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'investor'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: Date
})

const Founder = model('founder', founderSchema);

export default Founder;