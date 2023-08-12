import * as z from 'zod'

const errorMessages = {
    publicName: 'Public name must be between 2 to 50 characters.',
    bio: 'Bio should be between 5 to 500 characters.',
    languages: 'At least one language is required.',
    availabilityLink: 'Please enter a valid URL for availability.',
    topics: 'At least one topic is required.'

}

function isValidAvailabilityLink(url: string) {
    const allowedPrefixes = [
        'https://zcal.co/',
        'https://meetings.hubspot.com/',
        'https://calendly.com/'
    ]
    return allowedPrefixes.some(prefix => url.startsWith(prefix))
}

const profileSchema = z.object({
    publicName: z.string().min(2, { message: errorMessages.publicName }).max(50, { message: errorMessages.publicName }).nonempty(errorMessages.publicName),
    bio: z.string().min(5, { message: errorMessages.bio }).max(500, { message: errorMessages.bio }).nonempty(errorMessages.bio),
    languages: z.array(z.string().min(1)).nonempty(errorMessages.languages),
    availabilityLink: z.string()
        .url({ message: errorMessages.availabilityLink })
        .refine(isValidAvailabilityLink, {
            message: 'The URL must start with either https://zcal.co/, https://meetings.hubspot.com/, or https://calendly.com/'
        }),
    topics: z.array(z.string().min(1)).nonempty(errorMessages.topics),
})

export default profileSchema
