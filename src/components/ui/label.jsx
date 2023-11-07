import { Heading } from "@radix-ui/themes";

export default function Label({ children }) {
    return (
        <Heading size="2" className="py-2">{children}</Heading>
    )
}