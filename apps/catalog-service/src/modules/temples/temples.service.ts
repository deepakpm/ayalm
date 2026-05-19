
import { TranslationLocale } from "@repo/db";
import { findAllTemples, findMostPopularTemples, findTemplesBySlug } from "./temples.repository"


const getMostPopularTemples = async (lang: TranslationLocale) => {
    try {
        const result = await findMostPopularTemples(lang)
        const finalResult = result.map((temple) => {
            const translations = temple.translations.find((t) => t.locale === lang);

            return {
                id: temple.id,
                slug: temple.slug,
                imageUrl: temple.imageUrl,
                name: translations ? translations.name : '',
                city: translations ? translations.city : '',
                state: translations ? translations.state : '',
            }
        })
        return finalResult;
    } catch (error) {
        console.error("Failed to fetch temples", error);
        return [];
    }
}

const getTempleBySlug = async (slug: string, lang: TranslationLocale) => {
    try {
        const result = await findTemplesBySlug(slug, lang);
        return result;
    } catch (error) {
        console.error("Failed to fetch temple", error);
        return null;
    }
}

const getAllTemples = async (lang: TranslationLocale) => {
    try {
        const result = await findAllTemples();
        return result;
    } catch (error) {
        console.error("Failed to fetch temples", error);
        return [];
    }
}

export { getMostPopularTemples, getTempleBySlug }