import { Text } from "@radix-ui/themes";

export default function ErrorField({error}){
    return(
        <Text size="1" className="font-bold text-red-500">{error}</Text>
    )
}