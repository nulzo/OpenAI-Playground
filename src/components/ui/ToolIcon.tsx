import { Tooltip } from "@radix-ui/themes";
import { IconInfoCircle } from "@tabler/icons-react";

export default function ToolIcon({ content }: { content: string }) {
    return (
        <Tooltip content={content}>
            <IconInfoCircle size={16} />
        </Tooltip>
    )
}