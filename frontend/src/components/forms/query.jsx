import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, Slider, Tabs, TextArea } from "@radix-ui/themes";
import Label from "../ui/label";
import Description from "../ui/description";
import { Button, Separator } from '@radix-ui/themes';
import { useState } from "react";

export default function QueryForm() {
    const [length, setLength] = useState(50);
    const [weight, setWeight] = useState(50);
    const [chaos, setChaos] = useState(25);
    return (
        <>
            <Tabs.Root defaultValue="account" className="pb-4">
                <Tabs.List>
                    <Tabs.Trigger value="account">Summarize</Tabs.Trigger>
                    <Tabs.Trigger value="documents">Query</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Data Dump</Tabs.Trigger>
                </Tabs.List>

            </Tabs.Root>
            
            <Separator className="my-8" size="4" />
            <div className="">
                <div className="flex justify-between">
                    <Label>
                        Max Length
                    </Label>
                    <Label>
                        {length * 15}
                    </Label>
                </div>
                <div className="">
                    <Slider onValueChange={(value) => { setLength([value]) }} defaultValue={[length]} />
                </div>
                <Description>Select the maximum amount of tokens</Description>
            </div>
            <div className="">
                <div className="flex justify-between">
                    <Label>
                        Control Diversity
                    </Label>
                    <Label>
                        {weight / 100}
                    </Label>
                </div>
                <div className="">
                    <Slider onValueChange={(value) => { setWeight([value]) }} defaultValue={[weight]} />
                </div>
                <Description>Likelihood that weighted options are considered</Description>
            </div>
            <div className="">
                <div className="flex justify-between">
                    <Label>
                        Chaos
                    </Label>
                    <Label>
                        {chaos / 100}
                    </Label>
                </div>
                <div className="">
                    <Slider onValueChange={(value) => { setChaos([value]) }} defaultValue={[chaos]} />
                </div>
                <Description>Lowering results in less random completions</Description>
            </div>
            <Separator className="my-8" size="8" />
            <Label>Select a GPT model</Label>
            <Select.Root defaultValue="gpt3" size="2">
                <Select.Trigger />
                <Select.Content>
                    <Select.Group>
                        <Select.Label value>
                            Premium GPT Models
                        </Select.Label>
                        <Select.Item value="gpt4">
                            GPT 4
                        </Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                        <Select.Label>
                            Standard GPT Models
                        </Select.Label>
                        <Select.Item value="gpt3">
                            GPT 3.5
                        </Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Description>The model used to run the query</Description>
            <Separator className="my-8" size="4" />
            <div className='flex mt-3 space-x-2 justify-end'>
                <Button variant="outline" >Clear</Button>
                <Button>Submit Query</Button>
            </div>

        </>
    )
}