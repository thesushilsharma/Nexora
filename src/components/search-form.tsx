'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Form from 'next/form'
import { useFormStatus } from 'react-dom'

export function SearchForm() {
    const status = useFormStatus()
    return (
        <div className="container mx-auto px-4 py-8">
            <Form
                action="/search"
                className="flex items-center space-x-2 p-2 bg-card rounded-xl shadow-layered-border border border-border backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:scale-105"
            >
                {/* Input Field */}
                <Input
                    type="text"
                    name="query"
                    placeholder="Search by location or property name..."
                    className="flex-grow rounded-lg border-0 focus:ring-primary bg-transparent px-4 py-2 text-foreground placeholder:text-muted-foreground"
                    aria-label="Search"
                />
                {/* Search Button */}
                <Button
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:bg-accent"
                >
                    {status.pending ? 'Searching...' : 'Search'}
                    <Search className="ml-2 w-4 h-4" />
                </Button>
            </Form>
        </div>
    )
}