'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import profileSchema from '@/lib/schemas/profile'

import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { MultiSelect } from '../ui/multiselect'
import { Textarea } from '../ui/textarea'

const languages = [
    { label: 'Arabic', value: 'ar' },
    { label: 'Bengali', value: 'bn' },
    { label: 'Chinese', value: 'zh' },
    { label: 'English', value: 'en' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Indonesian', value: 'id' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Spanish', value: 'es' },
    { label: 'Urdu', value: 'ur' }
]

const topics = [
    { label: 'Analytics', value: 'Analytics' },
    { label: 'Blockchain Usage', value: 'Blockchain Usage' },
    { label: 'Community Building', value: 'Community Building' },
    { label: 'Crypto Basics', value: 'Crypto Basics' },
    { label: 'Crypto Trading', value: 'Crypto Trading' },
    { label: 'Design', value: 'Design' },
    { label: 'Emotional Management', value: 'Emotional Management' },
    { label: 'English Proficiency', value: 'English Proficiency' },
    { label: 'Fundamental Analysis', value: 'Fundamental Analysis' },
    { label: 'GameFi', value: 'GameFi' },
    { label: 'Graphic Design', value: 'Graphic Design' },
    { label: 'Hackathons', value: 'Hackathons' },
    { label: 'Integration', value: 'Integration' },
    { label: 'Investments', value: 'Investments' },
    { label: 'IoT in Web3', value: 'IoT in Web3' },
    { label: 'Job Search Strategies', value: 'Job Search Strategies' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'NFTs', value: 'NFTs' },
    { label: 'Personal Finance', value: 'Personal Finance' },
    { label: 'Personal Growth', value: 'Personal Growth' },
    { label: 'Product Development', value: 'Product Development' },
    { label: 'Programming', value: 'Programming' },
    { label: 'Resume Building', value: 'Resume Building' },
    { label: 'Risk Management', value: 'Risk Management' },
    { label: 'Taxation in Crypto', value: 'Taxation in Crypto' },
    { label: 'Technical Analysis', value: 'Technical Analysis' },
    { label: 'Thriving Abroad', value: 'Thriving Abroad' },
    { label: 'User Experience', value: 'User Experience' },
    { label: 'Web3 Development', value: 'Web3 Development' },
    { label: 'Web3 Professional Shift', value: 'Web3 Professional Shift' }
]

export function ProfileForm() {
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            publicName: '',
            bio: '',
            languages: [],
            availabilityLink: '',
            topics: []
        }
    })

    function onSubmit(values: z.infer<typeof profileSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='publicName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Public name</FormLabel>
                            <FormControl>
                                <Input placeholder='e.g. Alex Smith' {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Share a brief introduction about yourself. Markdown supported.'
                                    className='resize-none'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Introduce yourself in a few sentences. You can use Markdown for formatting. Remember to
                                keep it professional and avoid sharing personal details.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='availabilityLink'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Availability link</FormLabel>
                            <FormControl>
                                <Input placeholder='https://calendly.com/link' {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide a link to your Calendly or similar scheduling platform. This helps others
                                understand when they can reach out to you.
                                <br />
                                <span className='font-semibold'>
                                    Currently allowed: Calendly, Hubspot Meetings, ZCal
                                </span>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='languages'
                    render={({ field: { onChange, value, ref } }) => (
                        <FormItem>
                            <FormLabel>Languages</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    placeholder='Type & select a language'
                                    options={languages}
                                    ref={ref}
                                    value={languages.filter(language => value.includes(language.value))}
                                    onChange={(value: typeof languages) =>
                                        onChange(value.map(language => language.value))
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                Select the languages you speak fluently. Start typing to search and select from the
                                dropdown.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='topics'
                    render={({ field: { onChange, value, ref } }) => (
                        <FormItem>
                            <FormLabel>Mentorship topics</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    placeholder='Type & add a topic (e.g. Web Development)'
                                    options={topics}
                                    ref={ref}
                                    value={topics.filter(topic => value.includes(topic.value))}
                                    onChange={(value: typeof topics) => onChange(value.map(topic => topic.value))}
                                />
                            </FormControl>
                            <FormDescription>
                                Choose the topics you&apos;d like to mentor others in. If a topic doesn&apos;t exist,
                                you can add it.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    )
}
