import { Select, Slider, TextArea } from "@radix-ui/themes";
import Label from "../ui/label";
import Description from "../ui/description";
import { Button, Separator } from "@radix-ui/themes";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorField from "../fields/error";
import { useEffect, useState } from "react";
import axios from "axios";

const FormSchema = z.object({
  system: z.string(),
  data: z
    .string({ required_error: "You must enter data!" })
    .min(1, { message: "You must enter data!" }),
  tokens: z.number().array(),
  weight: z.number().array(),
  chaos: z.number().array(),
  model: z.string({ required_error: "You must enter a model!" }),
  //   chaos: z.number({ required_error: "You must enter a chaos value!" }),
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

export default function SummarizeForm({ callbackResponse }) {

  const [formResponse, setFormResponse] = useState({});

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
      tokens: [50],
      weight: [50],
      chaos: [50],
      model: "gpt3",
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

  function onSubmit(form) {
    console.log(form)
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: form.system,
        },
        {
          role: "user",
          content:
            form.data,
        },
      ],
      temperature: 1,
      max_tokens: form.tokens[0] * 10,
      top_p: 1,
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
              placeholder="Enter your text..."
              value={field.value}
            />
            {errors?.data && <ErrorField error={errors?.data.message} />}
            <Description>
              How do you want the agent to respond
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
              <Label>Your Query</Label>
            </div>
            <TextArea
              onChange={field.onChange}
              placeholder="Enter your text..."
              value={field.value}
            />
            {errors?.data && <ErrorField error={errors?.data.message} />}
            <Description>
              Enter the text you would like to be answered
            </Description>
          </>
        )}
      />
      <Separator className="my-8" size="4" />
      <Controller
        control={control}
        name="tokens"
        render={({ field }) => (
          <>
            <div className="flex justify-between">
              <Label>Max Length</Label>
              <Label>{field.value * 20}</Label>
            </div>
            <Slider
              onValueChange={field.onChange}
              value={field?.value}
              label={field.name}
              defaultValue={field.value}
            />
            <Description>Select the maximum amount of tokens</Description>
          </>
        )}
      />
      <Separator className="my-8" size="4" />
      <Controller
        control={control}
        name="weight"
        render={({ field }) => (
          <>
            <div className="flex justify-between">
              <Label>Control Diversity</Label>
              <Label>{field.value / 100}</Label>
            </div>
            <Slider
              onValueChange={field.onChange}
              value={field?.value}
              label={field.name}
              defaultValue={field.value}
            />
            <Description>
              Likelihood that weighted options are considered
            </Description>
          </>
        )}
      />
      <Separator className="my-8" size="4" />
      <Controller
        control={control}
        name="tokens"
        render={({ field }) => (
          <>
            <div className="flex justify-between">
              <Label>Chaos</Label>
              <Label>{field.value / 100}</Label>
            </div>
            <Slider
              onValueChange={field.onChange}
              value={field?.value}
              label={field.name}
              defaultValue={field.value}
            />
            <Description>
              Lowering results in less random completions
            </Description>
          </>
        )}
      />
      <Separator className="my-8" size="8" />
      <Controller
        control={control}
        name="model"
        render={({ field }) => (
          <>
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
          </>
        )}
      />
      <Separator className="my-8" size="4" />
      <div className="flex mt-3 space-x-2 justify-end">
        <Button variant="outline">Clear</Button>
        <Button type="submit">Submit Query</Button>
      </div>
    </form>
  );
}
