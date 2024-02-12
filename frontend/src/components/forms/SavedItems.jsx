import { Card } from "@radix-ui/themes";

export default function SavedItems() {
    function getAllItems() {
        const allItems = [];

        // Iterate through localStorage items
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);

            // Parse the value as JSON (assuming values are JSON strings)

            if (key.startsWith('query')) {
                allItems.push({ key, value })
            }
        }

        return allItems;
    }
    const allItems = getAllItems();
    console.log(allItems);
    return (
        <div>
            <ul>
                {allItems.map((item) => (
                    <li key={item.key} className="py-2">
                        <strong>Your Query:</strong> {(JSON.parse(item.value).query_prompt)}
                        <br></br>
                        <strong>Response:</strong> {(JSON.parse(item.value).response)}
                    </li>
                ))}
            </ul>
        </div>
    )
}