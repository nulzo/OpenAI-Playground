import { Select, Slider, TextArea } from "@radix-ui/themes";
import Label from "../ui/label";
import Description from "../ui/description";
import { Button, Separator } from "@radix-ui/themes";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorField from "../fields/error";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ToolIcon from "../ui/ToolIcon";
import { FileIcon } from "lucide-react";

const FormSchema = z.object({
    system: z.string(),
    data: z.any(),
    prompt: z.string(),
    tokens: z.number().array(),
    nucleic: z.number().array(),
    chaos: z.number().array(),
    model: z.string({ required_error: "You must enter a model!" }),
    frequency_penalty: z.number().array(),
    presence_penalty: z.number().array()
});

const Models = {
    premium: [
        "GPT-4-0613",
        "GPT-4-0314",
        "GPT-4"
    ],
    standard: [
        "GPT-3.5-turbo-16k",
        "GPT-3.5-turbo-0613",
        "GPT-3.5-turbo-0301",
        "GPT-3.5-turbo"
    ]
}

export default function LoadForm({ callbackResponse }) {

    const [formResponse, setFormResponse] = useState({});
    const [fileContent, setFileContent] = useState(null);

    useEffect(() => {
        callbackResponse(formResponse);
    }, [callbackResponse, formResponse]);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            system: "",
            data: "",
            prompt: "",
            tokens: [256],
            nucleic: [1],
            chaos: [1],
            model: "gpt3",
            frequency_penalty: [0],
            presence_penalty: [0]
        },
    });

    async function postData(headers, data) {
        return axios
            .post("https://api.openai.com/v1/chat/completions", data, headers)
            .then((res) => {
                setFormResponse({ data: res.data.choices[0].message.content, loading: false });
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally((res) => console.log(res));
    }
    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const content = event.target.result;
                resolve(content);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsText(file);
        });
    };

    async function onSubmit(form) {
        const file = form.data;
        const fileContent = await readFileContent(file);
        // Add logic to handle or process the file content as needed
        const data = {
            model: "gpt-3.5-turbo-16k",
            messages: [
                {
                    role: "system",
                    content: form.system,
                },
                {
                    role: "user",
                    content:
                        `${form.prompt}\n${fileContent}`,
                },
            ],
            temperature: form.chaos[0],
            max_tokens: form.tokens[0],
            top_p: form.nucleic[0],
            frequency_penalty: 0,
            presence_penalty: 0,
        };

        const header = {
            headers: {
                Authorization:
                    "Bearer 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",
            },
        };

        postData(header, data);
        setFormResponse({ data: "", loading: true });
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="system"
                render={({ field }) => (
                    <>
                        <div className="flex justify-between">
                            <Label>System Role</Label>
                        </div>
                        <TextArea
                            onChange={field.onChange}
                            placeholder="You are a helpful assistant."
                            value={field.value}
                        />
                        {errors?.system && <ErrorField error={errors?.system.message} />}
                        <Description>
                        </Description>
                    </>
                )}
            />
            <Controller
                control={control}
                name="data"
                render={({ field }) => (
                    <>
                        <div className="flex justify-between">
                            <Label>File</Label>
                        </div>
                        <input
                            type="file"
                            onChange={(e) => field.onChange(e.target.files[0])}
                            multiple={false} // Set to true if you want to allow multiple files
                            accept=".txt"
                        />
                    </>
                )}

            />
            <Controller
                control={control}
                name="prompt"
                render={({ field }) => (
                    <>
                        <div className="flex justify-between">
                            <Label>Prompt</Label>
                        </div>
                        <TextArea
                            onChange={field.onChange}
                            placeholder="You are a helpful assistant."
                            value={field.value}
                            className="h-[10em]"
                        />
                        {errors?.system && <ErrorField error={errors?.system.message} />}
                    </>
                )}

            />
            <Separator className="my-8" size="4" />
            <div className="space-y-2">
                <Controller
                    control={control}
                    name="tokens"
                    render={({ field }) => (
                        <div className="py-2">
                            <div className="flex justify-between">
                                <div className="flex space-x-2 align-middle items-center content-center">
                                    <Label>Max Length</Label>
                                    <ToolIcon content="The maximum number of tokens to generate (shared between the prompt and completion)." />
                                </div>
                                <Label>{field.value}</Label>
                            </div>
                            <Slider
                                onValueChange={field.onChange}
                                value={field?.value}
                                label={field.name}
                                max={2000}
                                min={1}
                                defaultValue={field.value}
                            />
                            {errors?.tokens && <ErrorField error={errors?.tokens.message} />}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="nucleic"
                    render={({ field }) => (
                        <div className="py-2">
                            <div className="flex justify-between">
                                <div className="flex space-x-2 align-middle items-center content-center">
                                    <Label>Nucelic Sampling</Label>
                                    <ToolIcon content="Controls diversity. 0.5 results in half of all likelihood-weighted options are considered." />
                                </div>
                                <Label>{field.value}</Label>
                            </div>
                            <Slider
                                onValueChange={field.onChange}
                                value={field?.value}
                                label={field.name}
                                max={1}
                                min={0}
                                step={0.01}
                                defaultValue={field.value}
                            />
                            {errors?.nucleic && <ErrorField error={errors?.nucleic.message} />}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="chaos"
                    render={({ field }) => (
                        <div className="py-2">
                            <div className="flex justify-between">
                                <div className="flex space-x-2 align-middle items-center content-center">
                                    <Label>Chaos</Label>
                                    <ToolIcon content="Lowering results in less random completions. Model becomes determinstic and repetitive as the value approaches zero." />
                                </div>
                                <Label>{field.value}</Label>
                            </div>
                            <Slider
                                onValueChange={field.onChange}
                                value={field?.value}
                                label={field.name}
                                min={0}
                                max={2}
                                step={0.01}
                                defaultValue={field.value}
                            />
                            {errors?.chaos && <ErrorField error={errors?.chaos.message} />}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="frequency_penalty"
                    render={({ field }) => (
                        <div className="py-2">
                            <div className="flex justify-between">
                                <div className="flex space-x-2 align-middle items-center content-center">
                                    <Label>Frequency Penalty</Label>
                                    <ToolIcon content="How much to penalize new tokens based on their existing frequency in the text." />
                                </div>
                                <Label>{field.value}</Label>
                            </div>
                            <Slider
                                onValueChange={field.onChange}
                                value={field?.value}
                                label={field.name}
                                min={0}
                                max={2}
                                step={0.01}
                                defaultValue={field.value}
                            />
                            {errors?.frequency_penalty && <ErrorField error={errors?.frequency_penalty.message} />}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="presence_penalty"
                    render={({ field }) => (
                        <div className="py-2">
                            <div className="flex justify-between">
                                <div className="flex space-x-2 align-middle items-center content-center">
                                    <Label>Presence Penalty</Label>
                                    <ToolIcon content="How much to penalize new tokens based on how much they appear in the text." />
                                </div>
                                <Label>{field.value}</Label>
                            </div>
                            <Slider
                                onValueChange={field.onChange}
                                value={field?.value}
                                label={field.name}
                                min={0}
                                max={2}
                                step={0.01}
                                defaultValue={field.value}
                            />
                            {errors?.presence_penalty && <ErrorField error={errors?.presence_penalty.message} />}
                        </div>
                    )}
                />
            </div>
            <Separator className="my-8" size="8" />
            <Controller
                control={control}
                name="model"
                render={({ field }) => (
                    <div className="py-2">
                        <Label>Select a GPT model</Label>
                        <div className="w-full">
                            <Select.Root
                                defaultValue="gpt3"
                                size="2"
                                onValueChange={field.onChange}
                                className="w-full"
                            >
                                <Select.Trigger className="w-full" />
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Label value>Premium GPT Models</Select.Label>
                                        <Select.Item value="gpt4">GPT 4</Select.Item>
                                    </Select.Group>
                                    <Select.Separator />
                                    <Select.Group>
                                        <Select.Label>Standard GPT Models</Select.Label>
                                        <Select.Item value="gpt3">GPT 3.5</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </div>
                        <Description>The model used to run the query</Description>
                    </div>
                )}
            />

            <Separator className="my-8" size="4" />
            <div className="flex mt-3 space-x-2 justify-end">
                <Button variant="outline" color="red" className="">Clear</Button>
                <Button type="submit" variant="outline" onClick={() => { console.log(errors) }}>Submit Query</Button>
            </div>
        </form>
    );
}
