
import { db, TranslationLocale } from "@repo/db"

const findMostPopularTemples = async (lang: TranslationLocale = "EN") => {
    try {
        const result = await db.temple.findMany({
            include: {
                translations: {
                    where: {
                        locale: lang
                    }
                }
            },
            where: { isVerified: true, isFeatured: true },
            orderBy: {
                rating: "desc",
            },
            take: 5
        })
        return result;
    } catch (error) {
        console.error("Failed to fetch temples", error);
        return [];
    }
}


const findAllTemples = async () => {
    try {
        const result = await db.temple.findMany({
            where: { isVerified: true }
        })
        return result;
    } catch (error) {
        console.error("Failed to fetch temples", error);
        return [];
    }

}

const findTemplesBySlug = async (slug: string, lang: TranslationLocale = "EN") => {
    try {
        const result = await db.temple.findUnique({
            where: { slug },
            include: {
                translations: {
                    where: { locale: lang }
                },
                highlights: {
                    where: { locale: lang }
                },
                timings: true,
                deities: {
                    include: {
                        translations: { where: { locale: lang } }
                    }
                },
                offerings: {
                    include: {
                        translations: { where: { locale: lang } }
                    }
                },
                events: {
                    include: {
                        translations: { where: { locale: lang } }
                    }
                },
                gallery: true
            }
        });
        console.log("Temple found:", result)
        return result;
    } catch (error) {
        console.error("Failed to fetch temple by slug", error);
        return null;
    }
}

const createTemple = async () => {
    try {

    } catch (error) {
        console.error("Failed to create temple", error);
        return [];
    }

}

const updateTemple = async () => {
    try {

    } catch (error) {
        console.error("Failed to update temple", error);
        return [];
    }

}

const deleteTemple = async () => {
    try {

    } catch (error) {
        console.error("Failed to delete temple", error);
        return [];
    }

}

export { findMostPopularTemples, findAllTemples, findTemplesBySlug, createTemple, updateTemple, deleteTemple }