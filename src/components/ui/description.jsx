import { Heading } from "@radix-ui/themes";

export default function Description({ children }) {
    return <Heading size="2" weight="light" color="gray" className="opacity-50 pt-2" >{children}</Heading>
}